import { api } from "@/services/apiClient";
import { PasswordSettingFormInputs } from "../types/profile.types";


const endpoints = {
    // Settings Profile
    getProfile: "/settings/profile",
    updateProfile: "/settings/profile",

    // Settings Profile Image
    uploadProfileImage: "/settings/profile-image",
    updateProfileImage: "/settings/profile-image",
    deleteProfileImage: "/settings/profile-image",

    // Settings Password
    verifyCurrentPassword: "/settings/password/verify",
    updatePassword: "/settings/password",
};


export const settingService = {
    updatePassword: async (formData: PasswordSettingFormInputs) => {
        const response = await api.patch(endpoints.updatePassword, formData);
        return response.data;
    },
    getUserprofileData: async () => {
        const response = await api.get(endpoints.getProfile);
        return response.data;
    }
};

