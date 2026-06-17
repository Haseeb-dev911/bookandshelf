import { AppError } from "../../../error/App.error.js";
import { productPageRepository } from "../repository/product.repository.js";

export const getProductDetailsService = async (bookId) => {
    try {
        const product = await productPageRepository.getProductDetails(bookId);
        
        if (!product) {
            throw new AppError("Product not found", 404, [{ field: "root", message: "Product not found" }]);
        }

        return product;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to fetch product details", 500, [{ field: "root", message: "Failed to fetch product details" }]);
    }
};
