import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { settingService } from "../services/setting.page.service";
import { Loader2, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import defaultImg from "@/assets/default-img.jpg";

interface AvatarFormProps {
    initialAvatarUrl?: string | null;
    hasCustomImage?: boolean;
}

function AvatarForm({ initialAvatarUrl, hasCustomImage }: AvatarFormProps) {
    const [isUploading, setIsUploading] = useState(false);
    const queryClient = useQueryClient();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            return;
        }

        try {
            setIsUploading(true);
            toast.loading("Uploading image...", { id: "avatar-upload" });

            // 1. Get Signature from Backend
            const { payload } = await settingService.getUploadSignature();
            
            // 2. Upload to Cloudinary
            const formData = new FormData();
            const [resourceType] = file.type.split("/");

            formData.append("file", file);
            formData.append("api_key", payload.apiKey);
            formData.append("timestamp", payload.timestamp.toString());
            formData.append("signature", payload.signature);
            formData.append("folder", payload.folder);

            const uploadResponse = await settingService.uploadCloudinaryViaSignature(
                payload.cloudName,
                formData,
                resourceType
            );

            // 3. Update Database
            await settingService.updateProfileImage({
                public_id: uploadResponse.public_id,
                secure_url: uploadResponse.secure_url,
                format: uploadResponse.format,
                resource_type: uploadResponse.resource_type
            });

            // 5. Invalidate react-query cache
            await queryClient.invalidateQueries({ queryKey: ["profileData"] });
            toast.success("Profile picture updated successfully!", { id: "avatar-upload" });
        } catch (error: any) {
            console.error("Avatar upload error:", error);
            toast.error("Failed to upload profile picture. Please try again.", { id: "avatar-upload" });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your profile picture?")) return;

        try {
            setIsUploading(true);
            toast.loading("Deleting image...", { id: "avatar-delete" });

            await settingService.deleteProfileImage();
            
            await queryClient.invalidateQueries({ queryKey: ["profileData"] });
            toast.success("Profile picture deleted successfully!", { id: "avatar-delete" });
        } catch (error: any) {
            console.error("Avatar delete error:", error);
            toast.error("Failed to delete profile picture.", { id: "avatar-delete" });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-8 bg-white/50 p-4 rounded-xl border border-gray-100/80">
            <div className="relative group h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 hover:scale-105">
                <img
                    src={initialAvatarUrl || defaultImg}
                    alt="Profile Avatar"
                    className="h-full w-full object-cover"
                />
                {isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs z-10">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 items-center sm:items-start">
                <h3 className="font-semibold text-gray-800 text-lg">Change Profile Picture</h3>
                <p className="text-gray-500 text-sm max-w-sm text-center sm:text-left">
                    Upload a custom JPG or PNG profile image. Recommended size: 400x400px.
                </p>

                <div className="flex items-center gap-3 mt-1">
                    <label className="cursor-pointer">
                        <span className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white font-medium text-sm transition-all hover:bg-neutral-800 shadow-sm">
                            <Upload className="w-4 h-4" />
                            Upload New
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </label>

                    {hasCustomImage && (
                        <button
                            type="button"
                            disabled={isUploading}
                            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 px-4 py-2 font-medium text-sm transition-all cursor-pointer disabled:opacity-50"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove Photo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AvatarForm;