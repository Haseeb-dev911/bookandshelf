import express from "express";

import {
    cartAuthMiddleware,
    validateEbookIdParamMiddleware,
    validateMergeBodyMiddleware,
} from "../middleware/ebook.cart.middleware.js";

import {
    getUserCartController,
    addToCartController,
    removeFromCartController,
    mergeGuestCartController,
} from "../controller/ebook.cart.controller.js";

// ─── E-Book Cart Router ───────────────────────────────────────────────────────

const eBookCartRouter = express.Router();

// GET  /cart           — fetch the current user's full cart
eBookCartRouter.get(
    "/",
    cartAuthMiddleware,
    getUserCartController
);

// POST /cart/merge     — merge guest localStorage cart into DB (call after login)
// NOTE: must be declared BEFORE /:ebookId to avoid route conflict
eBookCartRouter.post(
    "/merge",
    cartAuthMiddleware,
    validateMergeBodyMiddleware,
    mergeGuestCartController
);

// POST /cart/:ebookId  — add an e-book to cart (idempotent)
eBookCartRouter.post(
    "/:ebookId",
    cartAuthMiddleware,
    validateEbookIdParamMiddleware,
    addToCartController
);

// DELETE /cart/:ebookId — remove an e-book from cart
eBookCartRouter.delete(
    "/:ebookId",
    cartAuthMiddleware,
    validateEbookIdParamMiddleware,
    removeFromCartController
);

export default eBookCartRouter;
