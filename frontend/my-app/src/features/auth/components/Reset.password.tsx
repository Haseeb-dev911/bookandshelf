import { Link } from "react-router-dom";

import { ResetPasswordEmailForm } from "./ResetPasswordForm";
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function ResetPasswordEmailComponent() {
    return (
        <div className="order-2 w-full lg:w-1/2 overflow-y-scroll scrollbar-hide flex items-center">
            <div className='w-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 overflow-y-auto scrollbar-hide'>
                <Logo />
                <div className="mb-8">
                    <h1
                        className="text-[28px] font-bold text-[#1a1a1a] leading-tight mb-2 mt-5"
                    >
                        Reset password
                    </h1>
                    <p
                        className="text-sm text-gray-500 max-w-xs"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <ResetPasswordEmailForm />

                <div className="flex items-center mt-5 my-2 
                   text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                    <span className="px-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>or</span>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Remember your password?{' '}
                    <Link className="font-semibold text-[#8b5e3c] hover:underline" to={AUTH_ROUTES_PATH.login}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}