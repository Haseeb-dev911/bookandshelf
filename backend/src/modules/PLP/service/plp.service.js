import { AppError } from "../../../error/App.error.js";
import { plpRepository } from "../repository/plp.repository.js";


export const getAllActiveListingsService = async (filters) => {
    try {
        const result = await plpRepository.getAllActiveListings(filters);
        return result;
    } catch (error) {
        console.error("PLP Service Error:", error);

        if (error instanceof AppError) throw error;

        throw new AppError(
            "Failed to fetch listings.",
            500,
            [{ field: "root", message: "Failed to fetch listings." }]
        );
    }
};

export const getAllCategoriesService = async () => {
    try {
        const categories = await plpRepository.getAllCategories();
        return categories;
    } catch (error) {
        console.error("PLP Categories Service Error:", error);

        if (error instanceof AppError) throw error;

        throw new AppError(
            "Failed to fetch categories.",
            500,
            [{ field: "root", message: "Failed to fetch categories." }]
        );
    }
};
