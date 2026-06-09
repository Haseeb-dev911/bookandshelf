import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";

import { optTypeVerifyAccount, otpSchemaVerifyAccount } from "../types/form.opt.verify.types";
import { DialogComponent } from "@/shared/components/DialogComponent.message";

import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";
import { showError, showLoading, showSuccess } from "@/shared/utils/toast.global";
import toast from "react-hot-toast";

const TIMER_KEY = "book_shelf_verify_opt_account";
const DURATION = 120;

export const VerifyOtpForm = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<number>(DURATION);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
    setError
  } = useForm<optTypeVerifyAccount>(
    {
      resolver: zodResolver(otpSchemaVerifyAccount),
      mode: "onChange"
    }
  );

  useEffect(() => {
    const updateTimer = () => {
      const start = localStorage.getItem(TIMER_KEY);

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

        localStorage.removeItem(TIMER_KEY);

        return;
      }

      setTimeLeft(remaining);
    };

    if (!localStorage.getItem(TIMER_KEY)) {
      localStorage.setItem(
        TIMER_KEY,
        String(Date.now())
      );
    }

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitToken = async (data: optTypeVerifyAccount) => {
    // submit token
    try {
      await authService.verifyToken(data);

      localStorage.removeItem(TIMER_KEY);
      toast.dismissAll();
      showSuccess("Account verified.");

      navigate("/", { replace: true });

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 429) return setError("root", {
          message: err.response?.data?.errors[0].message
        });

        return formatFormHookErrors(err, setError);
      }
      setError("root", {
        message: "Something went wrong!"
      });
    }
  };

  const handleResendToken = async () => {
    // resend token
    try {

      await authService.resendToken();
      showLoading("Sending email...");

      localStorage.setItem(
        TIMER_KEY,
        String(Date.now())
      );

      setTimeout(() => {

        toast.dismissAll();
        showSuccess("Verification email sent.");
        setTimeLeft(DURATION);
      }, 3000);

    } catch {
      showError("Couldn’t send email. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitToken)}
      className="w-full space-y-4"
    >
      <Input
        label="Enter the Otp"
        placeholder="Enter OTP"
        {...register("token", { required: true })}
        isPassword={false}
        error={errors.token?.message}
      />

      <div className="flex justify-center items-center">
        <Button
          ButtonType="submit"
          disabled={isSubmitting}
        >
          Verify & Continue
        </Button>
      </div>

      {timeLeft > 0 ? (
        <p className="text-black black  text-[14px] text-center flex w-full justify-center items-end gap-1">
          Resend available in : {timeLeft}s
        </p>
      ) : (<button type="button" className="black cursor-pointer text-[14px] text-center
       flex w-full justify-center items-end gap-1">
        Click to re-send token?
        <p className="hover:underline" onClick={handleResendToken}>resend token</p>
      </button>
      )
      }

      {errors.root &&
        <DialogComponent
          title="Verfication Failed"
          description={errors?.root.message}
          open={!!errors?.root.message}
          onclose={() => clearErrors("root")}
        />
      }
    </form >
  );
};