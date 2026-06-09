import { Logo } from "@/shared/components/Logo";
import { SetNewPasswordAfterOTPVerificationForm } from "./Update.password.form";

export function SetNewPasswordAfterOTPVerification() {

    return (<>
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >

            <div className="grow flex items-center justify-center p-4">

                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Set a new password
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        Use at least 8 characters with a mix of letters, numbers, and symbols for better security.
                    </p>

                    <SetNewPasswordAfterOTPVerificationForm />
                </div >
            </div>
        </div>
    </>);
};