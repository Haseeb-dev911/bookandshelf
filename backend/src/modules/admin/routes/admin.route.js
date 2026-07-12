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
import {
    getAdminUsersController,
    getAdminUserDetailsController,
    blockUserController,
    unblockUserController,
    restrictUserController,
    unrestrictUserController,
    changeUserRoleController
} from "../controller/admin.user.controller.js";

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

// User Management
adminRouter.get("/users", getAdminUsersController);
adminRouter.get("/users/:userId", getAdminUserDetailsController);
adminRouter.patch("/users/:userId/block", blockUserController);
adminRouter.patch("/users/:userId/unblock", unblockUserController);
adminRouter.patch("/users/:userId/restrict", restrictUserController);
adminRouter.patch("/users/:userId/unrestrict", unrestrictUserController);
adminRouter.patch("/users/:userId/change-role", changeUserRoleController);

export default adminRouter;
