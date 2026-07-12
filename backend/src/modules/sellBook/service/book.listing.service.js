import cloudinary from "../../../config/configcloudinary.js";

import { AppError } from "../../../error/App.error.js";

import { authRepostory } from "../../auth/repository/auth.repository.js";
import { oldBookListingRepositoryRedis } from "../repository/book.listing.redis.js";
import { oldBookListingRepository } from "../repository/book.listing.repository.js";
import { getIo } from "../../../config/socket.js";


export const getBookuploadSignatureService = () => {
    try {

        const timestamp = Math.floor(Date.now() / 1000);
        const folder = "old_books_images";

        const params_to_assign = { timestamp, folder };

        const signature = cloudinary.utils.api_sign_request(params_to_assign,
            process.env.CLOUDINARY_API_SECRET);

        return {
            success: true,
            message: "Uploading Resources Ready",
            errors: null,
            payload: {
                signature,
                timestamp,
                folder,
                apiKey: process.env.CLOUDINARY_API_KEY,
                cloudName: process.env.CLOUDINARY_CLOUD_NAME
            }
        }

    } catch (error) {

        console.log("Signature Service Failed ⛔");
        throw new AppError("Please wait a moment and try again.",
            500,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const validateAssetsRedisService = async (data) => {
    try {
        const currentTime = Date.now();
        const redisValue = `${data?.resource_type}:${data?.public_id}`;

        await oldBookListingRepositoryRedis.imageCleanUpSet(currentTime, redisValue);

        return {
            success: true,
            message: "Image Set created",
            errors: null,
            payload: null
        }
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) return error;

        throw new AppError("Please wait a moment and try again.",
            500,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const getFormMetadataBookUploadService = async (userId) => {
    try {

        const getAllCategories = await oldBookListingRepository.getAllBooksCategory();
        const getLocationData = await oldBookListingRepository.getLocationDataUser(userId);

        return {
            locationPayload: getLocationData,
            categoriesPayload: getAllCategories
        }
    } catch (error) {

        if (error instanceof AppError) return error;
        throw new AppError("Please wait a moment and try again.",
            500,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const oldBookProductAddService = async (formData, userId) => {
    try {
        const verifyCountryId = await authRepostory.verifyCountryId(formData.country)
        const verifyCityId = await authRepostory.verifyCityId(formData.city);

        if ((verifyCountryId.length <= 0) || (verifyCityId.length <= 0)) {
            const filterErrors = [
                (verifyCountryId.length <= 0) && { field: "country", message: "Select you country again" },
                (verifyCityId.length <= 0) && { field: "city", message: "Select you city again" }
            ].filter(Boolean);

            throw new AppError("Locations Errors", 400, filterErrors);
        }

        const categoryValidationResponse = await oldBookListingRepository
            .categoryCheck(formData.categoryId);

        if (categoryValidationResponse.length <= 0) {
            throw new AppError("Category does not exist", 400, [{ field: "categoryId", message: "Selected category is invalid. Please select a valid category." }])
        }
        const creatingOldBookListResponse = await oldBookListingRepository.oldBookAddListing(formData, userId);

        return creatingOldBookListResponse;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError("Please wait a moment and try again.",
            500,
            [{ field: "root", message: "Please wait a moment and try again." }],
        );
    }
}

export const getUserOldBookListingService = async (userId, categoryId) => {
    try {
        const listings = await oldBookListingRepository.getUserOldBookListing(userId, categoryId);
        return listings;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError("Failed to fetch listings.",
            500,
            [{ field: "root", message: "Failed to fetch listings." }],
        );
    }
}

export const deleteUserOldBookProductService = async (bookId, userId) => {
    try {
        const cloudinaryDeleteFn = async (images) => {
            if (!images || images.length === 0) return;
            const publicIds = images.map(img => img.public_id).filter(Boolean);
            if (publicIds.length > 0) {
                await cloudinary.api.delete_resources(publicIds);
            }
        };

        await oldBookListingRepository.deleteListingWithTransaction(bookId, userId, cloudinaryDeleteFn);

        // Notify all connected clients to refresh listings
        try { getIo().emit("LISTING_DELETED", { bookId }); } catch (_) {}

        return { success: true, message: "Listing deleted successfully" };
    } catch (error) {
        console.error(error);
        if (error instanceof AppError) throw error;

        throw new AppError("Failed to delete listing.",
            500,
            [{ field: "root", message: "Failed to delete listing." }],
        );
    }
}

export const markUserOldBookProductSoldService = async (bookId, userId) => {
    try {
        const result = await oldBookListingRepository.markListingAsSold(bookId, userId);

        // Notify all connected clients to refresh listings
        try { getIo().emit("LISTING_SOLD", { bookId }); } catch (_) {}

        return result;
    } catch (error) {
        console.error(error);
        if (error instanceof AppError) throw error;

        throw new AppError("Failed to mark listing as sold.",
            500,
            [{ field: "root", message: "Failed to mark listing as sold." }],
        );
    }
};

export const editListingService = async (bookId, userId, formData) => {
    try {
        const result = await oldBookListingRepository.editListing(bookId, userId, formData);

        // Notify all connected clients to refresh listings
        try { getIo().emit("LISTING_UPDATED", { bookId }); } catch (_) {}

        return result;
    } catch (error) {
        console.error(error);
        if (error instanceof AppError) throw error;

        throw new AppError("Failed to update listing.",
            500,
            [{ field: "root", message: "Failed to update listing." }],
        );
    }
};