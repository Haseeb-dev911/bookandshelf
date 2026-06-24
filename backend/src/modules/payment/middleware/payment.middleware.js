import jwt from "jsonwebtoken";
import { AppError } from "../../../error/App.error.js";
import { redisUserAccount } from "../../auth/repository/auth.redis.repository.js";

// ─── Auth guard for payment ───────────────────────────────────────────────────

export const paymentAuthMiddleware = async (req, res, next) => {
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
