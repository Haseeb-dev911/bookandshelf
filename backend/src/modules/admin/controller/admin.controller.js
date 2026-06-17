import { adminService } from "../service/admin.service.js";

export const getDashboardStatsController = async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        return res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

export const getAdminEbooksController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const ebooks = await adminService.getEbooks({ page, limit });
        return res.status(200).json(ebooks);
    } catch (error) {
        next(error);
    }
};

export const createEbookController = async (req, res, next) => {
    try {
        const response = await adminService.createEbook(req.body, req.userId);
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

export const updateEbookController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const response = await adminService.updateEbook(bookId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const deleteEbookController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const response = await adminService.deleteEbook(bookId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const applyBulkDiscountController = async (req, res, next) => {
    try {
        const { discountPercentage, categoryId } = req.body;
        const response = await adminService.applyBulkDiscount({ discountPercentage, categoryId });
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
