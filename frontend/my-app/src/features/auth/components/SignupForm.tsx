import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { SearchableSelect } from "@/shared/components/select.options";
import { DialogComponent } from '@/shared/components/DialogComponent.message';
import { showToast } from '@/shared/utils/toast.global';

import { signUpFeildsValidationSchema, signUpFieldsValidationTypes } from '../types/signup.account.types';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';
import { useCities, useCountries } from '@/quries/locations.query';

import { authService } from '@/features/auth/service/authService';

export function SignupForm() {
  const navigate = useNavigate();

  const { register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError, clearErrors } = useForm<signUpFieldsValidationTypes>({
      resolver: zodResolver(signUpFeildsValidationSchema),
      mode: "onBlur"
    });


  const { data: countries } = useCountries();

  const selectedCountryId = useWatch({ control, name: "country" });
  const { data: cities = [] } = useCities(selectedCountryId || "");


  const onSubmit = async (data: signUpFieldsValidationTypes) => {
    try {
      await authService.signup(data);

      showToast("Please verify your account to continue.");
      navigate(AUTH_ROUTES_PATH.verification);

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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full Name"
        id="name"
        placeholder="Enter the name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        id="email"
        placeholder="Enter the email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
            htmlFor="country"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Country
          </label>

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                ref={field.ref}
                items={countries ?? []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Country"
                error={errors.country?.message}
              />
            )}
          />

          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
            htmlFor="city"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            City
          </label>

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                ref={field.ref}
                items={cities ?? []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select City"
                error={errors.city?.message}
              />
            )}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Password"
          id="password"
          isPassword={true}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm"
          id="confirmPassword"
          isPassword={true}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <Button ButtonType="submit" disabled={isSubmitting}>
        Sign up
      </Button>

      {errors.root &&
        <DialogComponent title={errors.root?.message?.includes("attempts")
          || errors.root?.message?.includes("requests")
          ? "System Busy" : "Request Could Not Be Completed"}

          description={errors.root.message}
          open={!!errors.root}
          onclose={() => clearErrors("root")}
        />
      }
    </form>
  );
};