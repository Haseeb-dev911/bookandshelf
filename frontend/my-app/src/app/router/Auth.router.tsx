import { RouteObject } from "react-router-dom";

import { AUTH_ROUTES_PATH } from './routes.path';

import {
    LoginPage,
    ResetPasswordEmailPage,
    ResetPasswordVerifyTokenPage,
    SignupPage,
    UpdatePasswordPage,
    VerifySignOtpPage
} from "@/features/auth/index";

import { AuthGuardOTPVerifyCredientails } from "@/features/auth/routes/Auth.guard";
import { AuthGaurdResetSessionPage } from "@/features/auth/routes/Auth.reset.session.guard";
import { AuthGaurdUpdatePasswordSessionPage } from "@/features/auth/routes/Auth.gaurd.update.password";


export const AuthRouter: RouteObject[] = [
    {
        path: AUTH_ROUTES_PATH.signup,
        element: <SignupPage />
    },
    {
        path: AUTH_ROUTES_PATH.login,
        element: <LoginPage />
    },
    {
        path: AUTH_ROUTES_PATH.verification,
        element:
            <AuthGuardOTPVerifyCredientails>
                <VerifySignOtpPage />
            </AuthGuardOTPVerifyCredientails>
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetRequest,
        element: < ResetPasswordEmailPage />
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetVerify,
        element:
            <AuthGaurdResetSessionPage>
                <ResetPasswordVerifyTokenPage />
            </AuthGaurdResetSessionPage>
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetConfirm,
        element:
            <AuthGaurdUpdatePasswordSessionPage>
                <UpdatePasswordPage />
            </AuthGaurdUpdatePasswordSessionPage>
    }
];