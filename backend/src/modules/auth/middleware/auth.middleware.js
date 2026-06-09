import jwt from "jsonwebtoken";

import { AppError } from "../../../error/App.error.js";

import { signUpFeildsValidationSchema } from "../validation/signup.fields.validation.js"
import { sessionIdFieldValidateSchema, sessionPagePassordsUpdateSchema, tokenFieldValidateSchema } from "../validation/token.field.validation.js";
import { emailFormatVerify, passwordUpdateValidationScehma, validateLoginAccountSchema } from "../validation/login.field.validation.js";
import { errorsCollectZod } from "../utils/error.collect.zod.js";


export const signupMiddleware = async (req, res, next) => {

    const validationResult = signUpFeildsValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
        // sending response on error
        const collectingErrors = errorsCollectZod(validationResult);
        return next(new AppError("Input field error", 400, collectingErrors));
    }

    req.sanitizedBody = validationResult.data
    next()
}

export const authSessionAndTokenMiddleware = async (req, res, next) => {
    const authTokenCookie = req.cookies?.tokenAuth;

    if (!authTokenCookie) {

        return next(new AppError("Session expired",
            401, [{
                field: "token",
                message: "Session has timed out. Please Login again to continue."
            }]));
    }

    try {
        const decode = jwt.verify(authTokenCookie, process.env.JWTTOKENCODE);
        req.userId = decode.userId;

        next();
    } catch (error) {

        next(new AppError("Session expired",
            401, [{
                field: "token",
                message: "Session has timed out. Please Login again to continue."
            }]
        ))
    }
}

export const tokenValidateMiddleware = async (req, res, next) => {

    const validateUserFields = tokenFieldValidateSchema.safeParse(req.body);

    if (!validateUserFields.success) {

        const errorsFields = errorsCollectZod(validateUserFields);
        return next(new AppError("Token Input Error", 400, errorsFields));
    }

    req.sanitizedBody = {
        ...(req?.sanitizedBody || {}),
        ...validateUserFields.data,
    };
    next();
}

export const loginAccountMiddleware = async (req, res, next) => {
    const validateUserFields = validateLoginAccountSchema.safeParse(req.body);

    if (!validateUserFields.success) {
        const errorFields = errorsCollectZod(validateUserFields);
        return next(new AppError("Invalid Inputs", 400, errorFields));
    }

    req.sanitizedBody = validateUserFields.data;
    next();
}

export const requestEmailResetPasswordMiddleware = async (req, res, next) => {
    const emailVerifyResponse = emailFormatVerify.safeParse(req.body);

    if (!emailVerifyResponse.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
            errors: [{ field: "email", message: "Invalid email format" }],
            payload: null
        });
    }

    req.sanitizedBody = emailVerifyResponse.data;
    next();
}

export const verifySessionIdResetPassword = async (req, res, next) => {
    const sessionId = { sessionId: req.body?.sessionId };

    const verifySessionIdFormat = sessionIdFieldValidateSchema.safeParse(sessionId);

    if (!verifySessionIdFormat.success) {
        const errorsCollect = errorsCollectZod(verifySessionIdFormat);
        return next(new AppError("Invalid Inputs", 400, errorsCollect));
    }
    next();
}

export const verifySessionPasswordParms = async (req, res, next) => {
    const validateSessionId = sessionPagePassordsUpdateSchema.safeParse(req.params);

    if (!validateSessionId.success) {
        return res.status(404).json({
            success: false,
            message: "Invalid user session",
            errors: [{ field: "root", message: "Session expired. Please request a new verification email." }],
            payload: null
        });
    }

    req.sanitizedBody = validateSessionId.data;

    next();
}

export const validateUpdatePasswordMiddelware = async (req, res, next) => {
    const validatePasswordFields = passwordUpdateValidationScehma.safeParse(req.body);

    if (!validatePasswordFields.data) {
        const collectErrors = errorsCollectZod(validatePasswordFields);
        return next(new AppError("Invalid Inputs", 400, collectErrors));
    }

    req.sanitizedBody = validatePasswordFields.data;
    next();
}