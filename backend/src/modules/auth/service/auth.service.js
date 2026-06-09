import crypto from "crypto";


import { AppError } from "../../../error/App.error.js";
import { normalizeEmail } from "../../../utils/format.email.js";
import { emailVerficationSenderUntils, resetPasswordEmailSenderUtils } from "../../../utils/nodemail.mail.js";

import { authRepostory, tokenRepostory } from "../repository/auth.repository.js";
import { redisUserAccount } from "../repository/auth.redis.repository.js";

export const signupCreateAccountService = async (data) => {
    try {
        const { name, email, password, city, country } = data;


        const verifyCountryId = await authRepostory.verifyCountryId(country)
        const verifyCityId = await authRepostory.verifyCityId(city);


        if ((verifyCountryId.length <= 0) || (verifyCityId.length <= 0)) {
            const filterErrors = [
                (verifyCountryId.length <= 0) && { field: "country", message: "Select you country again" },
                (verifyCityId.length <= 0) && { field: "city", message: "Select you city again" }
            ].filter(Boolean);

            return {
                success: false,
                message: "Locations Errors",
                errors: filterErrors,
                payload: null,
                status: 400
            }
        }

        const formatEmail = normalizeEmail(email);

        const validateUserAccountAlreadyExits = await authRepostory
            .CheckExistingAccount(formatEmail);

        if (validateUserAccountAlreadyExits) {
            return {
                success: false,
                message: "Account Already Exits",
                errors: [{ field: "email", message: "Eamil already exits" }],
                payload: null,
                status: 400
            }
        }

        data.rawEmail = formatEmail;
        const createUserAccount = await authRepostory.createUserAccount(data);

        const token = crypto.randomInt(100000, 1000000);
        const hashedToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");

        const insertTokenOnUser = await authRepostory
            .createTokenOnUser(hashedToken, createUserAccount.userAccount.id);

        emailVerficationSenderUntils(name, email, token);

        // setting up user account to redis
        await redisUserAccount.createRedisAccount(createUserAccount.userAccount.id);
        await redisUserAccount.createTokenRoom(
            createUserAccount?.userAccount?.id, name, email);

        return {
            success: true,
            message: "User Account Created",
            payload: { OPT_SESSION: true },
            errors: null,
            status: 201,
            userId: createUserAccount.userAccount.id
        }
    } catch (error) {
        console.log(error);

        if (error.code === "23505") {
            return {
                success: false,
                message: "Account Already Exits",
                errors: [{ field: "email", message: "Eamil already exits" }],
                payload: null,
                status: 400
            }
        }
        if (error instanceof AppError) throw error;

        throw new AppError(
            "Please wait a moment and try again.",
            499,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const verifyTokenService = async (userId, token) => {
    try {
        const verifyUserToken = await tokenRepostory.verifyUserTokenSignUp(userId);

        if (!verifyUserToken) {
            return {
                success: false,
                message: "Token Expired",
                errors: [{ field: "token", message: "Session Expired. Login again" }],
                payload: null,
                status: 401
            }
        }

        const hashedInputToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");

        if (verifyUserToken.token !== hashedInputToken) {
            return {
                success: false,
                message: "Token Not matched",
                errors: [{ field: "token", message: "Invalid or wrong token" }],
                payload: null,
                status: 400
            }
        }

        await authRepostory.UpdateUserAccountToVerifed(userId);
        await tokenRepostory.deleteAllTokenSessions(userId);

        return {
            success: true,
            message: "Account Verifed",
            errors: null,
            payload: { userId },
            status: 200
        }
    } catch (error) {

        if (error instanceof AppError) throw error;

        throw new AppError("Please wait a moment and try again.",
            500,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const signupPageGuardVerifyTokenService = async (userId) => {
    try {
        const verifyUserToken = await tokenRepostory.verifyUserTokenSignUp(userId);

        if (!verifyUserToken) {
            return {
                success: false,
                message: "Session Expired",
                errors: null,
                payload: null,
                status: 401
            }
        }
        return {
            success: true,
            message: "Session Verified",
            errors: null,
            payload: null,
            status: 200
        }
    } catch (error) {

        if (error instanceof AppError) throw error;
        throw new AppError("Try Again, after some time", 500, null);
    }
}

export const resendSignupOtpService = async (userId) => {
    try {
        const userData = await redisUserAccount.readUserTokenSessionData(userId);

        if (!userData) throw new AppError("Session Expired.",
            401, [{ field: "root", message: "Session Expired. Please Login again to continue." }]);


        if (userData.attempt > 4) throw new AppError("Too many Attempts",
            401, [{ field: "root", message: "Too many attempts. Try again later" }]);

        const token = crypto.randomInt(100000, 1000000);
        const hashedToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");

        const reSendToken = await tokenRepostory.reSendTokenUpdate(userId, hashedToken);

        if (!userData) throw new AppError("Session expired",
            401, [{
                field: "token",
                message: "Session Expired. Please Login again to continue."
            }]);

        emailVerficationSenderUntils(userData.name, userData.email, token);

        await redisUserAccount.updateTokenRoomAttempts(userId);

        return {
            success: true,
            message: "Token Resend",
            payload: [{ field: "token", message: "Token Resend. Check your email" }],
            errors: null,
            status: 201
        }
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError("Token Resend Failed", 500,
            [{ field: "root", message: "Try again, after some time" }]);
    }
}

export const loginUserAccountservice = async ({ email, password }) => {
    try {
        const verifyAccountDetails = await authRepostory.loginUserAccount(email);

        if (!verifyAccountDetails) {
            throw new AppError("Invalid email or password", 404,
                [{ field: "password", message: "Invalid email or password" }])
        }

        const comparingPassword = verifyAccountDetails.password === password;

        if (!comparingPassword) {
            throw new AppError("Invalid email or password", 404,
                [{ field: "password", message: "Invalid email or password" }]);
        }

        const checkVerifedAccount = verifyAccountDetails.isEmailVerified ? true : false;

        if (!checkVerifedAccount) {

            // token generate and insert
            const token = crypto.randomInt(100000, 1000000);
            const hashedToken = crypto
                .createHash("sha256")
                .update(String(token))
                .digest("hex");

            const insertTokenOnUser = await authRepostory
                .createTokenOnUser(hashedToken, verifyAccountDetails.id);

            // email generate
            emailVerficationSenderUntils(verifyAccountDetails.name,
                verifyAccountDetails.rawEmail, token);

            // user insights via redis
            await redisUserAccount.createRedisAccount(verifyAccountDetails.id);
            await redisUserAccount.createTokenRoom(
                verifyAccountDetails.id, verifyAccountDetails.name, verifyAccountDetails.rawEmail);

            await redisUserAccount.createTokenRoom(verifyAccountDetails.id,
                verifyAccountDetails.name, verifyAccountDetails.rawEmail);
        }

        await redisUserAccount.createRedisAccount(verifyAccountDetails.id);

        return {
            success: true,
            message: "Account verifed",
            errors: null,
            payload: { accountVerfied: checkVerifedAccount, OPT_SESSION: !checkVerifedAccount },
            userId: verifyAccountDetails.id,
            status: 200
        }

    } catch (error) {
        console.log(error);
        if (error instanceof AppError) throw error;

        throw new AppError("Please wait a moment and try again.",
            500, [{
                field: "root",
                message: "Please wait a moment and try again."
            }]
        );
    }
}

// Password Reset Pages Service

export const passwordResetRequestService = async (userMail) => {
    try {
        const sendEmail = await authRepostory.userEmailExitsRecurData(userMail);

        const userSessionId = crypto.randomUUID();

        if (!sendEmail || !sendEmail.isEmailVerified) {

            await redisUserAccount.createResetPasswordRequestSession(
                userSessionId, 0);

            return {
                success: true,
                message: "If an account exists, a reset email has been sent.",
                errors: null,
                payload: { sessionId: userSessionId },
                status: 201
            }
        }

        const { id, email, name } = sendEmail;

        const token = crypto.randomInt(100000, 1000000);
        const hashedToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");

        await redisUserAccount.createResetPasswordRequestSession(
            userSessionId, 1, hashedToken, id, email);

        await resetPasswordEmailSenderUtils(email, name, token);

        // session assign for frontend states managing
        return {
            success: true,
            message: "If an account exists, a reset email has been sent.",
            payload: { sessionId: userSessionId },
            errors: null,
            status: 201
        };
    } catch (error) {

        throw new AppError("Please try again after some time.", 500,
            [{ field: "root", message: "Please try again after some time." }]);
    }
}

export const passwordResetVerifyOptService = async (optSessionId, token) => {
    try {

        const checkUserSession = await redisUserAccount.getResetPasswordRequestSession(optSessionId);

        if (Object.keys(checkUserSession).length === 0) {
            // if redis failed to find
            return {
                success: false,
                message: "Session Expired",
                errors: [{
                    field: "root",
                    message: "Session expired. Please request a new verification email."
                }],
                payload: null,
                status: 401
            }
        }

        if (checkUserSession.validUser === "0") {
            // for the invalid user requesting
            return {
                success: false,
                message: "Invalid token",
                errors: [{
                    field: "token",
                    message: "Invalid or expired verification code. Please request a new code or try again."
                }],
                payload: null,
                status: 400
            }
        }

        const hashedInputToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");

        if (checkUserSession.hashToken !== hashedInputToken) {
            return {
                success: false,
                message: "Invalid Token",
                errors: [{
                    field: "token",
                    message: "Invalid or expired verification code. Please request a new code or try again."
                }],
                payload: null,
                status: 400
            }
        }

        const passwordSessionId = crypto.randomUUID();

        await redisUserAccount.createPasswordPageUpdateSession(optSessionId,
            passwordSessionId, checkUserSession.userId);

        return {
            success: true,
            message: "Token verified.",
            payload: { passwordsessionId: passwordSessionId },
            errors: null,
            status: 200
        }
    } catch (error) {
        console.log(error);

        throw new AppError("Please try again after some time.", 500,
            [{ field: "root", message: "Please try again after some time." }]);
    }
}

export const attemptPasswordResetVerifyOptService = async (sessionId) => {
    try {
        const userSessionValidation = await redisUserAccount.
            getResetPasswordRequestSession(sessionId);

        if (Object.keys(userSessionValidation).length === 0) {
            return {
                jsonResponse: {
                    success: false,
                    message: "Invalid Session Id",
                    errors: null,
                    payload: null
                },
                status: 404
            }
        }

        if (Number(userSessionValidation.attempt) >= 5) {
            return {
                success: true,
                message: "OTP Token limit reached",
                errors: null,
                payload: {
                    field: "root",
                    message: "You have reached the maximum number of OTP attempts. Please try again later.",
                    attemptCounter: 5
                },
                status: 200
            }
        }

        const attemptCounter = Number(userSessionValidation.attempt) + 1;

        if (userSessionValidation.validUser === "0") {

            await redisUserAccount.updateResetPasswordVerifyAttempt(sessionId, null, attemptCounter);

            return {
                success: true,
                message: "Token Send Successfully",
                errors: null,
                payload: { attemptCounter: attemptCounter },
                status: 200
            }
        }

        const userDetials = await authRepostory
            .findUserAccountViaId(userSessionValidation.userId);

        const token = crypto.randomInt(100000, 1000000);
        const hashedToken = crypto
            .createHash("sha256")
            .update(String(token))
            .digest("hex");
        console.log(token);


        await redisUserAccount
            .updateResetPasswordVerifyAttempt(sessionId, hashedToken, attemptCounter)

        await resetPasswordEmailSenderUtils(userDetials.email, userDetials.name, token);

        return {
            success: true,
            message: "Token Send Successfully",
            errors: null,
            payload: { attempt: attemptCounter },
            status: 201
        }
    } catch (error) {
        if (error instanceof AppError) return error;

        throw new AppError("Please try again after some time.", 500,
            [{ field: "root", message: "Please try again after some time." }]);
    }
}

export const verifySessionPasswordParmsService = async (sessionId) => {
    try {
        const userSessionValidation = await redisUserAccount.
            getResetPasswordRequestSession(sessionId);

        if (Object.keys(userSessionValidation).length === 0) {
            return {
                jsonResponse: {
                    success: false,
                    message: "Invalid Session Id",
                    errors: null,
                    payload: null
                },
                status: 404
            }
        }

        return {
            jsonResponse: {
                success: true,
                message: "Valid Session Id",
                errors: null,
                payload: null
            },
            status: 200
        }
    } catch (error) {
        console.log(error);

        return {
            jsonResponse: {
                success: false,
                message: "Invalid Session Id",
                errors: null,
                payload: null
            },
            status: 404
        }
    }
}

export const updatePasswordResetPageService = async ({ password, confirmPassword, sessionId }) => {
    try {
        const userSessionValidation = await redisUserAccount.
            getPasswordPageUpdateSession(sessionId);
        console.log(userSessionValidation);

        if (!userSessionValidation) {
            throw new AppError("Session expired", 404,
                [{
                    field: "root",
                    message: "Session expired. Please request a new verification email."
                }]);
        }

        const updatePasswordResponse = await authRepostory
            .updatePasswordOnResetRequest(userSessionValidation.userId, password);

        return {
            success: true,
            message: "Password Updated Successfully",
            errors: null,
            payload: null,
            status: 201
        }
    } catch (error) {
        if (error instanceof AppError) return error;

        throw new AppError("Please try again after some time.", 500,
            [{ field: "root", message: "Please try again after some time." }]);
    }
}

export const verifypasswordSessionPageService = async (sessionId) => {
    try {
        const userSessionValidation = await redisUserAccount.
            getPasswordPageUpdateSession(sessionId);

        if (!userSessionValidation) {
            return {
                jsonResponse: {
                    success: false,
                    message: "Invalid Session Id",
                    errors: null,
                    payload: null
                },
                status: 404
            }
        }

        return {
            jsonResponse: {
                success: true,
                message: "Valid Session Id",
                errors: null,
                payload: null
            },
            status: 200
        }
    } catch (error) {
        return {
            jsonResponse: {
                success: false,
                message: "Invalid Session Id",
                errors: null,
                payload: null
            },
            status: 404
        }
    }
}