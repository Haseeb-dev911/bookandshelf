import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";

import { bookUploadService } from "../service/upload.book.service";

import { fileUploadValidation, imageStateType } from "../types/images.upload.type";
import { bookUploadValidationType } from "../types/upload.form.type";



export async function uploadAssetHelperProduct(fileList: File[],
    setError: UseFormSetError<bookUploadValidationType>,
    setImages: Dispatch<SetStateAction<imageStateType[]>>
): Promise<boolean> {

    for (const image of fileList) {
        // uploading images to cloud
        const validateImage = fileUploadValidation.safeParse(image);
        if (!validateImage.success) {
            setError("root", { message: validateImage.error.errors[0].message });
            return false;
        }

        const temparyIdImage = `temp_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
        const localPreviewURL = URL.createObjectURL(image);

        const [resourceType, resourceFormat] = image.type.split("/");

        if (resourceType !== "image" && resourceType !== "video") {
            setError("root", {
                message: "Only images and videos are allowed"
            });
            return false;
        }

        const placeHolderItem: imageStateType = {
            public_id: temparyIdImage,
            secure_url: localPreviewURL,
            isUploading: true,
            resource_type: resourceType,
            format: resourceFormat
        };


        setImages((pre) => [...pre, placeHolderItem]);

        try {
            const { payload } = await bookUploadService.getUploadSignature();
            const formData = new FormData();

            formData.append("file", image);
            formData.append("api_key", payload.apiKey);
            formData.append("timestamp", payload.timestamp);
            formData.append("signature", payload.signature);
            formData.append("folder", payload.folder);

            const uploadToCloudinaryResponse = await bookUploadService.
                uploadCloudinaryViaSignature(payload.cloudName, formData, resourceType);

            await bookUploadService.createAssetRecordSignature(uploadToCloudinaryResponse.public_id,
                uploadToCloudinaryResponse.resource_type);

            setImages((preImages) =>
                preImages.map((img) => img.public_id === temparyIdImage ?
                    {
                        public_id: uploadToCloudinaryResponse.public_id,
                        secure_url: uploadToCloudinaryResponse.secure_url,
                        format: uploadToCloudinaryResponse.format,
                        resource_type: uploadToCloudinaryResponse.resource_type,
                        isUploading: false
                    } : img)
            );

        } catch (error: any) {

            if (axios.isAxiosError(error)) {
                setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
                setImages(() => ([]));
                return false;
            }
            if (error.request)
                setError("root", {
                    message: "Server is currently busy or unreachable. Please check your connection and try again.",
                });
            setImages(() => ([]));
            return false;
        }

    };
    return false;
}