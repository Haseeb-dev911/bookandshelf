import { adminUserService } from "../service/admin.user.service.js";
import { adminUserPaginationSchema, blockUserSchema, changeRoleSchema } from "../validation/admin.user.validation.js";
import { errorsCollectZod } from "../../auth/utils/error.collect.zod.js";
import { AppError } from "../../../error/App.error.js";

export const getAdminUsersController = async (req, res, next) => {
    try {
        const validationResult = adminUserPaginationSchema.safeParse(req.query);
        if (!validationResult.success) {
            const collectingErrors = errorsCollectZod(validationResult);
            return next(new AppError("Invalid query parameters", 400, collectingErrors));
        }

        const data = await adminUserService.getUsersList(validationResult.data);
        
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const getAdminUserDetailsController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = await adminUserService.getUserDetails(userId);
        
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const blockUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const validationResult = blockUserSchema.safeParse(req.body);
        if (!validationResult.success) {
            const collectingErrors = errorsCollectZod(validationResult);
            return next(new AppError("Invalid input parameters", 400, collectingErrors));
        }

        const data = await adminUserService.blockUser(req.user.id, userId, validationResult.data.reason);
        
        return res.status(200).json({
            success: true,
            message: "User blocked successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const unblockUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = await adminUserService.unblockUser(userId);
        
        return res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const restrictUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = await adminUserService.restrictUser(req.user.id, userId);
        
        return res.status(200).json({
            success: true,
            message: "User restricted successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const unrestrictUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = await adminUserService.unrestrictUser(userId);
        
        return res.status(200).json({
            success: true,
            message: "User unrestricted successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const changeUserRoleController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const validationResult = changeRoleSchema.safeParse(req.body);
        if (!validationResult.success) {
            const collectingErrors = errorsCollectZod(validationResult);
            return next(new AppError("Invalid input parameters", 400, collectingErrors));
        }

        const data = await adminUserService.changeUserRole(req.user.id, userId, validationResult.data.role);
        
        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};
