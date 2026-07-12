import { AppError } from "../../../error/App.error.js";
import { paymentRepository } from "../repository/payment.repository.js";
import { stripeService } from "./stripe.service.js";

export const paymentService = {
    /**
     * Create checkout intent for a user
     * 1. Get cart items + prices
     * 2. Calculate grand total (subtotal + 8% tax)
     * 3. Create Stripe payment intent
     * 4. Create pending order in DB
     */
    createCheckoutIntent: async (userId) => {
        const cartItems = await paymentRepository.getCartItemsWithPrices(userId);

        if (!cartItems || cartItems.length === 0) {
            throw new AppError("Cart is empty", 400);
        }

        // Calculate subtotal
        const subtotal = cartItems.reduce((sum, item) => {
            const price = Number(item.price);
            const discount = Number(item.discountPercentage) || 0;
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
            return sum + finalPrice;
        }, 0);

        // Add 8% tax as per existing cart logic
        const tax = subtotal * 0.08;
        const grandTotal = subtotal + tax;

        // Stripe expects amount in cents
        const amountInCents = Math.round(grandTotal * 100);

        // Create Stripe Payment Intent
        const paymentIntent = await stripeService.createPaymentIntent(
            amountInCents,
            "usd",
            { userId } // attach user ID for webhook retrieval
        );

        // Map cart items into a snapshot for the checkout session
        const itemsSnapshot = cartItems.map(item => {
            const price = Number(item.price);
            const discount = Number(item.discountPercentage) || 0;
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
            return {
                ebookId: item.ebookId,
                priceAtPurchase: finalPrice,
            };
        });

        // Save session in database (pre-purchase snapshot)
        const session = await paymentRepository.createCheckoutSession({
            userId,
            stripePaymentIntentId: paymentIntent.id,
            itemsSnapshot,
            amount: grandTotal,
            currency: "usd",
        });

        return {
            clientSecret: paymentIntent.client_secret,
            sessionId: session.id,
        };
    },

    /**
     * Handle Stripe Webhook Events
     */
    handleWebhookEvent: async (rawBody, signature) => {
        let event;

        try {
            event = stripeService.constructWebhookEvent(rawBody, signature);
        } catch (err) {
            throw new AppError(`Webhook Error: ${err.message}`, 400);
        }

        // Log the webhook event
        try {
            await paymentRepository.createPaymentLog({
                stripeEventId: event.id,
                eventType: event.type,
                payload: event,
                status: "processed",
                error: null,
            });
        } catch (logError) {
            // Ignore unique constraint errors on event ID for idempotency, or just log
            console.error("Failed to log payment event:", logError.message);
        }

        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const userId = paymentIntent.metadata.userId;
                const stripePaymentIntentId = paymentIntent.id;

                // Idempotency check: Ensure order isn't already paid
                const existingOrder = await paymentRepository.findOrderByPaymentIntentId(stripePaymentIntentId);
                if (existingOrder && existingOrder.status === "paid") {
                    console.log(`[Webhook] Order ${existingOrder.id} already marked paid. Skipping.`);
                    break;
                }

                if (!userId) {
                    console.error("[Webhook] No userId found in payment intent metadata.");
                    break;
                }

                // Fetch the checkout session (snapshot)
                const session = await paymentRepository.findCheckoutSessionByIntentId(stripePaymentIntentId);
                if (!session) {
                    console.error(`[Webhook] No checkout session found for payment intent ${stripePaymentIntentId}.`);
                    break;
                }

                if (session.status === "completed") {
                    console.log(`[Webhook] Checkout session ${session.id} already marked completed. Skipping.`);
                    break;
                }

                // Create the actual order now that payment has succeeded
                const order = await paymentRepository.createOrder({
                    userId,
                    stripePaymentIntentId,
                    amount: session.amount,
                    currency: session.currency,
                });
                
                // Retrieve items snapshot and save to order items
                const orderItemsData = session.itemsSnapshot;
                if (orderItemsData && orderItemsData.length > 0) {
                    await paymentRepository.createOrderItems(order.id, orderItemsData);
                    // Clear this user's cart — ebook stays available for other users to purchase
                    await paymentRepository.clearUserCart(userId);
                    console.log(`[Webhook] Order fulfilled for user ${userId}. ${orderItemsData.length} ebook(s) saved to order history.`);
                }

                // Update order status and checkout session status
                await paymentRepository.updateOrderStatus(stripePaymentIntentId, "paid");
                await paymentRepository.updateCheckoutSessionStatus(stripePaymentIntentId, "completed");
                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                const stripePaymentIntentId = paymentIntent.id;
                
                // Update checkout session status
                await paymentRepository.updateCheckoutSessionStatus(stripePaymentIntentId, "failed");
                
                // If an order somehow exists (shouldn't, but just in case), update it too
                const existingOrder = await paymentRepository.findOrderByPaymentIntentId(stripePaymentIntentId);
                if (existingOrder) {
                    await paymentRepository.updateOrderStatus(stripePaymentIntentId, "failed");
                }
                break;
            }

            default:
                console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }

        return { received: true };
    },

    /**
     * Get order status by payment intent ID
     * (Called by the frontend while polling for success)
     */
    getOrderStatus: async (paymentIntentId) => {
        // First check if an actual order has been created (which happens after successful webhook)
        const order = await paymentRepository.findOrderByPaymentIntentId(paymentIntentId);
        if (order) {
            return { status: order.status }; // Typically 'paid' or 'failed'
        }

        // If no order is found, the webhook hasn't processed it yet. Look up the pre-payment session.
        const session = await paymentRepository.findCheckoutSessionByIntentId(paymentIntentId);
        if (session) {
            return { status: session.status }; // Typically 'pending' or 'failed'
        }

        // Neither found - invalid payment intent ID or completely deleted
        throw new AppError("Payment session not found", 404);
    },

    /**
     * Check if a user has already purchased a specific ebook.
     */
    checkIfPurchased: async (userId, ebookId) => {
        return await paymentRepository.isAlreadyPurchased(userId, ebookId);
    },
};
