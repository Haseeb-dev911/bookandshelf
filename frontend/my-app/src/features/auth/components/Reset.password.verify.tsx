import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

import { VerifyResetPasswordTokenForm } from "./Reset.password.verify.form";
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function VerifyResetPasswordToken() {
    return (
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >
            <div className="absolute top-8 left-8">
                <Link to={AUTH_ROUTES_PATH.passwordResetRequest} replace className="flex items-center gap-2 text-sm
                         text-[#5c4a3d] hover:text-[#2C2118] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                        <ArrowLeft />
                    </span>
                </Link>
            </div>

            <div className="flex-grow flex items-center justify-center p-4">
                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Verify Your Identity
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        Enter the 6-digit code sent to your email to reset your password.
                    </p>
                    <VerifyResetPasswordTokenForm />
                </div>
            </div>

        </div>
    );
};