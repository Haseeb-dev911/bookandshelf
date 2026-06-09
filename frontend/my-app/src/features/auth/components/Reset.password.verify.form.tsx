import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";

import { optTypeVerifyAccount, otpSchemaVerifyAccount } from "../types/form.opt.verify.types";

import { AUTH_ROUTE_BUILDER, AUTH_ROUTES_PATH } from "@/app/router/routes.path";

import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";
import { showError, showLoading, showSuccess } from "@/shared/utils/toast.global";
import { DialogComponent } from "@/shared/components/DialogComponent.message";




const TIMER_KEY = "book_shelf_verify_opt_reset_password";
const DURATION = 60;

export function VerifyResetPasswordTokenForm() {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState<number>(DURATION);

    const [attempt, setAttempt] = useState<number>(0);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors
    } = useForm<optTypeVerifyAccount>(
        {
            resolver: zodResolver(otpSchemaVerifyAccount),
            mode: "onChange"
        }
    );

    useEffect(() => {

        const updateTimer = () => {
            const start = sessionStorage.getItem(TIMER_KEY);

            if (!start) {
                setTimeLeft(0);
                return;
            }

            const elapsed = Math.floor(
                (Date.now() - Number(start)) / 1000
            );

            const remaining = DURATION - elapsed;

            if (remaining <= 0) {
                setTimeLeft(0);

                sessionStorage.removeItem(TIMER_KEY);

                return;
            }

            setTimeLeft(remaining);
        };

        if (!sessionStorage.getItem(TIMER_KEY)) {
            sessionStorage.setItem(
                TIMER_KEY,
                String(Date.now())
            );
        }

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);


    const onSubmit = async (data: optTypeVerifyAccount) => {
        if (!sessionId) {
            showError("This session link is invalid. Please try again.");
            return;
        }

        try {
            const { payload: { passwordsessionId } } = await authService.requestPasswordVerify(sessionId, data.token);

            navigate(AUTH_ROUTE_BUILDER.passwordResetConfirm(passwordsessionId));
            sessionStorage.removeItem(TIMER_KEY);

            showSuccess("Verified. Proceed to reset.");
        } catch (error: any) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    showError("Session expired. Please request a new verification email.");
                    navigate(AUTH_ROUTES_PATH.passwordResetRequest);
                    return;
                }

                if (error.response) return formatFormHookErrors(error, setError);

                return setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
            }

            if (error.request) return setError("root", {
                message: "Server is currently busy or unreachable. Please check your connection and try again.",
            });
        }
    };

    const handleResend = async () => {
        try {
            if (!sessionId) {
                showError("This session link is invalid. Please try again.");
                return;
            }

            if (attempt >= 5) {
                setError("root", {
                    message: "You have reached the maximum number of OTP attempts. Please try again later."
                });
                return;
            }

            const { payload: { attemptCounter } } = await authService.requestPasswordTokenResend(sessionId);
            setAttempt(attemptCounter);
            if (attempt <= 5) return;


            showLoading("Sending email...");
            sessionStorage.setItem(TIMER_KEY, String(Date.now()));

            setTimeout(() => {
                setTimeLeft(DURATION);
                toast.dismissAll();
                showSuccess("Verification email sent.");
            }, 2500);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    formatFormHookErrors(error, setError);
                    return;
                }

            }
            showError("Couldn’t send email. Try again.");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-4"
            >

                <Input
                    label=""
                    placeholder="Enter the OTP"
                    error={errors.token?.message}
                    {...register("token")}
                />


                <Button
                    ButtonType="submit"
                    disabled={isSubmitting}>
                    Verify & Continue
                </Button>

            </form >
            <hr className="mb-4" />
            {(attempt >= 5) ? (
                <p className="textblack text-[14px] text-center">
                    OTP attempts limit reached. You can try again after a short delay.
                </p>

            ) : timeLeft > 55 ? (
                <p className="text-black black text-[14px] text-center flex w-full justify-center items-end gap-1">
                    Resend available in {timeLeft}s
                </p>
            ) : (
                <p
                    className="black cursor-pointer text-[14px] text-center flex w-full justify-center items-end gap-1"
                >
                    Click to re-send token? <button className="hover:underline cursor-pointer" onClick={handleResend}>resend token</button>
                </p>
            )
            }

            {errors.root &&
                <DialogComponent title={errors.root?.message?.includes("attempts") ?
                    "Too Many Attempts" : "Request Could Not Be Completed"}
                    description={errors.root.message}
                    open={!!errors.root}
                    onclose={() => clearErrors("root")}
                />
            }
        </>
    );
};