import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AUTH_ROUTE_BUILDER } from '@/app/router/routes.path';

import { authService } from '../service/authService';

import { passswordForgetEmailPageType, passwordForgetEmailPageSchema } from '../types/email.forget.password.types';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { DialogComponent } from '@/shared/components/DialogComponent.message';
import { showSuccess } from '@/shared/utils/toast.global';

export function ResetPasswordEmailForm() {
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors } = useForm<passswordForgetEmailPageType>(
            { resolver: zodResolver(passwordForgetEmailPageSchema), mode: "onSubmit" }
        );

    const submitEmail = async (data: passswordForgetEmailPageType) => {
        try {
            const { payload: { sessionId } } = await authService.requestPasswordResetEmailSender(data.email);
            showSuccess("OTP sent. Check your email.");
            navigate(AUTH_ROUTE_BUILDER.passwordResetVerify(sessionId));

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
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

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit(submitEmail)}>
                <Input
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Button
                    ButtonType="submit"
                    disabled={isSubmitting}>
                    Send Reset Token
                </Button>
            </form>

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
