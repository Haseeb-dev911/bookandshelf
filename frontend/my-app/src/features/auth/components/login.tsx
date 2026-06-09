import { Link } from "react-router-dom";


import { LoginForm } from "./LoginForm";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";
import { Logo } from "@/shared/components/Logo";


export const LoginComponent = () => {
    return <div className="order-2 w-full lg:w-1/2 overflow-y-scroll scrollbar-hide">
        <div className="w-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 scrollbar-hide">

            <div className="mb-14">
                <Logo/>
            </div>
            <div className="mb-8">
                <h1 className="text-[36px]  text-[#1a1a1a] leading-tight mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Welcome back
                </h1>
                <p className="text-sm text-gray-500"
                >
                    Please enter your details to sign in.
                </p>
            </div>

            <LoginForm />

            <p
                className="mt-10 text-center text-sm text-gray-500 "

            >
                Don't have an account?{" "}
                <Link className="font-semibold text-[#8b5e3c] hover:underline"
                    to={AUTH_ROUTES_PATH.signup}>
                    Sign up
                </Link>
            </p>
        </div>
    </div >;
};
