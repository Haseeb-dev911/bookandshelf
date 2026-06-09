import jwt from "jsonwebtoken";

import { bookListingAddValidationSchema, validateAssetsRedisSchema } from "../validation/book.listing.validation.js";

import { AppError } from "../../../error/App.error.js";
import { redisUserAccount } from "../../auth/repository/auth.redis.repository.js";
import { errorsCollectZod } from "../../auth/utils/error.collect.zod.js";


export const validateuserMiddleware = async (req, res, next) => {

    const authCookie = req.cookies?.book_shelf_token;

    if (!authCookie) {
        return next(new AppError("Session expired",
            401, [{
                field: "token",
                message: "Session has timed out. Please Login again to continue."
            }]));
    }

    try {
        const decode = jwt.verify(authCookie, process.env.JWTTOKENCODE);

        req.userId = decode.userId;

        const checkUserAccount = await redisUserAccount.checkUserAccountExits(req.userId);

        if (!checkUserAccount) {
            return next(new AppError("Session expired",
                401, [{
                    field: "token",
                    message: "Session has timed out. Please Login again to continue."
                }]
            ));
        }
        
        next();
    } catch (error) {
        console.log(error);

        next(new AppError("Session expired",
            401, [{
                field: "token",
                message: "Session has timed out. Please Login again to continue."
            }]
        ));
    }
}

export const validateAssetsRedisMiddleware = async (req, res, next) => {
    const validateAssetsData = validateAssetsRedisSchema.safeParse(req.body);

    if (!validateAssetsData.success) {
        const collectErrors = errorsCollectZod(validateAssetsData);
        return next(new AppError("Invalid Values", 400, collectErrors));
    }

    req.sanitizedBody = validateAssetsData.data;
    next();
}

export const oldBookProductAddMiddleware = async (req, res, next) => {

    const validationResult = bookListingAddValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
        const collectingErrors = errorsCollectZod(validationResult);
        return next(new AppError("Wrong Input fields", 400, collectingErrors));
    }

    req.sanitizedBody = validationResult.data;
    next();
}

