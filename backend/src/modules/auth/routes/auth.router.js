import express from "express";
import rateLimit from "express-rate-limit";

import {
    signupMiddleware,
    authSessionAndTokenMiddleware,
    loginAccountMiddleware,
    requestEmailResetPasswordMiddleware,
    tokenValidateMiddleware,
    verifySessionPasswordParms,
    validateUpdatePasswordMiddelware
} from "../middleware/auth.middleware.js";

import {
    attemptPasswordResetVerifyOptController,
    loginUserAccountController,
    passwordResetRequestController,
    passwordResetVerifyOptController,
    resendSignupOtpController,
    signUpCreateAccountController,
    signupPageGuardVerifyTokenController,
    signupVerifyTokenController,
    updatePasswordResetPageController,
    verifypasswordOtpPageSessionController,
    verifypasswordSessionPageController
} from "../controllers/auth.controller.js";

import { getLoginSignupRateLimiter, getPasswordResetRequest, getTokenRateLimiter, useLimiter } from "../utils/auth.rate.limiter.js";

const authRouter = express.Router();

authRouter.post("/signup",
    useLimiter(getLoginSignupRateLimiter),
    signupMiddleware,
    signUpCreateAccountController
);

authRouter.post("/verify-token",
    useLimiter(getTokenRateLimiter),
    authSessionAndTokenMiddleware,
    tokenValidateMiddleware,
    signupVerifyTokenController
);

authRouter.get("/verify-token",
    authSessionAndTokenMiddleware,
    signupPageGuardVerifyTokenController
);

authRouter.get("/resend-token",
    useLimiter(getTokenRateLimiter),
    authSessionAndTokenMiddleware,
    resendSignupOtpController
);

authRouter.post("/login",
    useLimiter(getLoginSignupRateLimiter),
    loginAccountMiddleware,
    loginUserAccountController
);


// Password Reset Pages Router
authRouter.post("/password-reset/request",
    useLimiter(getPasswordResetRequest),
    requestEmailResetPasswordMiddleware,
    passwordResetRequestController
);

authRouter.route("/password-reset/opt-verify/:sessionId")
    .get(
        verifySessionPasswordParms,
        verifypasswordOtpPageSessionController
    )
    .patch(
        useLimiter(getPasswordResetRequest),
        verifySessionPasswordParms,
        attemptPasswordResetVerifyOptController
    )
    .post(
        useLimiter(getPasswordResetRequest),
        verifySessionPasswordParms,
        tokenValidateMiddleware,
        passwordResetVerifyOptController
    );

authRouter.patch("/password-reset/password",
    validateUpdatePasswordMiddelware,
    updatePasswordResetPageController
);

authRouter.get("/password-reset/password/:sessionId",
    verifySessionPasswordParms,
    verifypasswordSessionPageController
);
export default authRouter;