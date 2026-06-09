import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";
import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

import { ResetUpdatePasswordFormDataType, resetUpdatePasswordSchema } from "../types/email.forget.password.types";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";
import { DialogComponent } from "@/shared/components/DialogComponent.message";
import { showError } from "@/shared/utils/toast.global";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function SetNewPasswordAfterOTPVerificationForm() {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors,
    } = useForm<ResetUpdatePasswordFormDataType>({
        resolver: zodResolver(resetUpdatePasswordSchema),
        defaultValues: { "sessionId": sessionId }
    });


    const onSubmit = async (data: ResetUpdatePasswordFormDataType) => {
        try {
            await authService.updatePasswordCOnfirm(data);
            navigate("/login");

        } catch (error: any) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 404) {
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


    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex order-2 flex-col">

                <div className="mb-5">

                    <Input
                        label="New password"
                        placeholder="Enter password"
                        error={errors.password?.message}
                        isPassword={true}
                        {...register("password")}
                    />
                </div>

                <Input
                    label="Confirm password"
                    placeholder="Enter confirm password"
                    error={errors.confirmPassword?.message}
                    isPassword={true}
                    {...register("confirmPassword")}
                />

                <Button ButtonType="submit" disabled={isSubmitting}>
                    Update Password
                </Button>
            </form>
            {errors.root &&
                <DialogComponent
                    title="Unable to update password"
                    description={errors?.root.message}
                    open={!!errors?.root.message}
                    onclose={() => clearErrors("root")}
                />
            }
        </>
    );
}