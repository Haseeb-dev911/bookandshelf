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

        // Save order as pending in database
        const order = await paymentRepository.createOrder({
            userId,
            stripePaymentIntentId: paymentIntent.id,
            amount: grandTotal,
            currency: "usd",
        });

        return {
            clientSecret: paymentIntent.client_secret,
            orderId: order.id,
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

                // Fetch user's cart items
                const cartItems = await paymentRepository.getCartItemsWithPrices(userId);
                
                if (cartItems.length > 0 && existingOrder) {
                    // Map to order items format
                    const orderItemsData = cartItems.map(item => {
                        const price = Number(item.price);
                        const discount = Number(item.discountPercentage) || 0;
                        const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
                        return {
                            ebookId: item.ebookId,
                            priceAtPurchase: finalPrice,
                        };
                    });

                    // Insert order items
                    await paymentRepository.createOrderItems(existingOrder.id, orderItemsData);

                    // Clear the cart
                    await paymentRepository.clearUserCart(userId);
                }

                // Update order status
                await paymentRepository.updateOrderStatus(stripePaymentIntentId, "paid");
                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                await paymentRepository.updateOrderStatus(paymentIntent.id, "failed");
                break;
            }

            default:
                console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }

        return { received: true };
    },

    /**
     * Get order status by payment intent ID
     */
    getOrderStatus: async (paymentIntentId) => {
        const order = await paymentRepository.findOrderByPaymentIntentId(paymentIntentId);
        if (!order) {
            throw new AppError("Order not found", 404);
        }
        return {
            status: order.status,
        };
    }
};
