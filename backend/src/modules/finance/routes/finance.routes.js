import express from "express";
import {
    getDashboardStatsController,
    getBalanceController,
    getTransactionsController,
    getPayoutsController,
    createPayoutController,
    getBankAccountsController,
    attachBankAccountController,
    removeBankAccountController,
    setDefaultBankAccountController
} from "../controller/finance.controller.js";
import { validateAdminMiddleware } from "../../admin/middleware/admin.middleware.js";

const financeRouter = express.Router();

financeRouter.use(validateAdminMiddleware);

financeRouter.get("/dashboard", getDashboardStatsController);
financeRouter.get("/balance", getBalanceController);
financeRouter.get("/transactions", getTransactionsController);
financeRouter.get("/payouts", getPayoutsController);
financeRouter.post("/payout", createPayoutController);

financeRouter.get("/banks", getBankAccountsController);
financeRouter.post("/banks", attachBankAccountController);
financeRouter.delete("/banks/:id", removeBankAccountController);
financeRouter.patch("/banks/:id/default", setDefaultBankAccountController);

export default financeRouter;
