import express from "express";
import { paymentAuthMiddleware } from "../middleware/payment.middleware.js";
import {
    createPaymentIntentController,
    getOrderStatusController,
    isPurchasedController,
} from "../controller/payment.controller.js";

const paymentRouter = express.Router();

// POST /payment/create-intent — fetch intent for checkout
paymentRouter.post(
    "/create-intent",
    paymentAuthMiddleware,
    createPaymentIntentController
);

// GET /payment/order-status/:paymentIntentId
paymentRouter.get(
    "/order-status/:paymentIntentId",
    paymentAuthMiddleware,
    getOrderStatusController
);

// GET /payment/is-purchased/:ebookId — check if logged-in user already bought this ebook
paymentRouter.get(
    "/is-purchased/:ebookId",
    paymentAuthMiddleware,
    isPurchasedController
);

// Note: webhook route is defined in app.js because it requires raw body parsing

export default paymentRouter;
