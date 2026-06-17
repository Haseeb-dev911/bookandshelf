import { api } from "@/services/apiClient";
import { PasswordSettingFormInputs, DetailsFormInputs } from "../types/profile.types";


const endpoints = {
    // Settings Profile
    getProfile: "/settings/profile",
    updateProfile: "/settings/profile",

    // Settings Profile Image
    getUploadSignature: "/settings/profile-image/upload-signature",
    postAssetRecordSignature: "/settings/profile-image/upload-signature/queue",
    updateProfileImage: "/settings/profile-image",
    deleteProfileImage: "/settings/profile-image",

    // Settings Password
    updatePassword: "/settings/password",

    // Auth Logout
    logout: "/auth/logout"
};


export const settingService = {
    updatePassword: async (formData: PasswordSettingFormInputs) => {
        const response = await api.patch(endpoints.updatePassword, formData);
        return response.data;
    },
    getUserprofileData: async () => {
        const response = await api.get(endpoints.getProfile);
        return response.data;
    },
    updateProfileDetails: async (formData: DetailsFormInputs) => {
        const response = await api.patch(endpoints.updateProfile, formData);
        return response.data;
    },
    getUploadSignature: async (folder?: string) => {
        const query = folder ? `?folder=${encodeURIComponent(folder)}` : "";
        const response = await api.get(`${endpoints.getUploadSignature}${query}`);
        return response.data;
    },
    uploadCloudinaryViaSignature: async (cloudName: string,
        formData: FormData,
        resourceType: string) => {
        const response = await api.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            formData,
            { withCredentials: false }
        );
        return response.data;
    },
    createAssetRecordSignature: async (public_id: string, resource_type: string) => {
        await api.post(endpoints.postAssetRecordSignature, { public_id, resource_type });
    },
    updateProfileImage: async (imageDetails: { public_id: string; secure_url: string; format: string; resource_type: string }) => {
        const response = await api.patch(endpoints.updateProfileImage, imageDetails);
        return response.data;
    },
    deleteProfileImage: async () => {
        const response = await api.delete(endpoints.deleteProfileImage);
        return response.data;
    },
    logout: async () => {
        const response = await api.post(endpoints.logout);
        return response.data;
    }
};


