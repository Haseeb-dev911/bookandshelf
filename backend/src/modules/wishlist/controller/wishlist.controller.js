import {
    addToWishlistService,
    removeFromWishlistService,
    getUserWishlistService,
    getWishlistStatusService
} from "../service/wishlist.service.js";

// ─── Wishlist Controllers ─────────────────────────────────────────────────────

/** POST /wishlist/:bookId  — toggle ON (add) */
export const addToWishlistController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await addToWishlistService(req.userId, bookId);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload
        });
    } catch (error) {
        next(error);
    }
};

/** DELETE /wishlist/:bookId  — toggle OFF (remove) */
export const removeFromWishlistController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await removeFromWishlistService(req.userId, bookId);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload
        });
    } catch (error) {
        next(error);
    }
};

/** GET /wishlist  — fetch all wishlist items for the logged-in user */
export const getUserWishlistController = async (req, res, next) => {
    try {
        const result = await getUserWishlistService(req.userId);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload
        });
    } catch (error) {
        next(error);
    }
};

/** POST /wishlist/status  — batch check which books are wishlisted */
export const getWishlistStatusController = async (req, res, next) => {
    try {
        const { bookIds } = req.sanitizedBody;
        const result = await getWishlistStatusService(req.userId, bookIds);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload
        });
    } catch (error) {
        next(error);
    }
};
