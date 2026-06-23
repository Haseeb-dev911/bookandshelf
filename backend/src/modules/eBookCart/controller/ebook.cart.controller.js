import {
    addToCartService,
    removeFromCartService,
    getUserCartService,
    mergeGuestCartService,
} from "../service/ebook.cart.service.js";

// ─── E-Book Cart Controllers ──────────────────────────────────────────────────

/** GET /cart — fetch the current user's cart */
export const getUserCartController = async (req, res, next) => {
    try {
        const result = await getUserCartService(req.userId);
        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload,
        });
    } catch (error) {
        next(error);
    }
};

/** POST /cart/:ebookId — add an e-book to cart */
export const addToCartController = async (req, res, next) => {
    try {
        const result = await addToCartService(req.userId, req.params.ebookId);
        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload,
        });
    } catch (error) {
        next(error);
    }
};

/** DELETE /cart/:ebookId — remove an e-book from cart */
export const removeFromCartController = async (req, res, next) => {
    try {
        const result = await removeFromCartService(req.userId, req.params.ebookId);
        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload,
        });
    } catch (error) {
        next(error);
    }
};

/** POST /cart/merge — merge guest localStorage cart into DB */
export const mergeGuestCartController = async (req, res, next) => {
    try {
        const { ebookIds } = req.sanitizedBody;
        const result = await mergeGuestCartService(req.userId, ebookIds);
        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: result.payload,
        });
    } catch (error) {
        next(error);
    }
};
