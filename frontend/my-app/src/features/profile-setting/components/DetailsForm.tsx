import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { detailsSettingFormSchema, type DetailsFormInputs } from "../types/profile.types";
import { Button } from "@/shared/components/Button.component";
import { Input } from "@/shared/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileDataQuery } from "../services/query.service";
import { useCities } from "@/quries/locations.query";
import { SearchableSelect } from "@/shared/components/select.options";
import { settingService } from "../services/setting.page.service";
import toast from "react-hot-toast";
import axios from "axios";
import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

function DetailsForm() {
  const { data } = useProfileDataQuery();
  const queryClient = useQueryClient();

  // Query cities based on the countryId fetched with the profile
  const countryIdStr = data?.payload?.countryId?.toString() || "";
  const { data: cities = [] } = useCities(countryIdStr);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<DetailsFormInputs>({
    resolver: zodResolver(detailsSettingFormSchema),
  });

  // Prefill default values when profile data is loaded
  useEffect(() => {
    if (data?.payload) {
      setValue("name", data.payload.name || "");
      setValue("description", data.payload.description || "");
      setValue("city", data.payload.cityId?.toString() || "");
    }
  }, [data, setValue]);

  const handleDetailsSubmit = async (formData: DetailsFormInputs) => {
    try {
      toast.loading("Saving changes...", { id: "details-update" });
      
      await settingService.updateProfileDetails(formData);
      
      await queryClient.invalidateQueries({ queryKey: ["profileData"] });
      toast.success("Profile details updated successfully!", { id: "details-update" });
    } catch (error: any) {
      console.error("Details update error:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Failed to update profile. Please verify your inputs.", { id: "details-update" });
        return formatFormHookErrors(error, setError);
      }
      
      toast.error(error?.message || "Something went wrong. Please try again.", { id: "details-update" });
      setError("root", {
        message: "Server is currently busy or unreachable. Please try again later."
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleDetailsSubmit)}
      className="space-y-5"
    >
      <Input
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Description"
        placeholder="Tell us about yourself"
        error={errors.description?.message}
        {...register("description")}
      />

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

      <Button
        ButtonType="submit"
        disabled={isSubmitting}
      >
        Save Changes
      </Button>
    </form >
  );
}

export default DetailsForm;