import jwt from "jsonwebtoken";
import { z } from "zod";
import { AppError } from "../../../error/App.error.js";
import { redisUserAccount } from "../../auth/repository/auth.redis.repository.js";
import { errorsCollectZod } from "../../auth/utils/error.collect.zod.js";
import { wishlistStatusSchema } from "../validation/wishlist.validation.js";

// ─── Auth guard (same cookie pattern as book.listing.middleware.js) ───────────

export const wishlistAuthMiddleware = async (req, res, next) => {
    const authCookie = req.cookies?.book_shelf_token;

    if (!authCookie) {
        return next(new AppError("Session expired", 401, [{
            field: "token",
            message: "Session has timed out. Please Login again to continue.",
        }]));
    }

    try {
        const decode = jwt.verify(authCookie, process.env.JWTTOKENCODE);
        req.userId = decode.userId;

        const accountExists = await redisUserAccount.checkUserAccountExits(req.userId);
        if (!accountExists) {
            return next(new AppError("Session expired", 401, [{
                field: "token",
                message: "Session has timed out. Please Login again to continue.",
            }]));
        }

        next();
    } catch (error) {
        next(new AppError("Session expired", 401, [{
            field: "token",
            message: "Session has timed out. Please Login again to continue.",
        }]));
    }
};

// ─── UUID param guard ─────────────────────────────────────────────────────────

const uuidSchema = z.string().uuid({ message: "Invalid book ID format." });

export const validateBookIdParamMiddleware = (req, res, next) => {
    const result = uuidSchema.safeParse(req.params.bookId);
    if (!result.success) {
        return next(new AppError("Invalid book ID", 400, [
            { field: "bookId", message: "bookId must be a valid UUID." }
        ]));
    }
    next();
};

// ─── Batch status body validation ─────────────────────────────────────────────

export const validateWishlistStatusBodyMiddleware = (req, res, next) => {
    const result = wishlistStatusSchema.safeParse(req.body);
    if (!result.success) {
        const errors = errorsCollectZod(result);
        return next(new AppError("Invalid input", 400, errors));
    }
    req.sanitizedBody = result.data;
    next();
};
