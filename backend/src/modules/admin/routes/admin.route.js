import express from "express";
import { validateAdminMiddleware, validateEbookMiddleware, validateUpdateEbookMiddleware, validateBulkDiscountMiddleware } from "../middleware/admin.middleware.js";
import {
    getDashboardStatsController,
    getAdminEbooksController,
    createEbookController,
    updateEbookController,
    deleteEbookController,
    applyBulkDiscountController
} from "../controller/admin.controller.js";

const adminRouter = express.Router();

// Apply admin role validation to all admin endpoints
adminRouter.use(validateAdminMiddleware);

// Stats & timlines
adminRouter.get("/stats", getDashboardStatsController);

// E-book CRUD
adminRouter.get("/ebooks", getAdminEbooksController);
adminRouter.post("/ebooks", validateEbookMiddleware, createEbookController);
adminRouter.patch("/ebooks/discount/bulk", validateBulkDiscountMiddleware, applyBulkDiscountController);
adminRouter.patch("/ebooks/:bookId", validateUpdateEbookMiddleware, updateEbookController);
adminRouter.delete("/ebooks/:bookId", deleteEbookController);

export default adminRouter;
