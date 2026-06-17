import {
    getAllActiveListingsService,
    getAllCategoriesService
} from "../service/plp.service.js";


export const getAllActiveListingsController = async (req, res, next) => {
    try {
        const {
            categoryId = null,
            condition = null,
            type = "all",
            search = null,
            sortBy = "newest",
            page = "1",
            limit = "12",
        } = req.query;

        const pageNum   = Math.max(1, parseInt(page, 10)  || 1);
        const limitNum  = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
        const offset    = (pageNum - 1) * limitNum;

        const result = await getAllActiveListingsService({
            categoryId: categoryId || null,
            condition:  condition  || null,
            type,
            search:     search     || null,
            sortBy,
            limit: limitNum,
            offset,
        });

        return res.status(200).json({
            success: true,
            message: "All active listings fetched successfully",
            errors: null,
            payload: {
                listings: result.listings,
                hasMore:  result.hasMore,
                page:     pageNum,
                limit:    limitNum,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCategoriesController = async (req, res, next) => {
    try {
        const categories = await getAllCategoriesService();

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            errors: null,
            payload: categories
        });
    } catch (error) {
        next(error);
    }
};
