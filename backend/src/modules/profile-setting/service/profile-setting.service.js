import cloudinary from "../../../config/configcloudinary.js";
import { AppError } from "../../../error/App.error.js";
import { profileSettingRepository } from "../repository/profile-setting.repository.js";

export const getUserProfileService = async (userId) => {
    try {
        const profile = await profileSettingRepository.getUserProfile(userId);
        if (!profile) {
            throw new AppError("Profile not found.", 404);
        }
        return {
            success: true,
            message: "Profile retrieved successfully",
            errors: null,
            payload: profile
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to fetch profile details.", 500);
    }
};

export const updateUserProfileService = async (userId, data) => {
    try {
        const updatedProfile = await profileSettingRepository.updateUserProfile(userId, data);
        return {
            success: true,
            message: "Profile updated successfully",
            errors: null,
            payload: updatedProfile
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update profile details.", 500);
    }
};

export const getProfileUploadSignatureService = () => {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const folder = "profile_images";

        const params_to_assign = { timestamp, folder };

        const signature = cloudinary.utils.api_sign_request(
            params_to_assign,
            process.env.CLOUDINARY_API_SECRET
        );

        return {
            success: true,
            message: "Profile upload signature generated",
            errors: null,
            payload: {
                signature,
                timestamp,
                folder,
                apiKey: process.env.CLOUDINARY_API_KEY,
                cloudName: process.env.CLOUDINARY_CLOUD_NAME
            }
        };
    } catch (error) {
        throw new AppError("Failed to generate upload signature.", 500);
    }
};

export const updateProfileImageService = async (userId, imageDetails) => {
    try {
        // Fetch current profile to delete old image if it exists
        const currentProfile = await profileSettingRepository.getUserProfile(userId);
        if (currentProfile && currentProfile.profileImageId) {
            try {
                await cloudinary.api.delete_resources([currentProfile.profileImageId]);
            } catch (err) {
                console.error("Cloudinary delete failed:", err);
            }
        }

        await profileSettingRepository.updateProfileImage(userId, imageDetails);

        const updatedProfile = await profileSettingRepository.getUserProfile(userId);
        return {
            success: true,
            message: "Profile image updated successfully",
            errors: null,
            payload: updatedProfile
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update profile image.", 500);
    }
};

export const deleteProfileImageService = async (userId) => {
    try {
        const currentProfile = await profileSettingRepository.getUserProfile(userId);
        if (currentProfile && currentProfile.profileImageId) {
            try {
                await cloudinary.api.delete_resources([currentProfile.profileImageId]);
            } catch (err) {
                console.error("Cloudinary delete failed:", err);
            }
        }

        await profileSettingRepository.deleteProfileImage(userId);

        const updatedProfile = await profileSettingRepository.getUserProfile(userId);
        return {
            success: true,
            message: "Profile image deleted successfully",
            errors: null,
            payload: updatedProfile
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to delete profile image.", 500);
    }
};

export const updatePasswordService = async (userId, passwordData) => {
    try {
        const { currentPassword, newPassword } = passwordData;
        const currentPasswordHash = await profileSettingRepository.getUserPasswordHash(userId);

        if (currentPasswordHash !== currentPassword) {
            throw new AppError("Incorrect password", 400, [
                { field: "currentPassword", message: "Current password does not match your account password." }
            ]);
        }

        await profileSettingRepository.updatePassword(userId, newPassword);

        return {
            success: true,
            message: "Password changed successfully",
            errors: null,
            payload: null
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update password.", 500);
    }
};
