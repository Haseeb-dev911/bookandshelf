import { useForm } from "react-hook-form";

import { PasswordSettingFormInputs, passwordSettingFormSchema } from "../types/profile.types";

import { Button } from "@/shared/components/Button.component";
import { Input } from "@/shared/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogComponent } from "@/shared/components/DialogComponent.message";
import axios from "axios";
import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";
import { settingService } from "../services/setting.page.service";


function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset
  } = useForm<PasswordSettingFormInputs>({
    resolver: zodResolver(passwordSettingFormSchema),
  });

  const handlePasswordSubmit = async (data: PasswordSettingFormInputs) => {
    try {
      const response = await settingService.updatePassword(data);
      console.log(response);
      reset();
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
      <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-5"    >
        <Input
          type="password"
          label="Current Password"
          placeholder="Enter current password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />

        <Input
          type="password"
          label="New Password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          ButtonType="submit"
          disabled={isSubmitting}
        >
          Update Password
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

export default PasswordForm;