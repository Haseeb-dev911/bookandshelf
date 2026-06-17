import { AppError } from "../../../error/App.error.js";

import {
    AuthAssignCookieToken,
    verifiedUserCookie
} from "../../../utils/cookie.assign.js";

import { verifySessionPasswordParms } from "../middleware/auth.middleware.js";

import {
    attemptPasswordResetVerifyOptService,
    loginUserAccountservice,
    passwordResetRequestService,
    passwordResetVerifyOptService,
    resendSignupOtpService,
    signupCreateAccountService,
    signupPageGuardVerifyTokenService,
    updatePasswordResetPageService,
    verifypasswordSessionPageService,
    verifySessionPasswordParmsService,
    verifyTokenService
} from "../service/auth.service.js";


export const signUpCreateAccountController = async (req, res, next) => {
    try {
        const signupServiceResponse = await signupCreateAccountService(req.sanitizedBody);

        if (signupServiceResponse.success) {
            AuthAssignCookieToken(
                res,
                signupServiceResponse.userId,
                "1h",
                60 * 60 * 1000
            );
        }

        return res.status(signupServiceResponse.status).json({
            success: signupServiceResponse.success,
            message: signupServiceResponse.message,
            errors: signupServiceResponse.errors,
            payload: signupServiceResponse.payload
        });
    } catch (error) {
        next(error);
    }
}

export const signupVerifyTokenController = async (req, res, next) => {
    try {
        const { userId } = req;
        const { token } = req.sanitizedBody;

        const tokenVerifyResponse = await verifyTokenService(userId, Number(token));

        if (tokenVerifyResponse.success) {
            res.clearCookie("tokenAuth");
            verifiedUserCookie(res, tokenVerifyResponse.payload.userId)
        }

        return res.status(tokenVerifyResponse.status).json({
            success: tokenVerifyResponse.success,
            message: tokenVerifyResponse.message,
            errors: tokenVerifyResponse.errors,
            payload: null
        });

    } catch (error) {
        next(error);
    }
}

export const signupPageGuardVerifyTokenController = async (req, res, next) => {
    try {
        const { userId } = req;

        const tokenVerifyGuardPageResponse = await signupPageGuardVerifyTokenService(userId);

        return res.status(tokenVerifyGuardPageResponse.status).json({
            success: tokenVerifyGuardPageResponse.success,
            message: tokenVerifyGuardPageResponse.message,
            errors: null,
            payload: null
        });
    } catch (error) {
        next(error);
    }
}

export const resendSignupOtpController = async (req, res, next) => {
    try {
        const { userId } = req;

        const responseResendCode = await resendSignupOtpService(userId);

        return res.status(responseResendCode.status).json({
            success: responseResendCode.success,
            message: responseResendCode.message,
            errors: responseResendCode.errors,
            payload: responseResendCode.payload
        });
    } catch (error) {
        next(error);
    }
}

export const loginUserAccountController = async (req, res, next) => {
    try {
        const loginUserDetailsVerify = await loginUserAccountservice(req.sanitizedBody);

        if (loginUserDetailsVerify.success) {

            if (loginUserDetailsVerify.payload.accountVerfied) {
                const maxAge = req.sanitizedBody.remember ? 20 * 24 * 60 * 60 * 1000 : null;
                verifiedUserCookie(res, loginUserDetailsVerify?.userId, maxAge);
            } else {
                AuthAssignCookieToken(res, loginUserDetailsVerify?.userId, "1h", 60 * 60 * 1000);
            }
        }

        return res.status(loginUserDetailsVerify.status).json({
            success: loginUserDetailsVerify.success,
            message: loginUserDetailsVerify.message,
            errors: loginUserDetailsVerify.errors,
            payload: { OPT_SESSION: loginUserDetailsVerify.payload.OPT_SESSION }
        });

    } catch (error) {
        next(error);
    }
}


// Password Reset Pages Controller
export const passwordResetRequestController = async (req, res, next) => {
    const { email } = req.sanitizedBody;

    try {
        const emailSendResponse = await passwordResetRequestService(email);

        return res.status(emailSendResponse.status).json({
            success: emailSendResponse.success,
            message: emailSendResponse.message,
            errors: emailSendResponse.errors,
            payload: emailSendResponse.payload
        });
    } catch (error) {
        console.log(error);

        next(error);
    }
}

export const passwordResetVerifyOptController = async (req, res, next) => {
    try {

        const { token, sessionId } = req.sanitizedBody;
        const tokenVerifyUserResetPassword = await passwordResetVerifyOptService(sessionId, token);

        return res.status(tokenVerifyUserResetPassword.status).json({
            success: tokenVerifyUserResetPassword.success,
            message: tokenVerifyUserResetPassword.message,
            errors: tokenVerifyUserResetPassword.errors,
            payload: tokenVerifyUserResetPassword.payload
        });
    } catch (error) {
        console.log(error);

        next(error);
    }
}

export const attemptPasswordResetVerifyOptController = async (req, res, next) => {
    try {
        const { sessionId } = req.sanitizedBody;

        const reSendTokenPasswordReset = await attemptPasswordResetVerifyOptService(sessionId);

        return res.status(reSendTokenPasswordReset.status).json({
            success: reSendTokenPasswordReset.success,
            message: reSendTokenPasswordReset.message,
            errors: reSendTokenPasswordReset.errors,
            payload: reSendTokenPasswordReset.payload
        });
    } catch (error) {
        next(error);
    }
}

export const verifypasswordOtpPageSessionController = async (req, res, next) => {
    try {
        const { sessionId } = req.sanitizedBody;

        const verifyUserSession = await verifySessionPasswordParmsService(sessionId);

        return res.status(verifyUserSession.status).json(verifyUserSession.jsonResponse);
    } catch (error) {

        next(error);
    }
}

export const updatePasswordResetPageController = async (req, res, next) => {
    try {
        const updatePasswordResponse = await updatePasswordResetPageService(req.body);

        return res.status(updatePasswordResponse.status).json({
            success: updatePasswordResponse.success,
            message: updatePasswordResponse.message,
            errors: updatePasswordResponse.errors,
            payload: updatePasswordResponse.payload
        });
    } catch (error) {
        if (error instanceof AppError) throw error;
        next(error);
    }
}

export const verifypasswordSessionPageController = async (req, res, next) => {
    try {
        const { sessionId } = req.sanitizedBody;

        const verifyUserSession = await verifypasswordSessionPageService(sessionId);

        return res.status(verifyUserSession.status).json(verifyUserSession.jsonResponse);
    } catch (error) {
        next(error);
    }
}

export const logoutUserController = async (req, res, next) => {
    try {
        res.clearCookie("book_shelf_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });
        res.clearCookie("tokenAuth", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
            errors: null,
            payload: null
        });
    } catch (error) {
        next(error);
    }
} 
