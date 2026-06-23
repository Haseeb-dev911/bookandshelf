import jwt from "jsonwebtoken";
import { z } from "zod";
import { AppError } from "../../../error/App.error.js";
import { redisUserAccount } from "../../auth/repository/auth.redis.repository.js";

// ─── Auth guard ───────────────────────────────────────────────────────────────

export const cartAuthMiddleware = async (req, res, next) => {
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

const uuidSchema = z.string().uuid({ message: "Invalid e-book ID format." });

export const validateEbookIdParamMiddleware = (req, res, next) => {
    const result = uuidSchema.safeParse(req.params.ebookId);
    if (!result.success) {
        return next(new AppError("Invalid e-book ID", 400, [
            { field: "ebookId", message: "ebookId must be a valid UUID." }
        ]));
    }
    next();
};

// ─── Merge body validation ────────────────────────────────────────────────────

const mergeBodySchema = z.object({
    ebookIds: z.array(z.string().uuid()).min(1, "At least one e-book ID is required."),
});

export const validateMergeBodyMiddleware = (req, res, next) => {
    const result = mergeBodySchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(e => ({
            field: e.path.join(".") || "root",
            message: e.message,
        }));
        return next(new AppError("Invalid input", 400, errors));
    }
    req.sanitizedBody = result.data;
    next();
};
