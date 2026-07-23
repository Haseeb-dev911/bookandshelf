import { financeService } from "../service/finance.service.js";
import { AppError } from "../../../error/App.error.js";

export const getDashboardStatsController = async (req, res, next) => {
    try {
        const stats = await financeService.getDashboardStats();
        res.status(200).json({
            success: true,
            message: "Finance dashboard stats retrieved successfully",
            payload: stats
        });
    } catch (error) {
        next(error);
    }
};

export const getBalanceController = async (req, res, next) => {
    try {
        const balance = await financeService.getBalance();
        res.status(200).json({
            success: true,
            message: "Stripe balance retrieved successfully",
            payload: {
                available: balance.available,
                pending: balance.pending,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getTransactionsController = async (req, res, next) => {
    try {
        const { limit, starting_after } = req.query;
        const transactions = await financeService.getTransactions(
            limit ? parseInt(limit) : 10, 
            starting_after
        );
        res.status(200).json({
            success: true,
            message: "Transactions retrieved successfully",
            payload: transactions
        });
    } catch (error) {
        next(error);
    }
};

export const getPayoutsController = async (req, res, next) => {
    try {
        const { limit, starting_after } = req.query;
        const payouts = await financeService.getPayouts(
            limit ? parseInt(limit) : 10, 
            starting_after
        );
        res.status(200).json({
            success: true,
            message: "Payouts retrieved successfully",
            payload: payouts
        });
    } catch (error) {
        next(error);
    }
};

export const createPayoutController = async (req, res, next) => {
    try {
        const { amount } = req.body; // amount in dollars, we convert to cents
        
        if (!amount || amount <= 0) {
            throw new AppError("Invalid payout amount", 400);
        }
        
        const amountInCents = Math.round(amount * 100);
        
        const payout = await financeService.createPayout(amountInCents);
        
        res.status(200).json({
            success: true,
            message: "Payout created successfully",
            payload: payout
        });
    } catch (error) {
        next(error);
    }
};

export const getBankAccountsController = async (req, res, next) => {
    try {
        const banks = await financeService.getBankAccounts();
        res.status(200).json({
            success: true,
            message: "Bank accounts retrieved successfully",
            payload: banks
        });
    } catch (error) {
        next(error);
    }
};

export const attachBankAccountController = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new AppError("Bank account token is required", 400);
        }
        
        const bankAccount = await financeService.attachBankAccount(token);
        
        res.status(200).json({
            success: true,
            message: "Bank account attached successfully",
            payload: bankAccount
        });
    } catch (error) {
        next(error);
    }
};

export const removeBankAccountController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Bank account ID is required", 400);
        }
        
        const result = await financeService.removeBankAccount(id);
        
        res.status(200).json({
            success: true,
            message: "Bank account removed successfully",
            payload: result
        });
    } catch (error) {
        next(error);
    }
};

export const setDefaultBankAccountController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Bank account ID is required", 400);
        }
        
        const result = await financeService.setDefaultBankAccount(id);
        
        res.status(200).json({
            success: true,
            message: "Default bank account updated successfully",
            payload: result
        });
    } catch (error) {
        next(error);
    }
};
