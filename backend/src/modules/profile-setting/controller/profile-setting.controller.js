import {
    getUserProfileService,
    updateUserProfileService,
    getProfileUploadSignatureService,
    updateProfileImageService,
    deleteProfileImageService,
    updatePasswordService
} from "../service/profile-setting.service.js";

import { AppError } from "../../../error/App.error.js";

export const getUserProfileController = async (req, res, next) => {
    try {
        const result = await getUserProfileService(req.userId);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateUserProfileController = async (req, res, next) => {
    try {
        const { name, description, city } = req.body;
        // Parse city to integer if present
        const cityId = city ? parseInt(city, 10) : undefined;
        
        const result = await updateUserProfileService(req.userId, {
            name,
            description,
            cityId
        });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getProfileUploadSignatureController = async (req, res, next) => {
    try {
        const result = getProfileUploadSignatureService();
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateProfileImageController = async (req, res, next) => {
    try {
        const { public_id, secure_url, format, resource_type } = req.body;
        if (!public_id || !secure_url) {
            throw new AppError("Invalid image details provided.", 400);
        }
        
        const result = await updateProfileImageService(req.userId, {
            public_id,
            secure_url,
            format,
            resource_type
        });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteProfileImageController = async (req, res, next) => {
    try {
        const result = await deleteProfileImageService(req.userId);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updatePasswordController = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            throw new AppError("Passwords are required.", 400);
        }
        
        const result = await updatePasswordService(req.userId, {
            currentPassword,
            newPassword
        });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
