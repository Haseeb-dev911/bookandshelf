import express from "express";

import {
    wishlistAuthMiddleware,
    validateBookIdParamMiddleware,
    validateWishlistStatusBodyMiddleware,
} from "../middleware/wishlist.middleware.js";

import {
    addToWishlistController,
    removeFromWishlistController,
    getUserWishlistController,
    getWishlistStatusController,
} from "../controller/wishlist.controller.js";

// ─── Wishlist Router ──────────────────────────────────────────────────────────
// All routes require authentication (wishlistAuthMiddleware).

const wishlistRouter = express.Router();

// GET  /wishlist           — fetch the current user's full wishlist
wishlistRouter.get(
    "/",
    wishlistAuthMiddleware,
    getUserWishlistController
);

// POST /wishlist/:bookId   — add a book to wishlist (idempotent)
wishlistRouter.post(
    "/:bookId",
    wishlistAuthMiddleware,
    validateBookIdParamMiddleware,
    addToWishlistController
);

// DELETE /wishlist/:bookId — remove a book from wishlist
wishlistRouter.delete(
    "/:bookId",
    wishlistAuthMiddleware,
    validateBookIdParamMiddleware,
    removeFromWishlistController
);

// POST /wishlist/status    — batch check which bookIds are wishlisted by the user
wishlistRouter.post(
    "/status/batch",
    wishlistAuthMiddleware,
    validateWishlistStatusBodyMiddleware,
    getWishlistStatusController
);

export default wishlistRouter;
