import { Controller, useForm } from "react-hook-form";

import { detailsSettingFormSchema, type DetailsFormInputs } from "../types/profile.types";

import { Button } from "@/shared/components/Button.component";
import { Input } from "@/shared/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileDataQuery } from "../services/query.service";
import { useCities } from "@/quries/locations.query";
import { SearchableSelect } from "@/shared/components/select.options";

function DetailsForm() {

  const { data } = useProfileDataQuery();
  console.log(data);

  const { data: cities = [] } = useCities(data?.payload.cityId || "");

  const {
    register,
    handleSubmit,
    // setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<DetailsFormInputs>({
    resolver: zodResolver(detailsSettingFormSchema),

  });


  const handleDetailsSubmit = async (data: DetailsFormInputs) => {
    try {
      console.log("Details Data:", data);

      // await updateProfile(data);
    } catch (error: any) {
      console.error("Details Error:", error);
      // toast.error(error?.message)
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
};

export default DetailsForm;