import axios from "axios";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { USER_ROUTES_PATH } from "@/app/router/routes.path";

import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";
import { uploadAssetHelperProduct } from "../utils/upload.book.assets.helper";

import { bookUploadValidationSchema } from "../types/upload.form.type";
import type { bookUploadValidationType } from "../types/upload.form.type";
import { imageStateType } from "../types/images.upload.type";
import { product_condition_states } from "@/shared/utils/constant.values";

import Loader from "@/shared/components/loaders/Loader";
import { SearchableSelect } from "@/shared/components/select.options";
import { DialogComponent } from "@/shared/components/DialogComponent.message";
import { Button } from "@/shared/components/Button.component";
import { Input } from "@/shared/components/Input";

import { useCities } from "@/quries/locations.query";
import { BookOldUploadMetaData } from "../quries/upload.book.metadata.query";
import { showSuccess } from "@/shared/utils/toast.global";

import { bookUploadService } from "../service/upload.book.service";
import { useQueryClient } from "@tanstack/react-query";
// import { useUserOldBookListing } from "@/features/listing/quries/listing.queries";


export function BookUploadForm() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // ----------------- User Form MetaData  -----------------
  const { data } = BookOldUploadMetaData();

  const { data: cities = [] } = useCities(data?.payload?.locationPayload?.countryId || "");

  // ----------------- Handle Images States -----------------
  const [images, setImages] = useState<imageStateType[]>([]);
  const [isuploading, setIsUploading] = useState<boolean>(false);

  // ----------------- Handle Images States -----------------
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, clearErrors, setValue, control } = useForm<bookUploadValidationType>({
      resolver: zodResolver(bookUploadValidationSchema),
      mode: "onBlur"
    });

  // ----------------- Handle Form Submit -----------------
  const onSubmit = async (formData: bookUploadValidationType) => {
    try {

      await bookUploadService.addBook(formData);
      showSuccess("Book listed successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["user-old-book-listings"],
      });
      
      navigate(USER_ROUTES_PATH.sell);

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) return formatFormHookErrors(error, setError);

        return setError("root", {
          message: "Connection temporarily delayed. Please check your network and try again shortly.",
        });
      }
      if (error.request) return setError("root", {
        message: "Server is currently busy or unreachable...",
      });
    }
  };

  // ----------------- Handle Images Upload -----------------
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    if ((images.length + fileList.length) > 12)
      return setError("root", { message: "You can upload a maximum of 12 files." });

    setIsUploading(true);

    const uploadingResult: boolean = await uploadAssetHelperProduct(fileList, setError, setImages);

    setIsUploading(uploadingResult);
    event.target.value = "";
  };

  // ----------------- Handle Images Remove States -----------------
  const handleRemoveImage = (public_id: string) => {
    setImages((pre) =>
      pre.filter((image) => image.public_id !== public_id)
    );
  };

  // ----------------- Default values use effect -------------------
  useEffect(() => {
    if (!data?.payload) return;

    if (data?.payload?.locationPayload) {
      setValue("country", data.payload.locationPayload.countryId?.toString() || "");
      setValue("city", data.payload.locationPayload.cityId?.toString() || "");
    }
    setValue("customFields", {});

  }, [data, setValue]);

  useEffect(() => {
    setValue("images", images, { shouldValidate: true });
  }, [images, setValue]);





  // ------------------ Form HTML -----------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">

      <div className="mb-8">
        <h2 className="text-3xl  text-[#2C2520] mb-2">List Your Pre-Loved Book</h2>
      </div>

      {/* listing the accordian */}
      <Accordion
        type="single"
        collapsible
        defaultValue="step-1"
        className="w-full gap-4 border-0"
      >
        {/* category accoridans */}
        <AccordionItem value="step-1" className="w-full">
          <AccordionTrigger className="w-full ">Select Category</AccordionTrigger >
          <AccordionContent className="">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Category</label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    ref={field.ref}
                    items={data?.payload?.categoriesPayload ?? []}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a category..."
                    error={errors.categoryId?.message}
                  />
                )}
              />
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
            </div >
          </AccordionContent>
        </AccordionItem>

        {/* country accoridans */}
        <AccordionItem value="step-2" className="">
          <AccordionTrigger>Select your city</AccordionTrigger>
          <AccordionContent className="data-[state=open]:h-auto">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">City to sell</label>

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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-3">
          <AccordionTrigger>Fill the book form</AccordionTrigger>
          <AccordionContent>
            <div className="h-auto space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="file-upload" className="text-xl font-semibold text-gray-800">Upload Images</label>
              </div>
              <label htmlFor="file-upload" className="group relative flex flex-col items-center justify-center w-full aspect-[4/3] max-h-[260px] border-2 border-dashed border-gray-300 rounded-3xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer text-center p-6">
                <input
                  onChange={handleImageUpload}
                  id="file-upload"
                  type="file"
                  multiple
                  disabled={isuploading}
                  accept="image/*, vedio/*"
                  className=" hidden" />
                <div className="mb-4 text-gray-700 group-hover:scale-120 transition-transform duration-200 flex items-center justify-center">
                  <Upload />
                </div>
                <p className="text-gray-600 font-medium mb-4">Upload your image here</p>

                {isuploading ? <Loader /> :
                  <span className="transition-transform duration-200 px-5 py-1.5 bg-white border hover:scale-120 border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-2xs group-hover:bg-gray-50 group-hover:border-gray-300 ">
                    Browse
                  </span>
                }
              </label>

              <div className="flex flex-wrap gap-2 w-full">
                {images.map((image) => (
                  <div
                    key={image.public_id}
                    className="relative w-23 h-23 shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-2xs group"
                  >
                    <img
                      src={image.secure_url}
                      alt="upload image"
                      className="w-full h-full object-cover"
                    />

                    {(image.isUploading) ?
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10">
                        <Loader /></div> : <button
                          type="button"
                          onClick={() => handleRemoveImage(image.public_id)}
                          className="absolute top-2 right-1 bg-white text-gray-700 p-0.5 rounded-full shadow-xs hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
                          aria-label={`Remove`}>
                        <X className="w-2.5 h-2.5 stroke-[2.5]" />
                      </button>
                    }
                  </div>
                ))}
              </div >
              {errors.images?.message && <p className="text-red-500 text-xs mt-1">{errors.images?.message}</p>}


              {/* --- Book Title --- */}
              < div >
                <Input
                  label="Enter the title"
                  error={errors?.title?.message}
                  {...register("title")} />
              </div >

              {/* --- Book Author --- */}
              < div >
                <Input
                  label="Enter the author"
                  error={errors?.author?.message}
                  {...register("author")} />
              </div >

              {/* --- Simple Description --- */}
              < div >
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Description & Condition</label>
                <textarea
                  rows={5}
                  placeholder="Describe the book's history, condition, or any unique details here..."
                  {...register("description")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#FCFDFD] focus:border-black outline-none transition text-sm resize-none text-black"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div >

              {/* Select category */}
              <div className="flex justify-between flex-row w-full gap-10">
                <div className="w-full">
                  <label id="condition" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Select condition</label>
                  <select {...register("condition")} className="w-full border-gray-200 border-[1px] p-[13px] rounded-md bg-[#FCFDFD]" id="condition">
                    {product_condition_states.map((v, i) =>
                      <option key={i} value={v}>{v}</option>
                    )}
                  </select>

                  {errors.condition && <p className="text-red-500 text-xs mt-1">{errors?.condition.message}</p>}

                </div>
                {/* --- Price --- */}
                <div className="w-full">
                  <Input
                    label="Enter the price"
                    error={errors?.price?.message}
                    {...register("price")} />
                </div>
              </div >

              {/* --- Action Buttons --- */}
              < div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4" >
                <Button
                  ButtonType="submit"
                  disabled={isSubmitting || isuploading}                 >
                  {"PUBLISH LISTING"}
                </Button>
              </div>
            </div >
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {
        errors.root && (
          <DialogComponent
            title={errors.root?.message?.includes("attempts")
              ? "System Busy" : "Request Could Not Be Completed"}
            description={errors.root.message}
            open={!!errors.root}
            onclose={() => clearErrors("root")}
          />
        )
      }
    </form >
  );
};