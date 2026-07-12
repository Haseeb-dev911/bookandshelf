import { paymentService } from "../service/payment.service.js";

export const createPaymentIntentController = async (req, res, next) => {
    try {
        const result = await paymentService.createCheckoutIntent(req.userId);
        return res.status(200).json({
            success: true,
            message: "Payment intent created successfully",
            errors: null,
            payload: result,
        });
    } catch (error) {
        next(error);
    }
};

export const stripeWebhookController = async (req, res, next) => {
    try {
        const signature = req.headers["stripe-signature"];
        const rawBody = req.body; // Needs to be raw buffer

        const result = await paymentService.handleWebhookEvent(rawBody, signature);
        
        return res.status(200).json(result);
    } catch (error) {
        // Stripe webhooks should return 400 on error
        console.error("Stripe Webhook Error:", error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

export const getOrderStatusController = async (req, res, next) => {
    try {
        const { paymentIntentId } = req.params;
        const result = await paymentService.getOrderStatus(paymentIntentId);

        // Disable all caching so the browser always fetches fresh data.
        // Without this, Express sends an ETag and the browser returns 304
        // forever — meaning the frontend never sees the status change to 'paid'.
        res.set("Cache-Control", "no-store");

        return res.status(200).json({
            success: true,
            message: "Order status retrieved",
            errors: null,
            payload: result,
        });
    } catch (error) {
        next(error);
    }
};

export const isPurchasedController = async (req, res, next) => {
    try {
        const { ebookId } = req.params;
        const isPurchased = await paymentService.checkIfPurchased(req.userId, ebookId);
        return res.status(200).json({
            success: true,
            message: "Purchase status retrieved",
            errors: null,
            payload: { isPurchased },
        });
    } catch (error) {
        next(error);
    }
};
