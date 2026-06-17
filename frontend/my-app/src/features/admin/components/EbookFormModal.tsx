import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePLPCategories } from "@/features/PLP/queries/plp.queries";
import { useCreateEbook, useUpdateEbook } from "../queries/admin.queries";
import { settingService } from "@/features/profile-setting/services/setting.page.service";
import toast from "react-hot-toast";
import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";
import { Image as ImageIcon } from "lucide-react";

// Frontend Validation Schema
const ebookFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  author: z.string().min(2, "Author must be at least 2 characters").max(255),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Price must be a positive number"),
  discountPercentage: z.string().optional().refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), "Discount must be between 0 and 100"),
  categoryId: z.string().min(1, "Please select a category"),
});

type EbookFormData = z.infer<typeof ebookFormSchema>;

interface EbookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

export function EbookFormModal({ isOpen, onClose, editData }: EbookFormModalProps) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<EbookFormData>({
    resolver: zodResolver(ebookFormSchema),
    mode: "onBlur"
  });

  const { data: categoriesData } = usePLPCategories();
  const categories = categoriesData?.payload || [];

  const createEbookMutation = useCreateEbook();
  const updateEbookMutation = useUpdateEbook();

  const isEditMode = !!editData;

  useEffect(() => {
    if (isEditMode && isOpen && editData) {
      setValue("title", editData.title);
      setValue("author", editData.author);
      setValue("description", editData.description);
      setValue("price", Number(editData.price).toString());
      setValue("discountPercentage", editData.discountPercentage?.toString() || "0");
      setValue("categoryId", editData.categoryId);
      setCoverPreview(editData.images?.[0]?.secure_url || null);
    } else if (!isOpen) {
      reset();
      setCoverImage(null);
      setCoverPreview(null);
      setPdfFile(null);
    }
  }, [isEditMode, isOpen, editData, setValue, reset]);

  useEffect(() => {
    if (coverImage) {
      const objectUrl = URL.createObjectURL(coverImage);
      setCoverPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [coverImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: EbookFormData) => {
    if (!isEditMode && (!coverImage || !pdfFile)) {
      toast.error("Please upload both a Cover Image and a PDF File.");
      return;
    }

    try {
      let imageResponseObj = null;
      let pdfResponseObj = null;

      // Only upload if new image selected
      if (coverImage) {
        const imageSignatureData = await settingService.getUploadSignature("bookandshelf/ebook-covers");
        const imgSig = imageSignatureData.payload;
        const imageFormData = new FormData();
        imageFormData.append("file", coverImage);
        imageFormData.append("api_key", imgSig.apiKey);
        imageFormData.append("timestamp", imgSig.timestamp.toString());
        imageFormData.append("signature", imgSig.signature);
        imageFormData.append("folder", imgSig.folder);
        const imageResponse = await settingService.uploadCloudinaryViaSignature(imgSig.cloudName, imageFormData, "image");
        
        imageResponseObj = {
          public_id: imageResponse.public_id,
          secure_url: imageResponse.secure_url,
          format: imageResponse.format || "jpg",
          resource_type: imageResponse.resource_type,
        };
      }

      // Only upload if new PDF selected
      if (pdfFile) {
        const pdfSignatureData = await settingService.getUploadSignature("bookandshelf/ebook-pdfs");
        const pdfSig = pdfSignatureData.payload;
        const pdfFormData = new FormData();
        pdfFormData.append("file", pdfFile);
        pdfFormData.append("api_key", pdfSig.apiKey);
        pdfFormData.append("timestamp", pdfSig.timestamp.toString());
        pdfFormData.append("signature", pdfSig.signature);
        pdfFormData.append("folder", pdfSig.folder);
        const pdfResponse = await settingService.uploadCloudinaryViaSignature(pdfSig.cloudName, pdfFormData, "raw");
        
        pdfResponseObj = {
          public_id: pdfResponse.public_id,
          secure_url: pdfResponse.secure_url,
          format: pdfResponse.format || "pdf",
          resource_type: pdfResponse.resource_type,
        };
      }

      const payload: any = {
        ...data,
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage || 0),
      };

      if (imageResponseObj) payload.coverImage = imageResponseObj;
      if (pdfResponseObj) payload.pdfFile = pdfResponseObj;

      if (isEditMode) {
        await updateEbookMutation.mutateAsync({ bookId: editData.id, data: payload });
        toast.success("E-book updated successfully!");
      } else {
        await createEbookMutation.mutateAsync(payload as any);
        toast.success("E-book published successfully!");
      }

      handleClose();
    } catch (error: any) {
      console.error("Failed to upload/update e-book", error);
      if (axios.isAxiosError(error) && error.response) {
         if (error.response.data?.errors) {
            formatFormHookErrors(error, setError);
         } else {
            setError("root", { message: error.response.data?.message || "An error occurred during upload." });
         }
         toast.error(`An error occurred during ${isEditMode ? "updating" : "publishing"} E-book. Check the form for details.`);
      } else {
         toast.error(`An unexpected error occurred while ${isEditMode ? "updating" : "publishing"} the E-book.`);
      }
    }
  };

  const handleClose = () => {
    reset();
    setCoverImage(null);
    setPdfFile(null);
    if (!isEditMode) setCoverPreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-xl border-slate-200 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold">
            {isEditMode ? "Edit E-Book" : "Publish E-Book"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details of your E-book below." : "Fill in the details below to upload a new E-book to the marketplace."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-8">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <Input className="w-full" {...register("title")} placeholder="Book Title" />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Author</label>
              <Input className="w-full" {...register("author")} placeholder="Author Name" />
              {errors.author && <p className="text-red-500 text-xs">{errors.author.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <Textarea className="w-full" {...register("description")} placeholder="Brief description..." rows={4} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                <Input className="w-full" type="number" step="0.01" {...register("price")} placeholder="0.00" />
                {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-sm font-semibold text-slate-700">Discount (%)</label>
                <Input className="w-full" type="number" {...register("discountPercentage")} placeholder="0" />
                {errors.discountPercentage && <p className="text-red-500 text-xs">{errors.discountPercentage.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select 
                className="w-full bg-transparent border border-slate-200 rounded-md py-3 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" 
                {...register("categoryId")}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message}</p>}
            </div>

            {errors.root && (
              <p className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-200">{errors.root.message}</p>
            )}
          </div>

          <div className="space-y-6 flex flex-col border-t border-slate-100 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Cover Image {isEditMode && "(Optional - Reupload to change)"}</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} className="w-full cursor-pointer" />
              <div className="mt-4 h-64 w-full max-w-sm mx-auto border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 overflow-hidden">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Image Selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">PDF File {isEditMode && "(Optional - Reupload to change)"}</label>
              <Input type="file" accept="application/pdf" onChange={handlePdfChange} className="w-full cursor-pointer" />
              {pdfFile && <p className="text-sm text-emerald-600 font-medium">✓ {pdfFile.name}</p>}
            </div>

            <div className="pt-6 mt-4 flex justify-end gap-3 border-t border-slate-100 pb-2">
              <Button variant="outline" type="button" onClick={handleClose} disabled={isSubmitting} className="px-6 py-2">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2 font-medium">
                {isSubmitting ? (isEditMode ? "Updating..." : "Uploading...") : (isEditMode ? "Update E-Book" : "Publish E-Book")}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
