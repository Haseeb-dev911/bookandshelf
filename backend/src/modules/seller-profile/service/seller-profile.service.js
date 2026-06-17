import { AppError } from "../../../error/App.error.js";
import { sellerProfileRepository } from "../repository/seller-profile.repository.js";

export const getSellerProfileService = async (sellerId) => {
    try {
        const seller = await sellerProfileRepository.getSellerDetails(sellerId);
        if (!seller) {
            throw new AppError("Seller not found.", 404, [
                { field: "sellerId", message: "The requested seller profile does not exist." }
            ]);
        }

        const listings = await sellerProfileRepository.getSellerListings(sellerId);

        return {
            success: true,
            message: "Seller profile retrieved successfully",
            errors: null,
            payload: {
                seller,
                listings
            }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to retrieve seller profile details.", 500);
    }
};
