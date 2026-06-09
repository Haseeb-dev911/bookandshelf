import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginFormSchema, loginFormType } from '../types/login.form.types';

import { authService } from '../service/authService';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { DialogComponent } from '@/shared/components/DialogComponent.message';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';
import { showToast } from '@/shared/utils/toast.global';

export const LoginForm = () => {

  const navigate = useNavigate();

  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      remember: false
    }
  });

  const onSubmit = async (data: loginFormType) => {
    try {
      console.log(data);

      const response = await authService.login(data);

      if (response.payload.OPT_SESSION) {
        showToast("Please verify your account to continue.");
        navigate(AUTH_ROUTES_PATH.verification);

      } else navigate("/");

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
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

      <Input
        label="Email"
        id="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        id="password"
        isPassword={true}
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <label
          className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <input
            className="w-4 h-4 rounded border-gray-300 text-[#8b5e3c] focus:ring-[#c4956a]/30"
            id="remember-me"
            type="checkbox"
            {...register("remember")}
          />
          Remember me
        </label>
        <Link className="text-sm font-semibold text-[#8b5e3c] hover:underline"
          to={AUTH_ROUTES_PATH.passwordResetRequest}>
          Forgot password?
        </Link>
      </div>

      <Button ButtonType="submit" disabled={isSubmitting}>
        Sign in
      </Button>

      <div className="flex items-center mt-5 my-2 
      text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
        <span className="px-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>or continue with</span>
      </div>
      {errors.root &&
        <DialogComponent title={errors.root?.message?.includes("attempts") ?
          "Too Many Attempts" : "Request Could Not Be Completed"}
          description={errors.root.message}
          open={!!errors.root}
          onclose={() => clearErrors("root")}
        />
      }
    </form >
  );
};
