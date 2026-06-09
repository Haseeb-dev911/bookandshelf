import express from "express";
import { validateuserMiddleware } from "../../sellBook/middleware/book.listing.middleware.js";
import {
    getUserProfileController,
    updateUserProfileController,
    getProfileUploadSignatureController,
    updateProfileImageController,
    deleteProfileImageController,
    updatePasswordController
} from "../controller/profile-setting.controller.js";

const profileSettingRouter = express.Router();

// Fetch and Update Profile Details
profileSettingRouter.get("/profile", validateuserMiddleware, getUserProfileController);
profileSettingRouter.patch("/profile", validateuserMiddleware, updateUserProfileController);

// Change Password
profileSettingRouter.patch("/password", validateuserMiddleware, updatePasswordController);

// Profile Image Upload Signature & Direct DB Ops
profileSettingRouter.get("/profile-image/upload-signature", validateuserMiddleware, getProfileUploadSignatureController);
profileSettingRouter.patch("/profile-image", validateuserMiddleware, updateProfileImageController);
profileSettingRouter.delete("/profile-image", validateuserMiddleware, deleteProfileImageController);

export default profileSettingRouter;
