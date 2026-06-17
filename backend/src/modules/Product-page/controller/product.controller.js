import { getProductDetailsService } from "../service/product.service.js";

export const getProductDetailsController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const product = await getProductDetailsService(bookId);

        return res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            errors: null,
            payload: product
        });
    } catch (error) {
        next(error);
    }
};
