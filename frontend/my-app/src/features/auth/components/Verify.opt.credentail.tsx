import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { VerifyOtpForm } from '../components/VerifyOtpForm';
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function VerifyOtpPageCredentails() {

    return (
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >
            <div className="absolute top-8 left-8">
                <Link to="/login" className="flex items-center gap-2 text-sm
                         text-[#5c4a3d] hover:text-[#2C2118] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                        <ArrowLeft />
                    </span>
                </Link>
            </div>

            <div className="grow flex items-center justify-center p-4">

                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Verify Your Identity
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        We've sent a 6-digit code to your email. Enter it below to continue.
                    </p>
                    <VerifyOtpForm />


                    <div className="flex items-center mt-5 my-2 text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                        <span className="px-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Or</span>
                    </div>
                    <p className="text-sm text-center text-gray-500">
                        Changed your mind? <Link to={AUTH_ROUTES_PATH.login} className="text-black hover:underline font-medium">Return to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
