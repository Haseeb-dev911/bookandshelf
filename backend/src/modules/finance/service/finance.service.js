import { eq, sum, count } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { ordersModel } from "../../../db/models/order.schema.js";
import { orderItemsModel } from "../../../db/models/order.schema.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { payoutsModel } from "../../../db/models/payout.schema.js";
import { financialEventsModel } from "../../../db/models/financial.event.schema.js";
import { stripeFinanceService } from "./stripe.finance.service.js";

export const financeService = {
    /**
     * Get aggregated Dashboard stats
     */
    getDashboardStats: async () => {
        // 1. Query PostgreSQL
        const totalRevenueResult = await db.select({ total: sum(ordersModel.amount) }).from(ordersModel).where(eq(ordersModel.status, "paid"));
        const booksSoldResult = await db.select({ count: count() }).from(orderItemsModel);
        const ordersResult = await db.select({ count: count() }).from(ordersModel).where(eq(ordersModel.status, "paid"));
        const customersResult = await db.select({ count: count() }).from(userAccountModel);

        const totalRevenue = totalRevenueResult[0]?.total || 0;
        const booksSold = booksSoldResult[0]?.count || 0;
        const totalOrders = ordersResult[0]?.count || 0;
        const totalCustomers = customersResult[0]?.count || 0;

        // 2. Query Stripe
        const balance = await stripeFinanceService.getBalance();
        const payouts = await stripeFinanceService.getPayouts(5);
        const transactions = await stripeFinanceService.getTransactions(5);

        // 3. Merge everything
        return {
            businessData: {
                totalRevenue,
                booksSold,
                totalOrders,
                totalCustomers,
            },
            stripeData: {
                balance: {
                    available: balance.available,
                    pending: balance.pending,
                },
                recentPayouts: payouts.data,
                recentTransactions: transactions.data,
            }
        };
    },

    /**
     * Retrieve just the Stripe balance
     */
    getBalance: async () => {
        return await stripeFinanceService.getBalance();
    },

    /**
     * Retrieve list of balance transactions
     */
    getTransactions: async (limit, startingAfter) => {
        return await stripeFinanceService.getTransactions(limit, startingAfter);
    },

    /**
     * Retrieve list of payouts from Stripe
     */
    getPayouts: async (limit, startingAfter) => {
        return await stripeFinanceService.getPayouts(limit, startingAfter);
    },

    /**
     * Create a new payout and store reference in DB
     */
    createPayout: async (amountInCents) => {
        // 1. Validate against available balance first
        const balance = await stripeFinanceService.getBalance();
        const availableUsd = balance.available.find(b => b.currency === "usd");
        
        if (!availableUsd || amountInCents > availableUsd.amount) {
            throw new Error("Insufficient available balance for payout.");
        }

        if (amountInCents <= 0) {
            throw new Error("Payout amount must be greater than 0.");
        }

        // 2. Create payout in Stripe
        const stripePayout = await stripeFinanceService.createPayout(amountInCents, "usd");

        // 3. Save payout reference in PostgreSQL
        const [savedPayout] = await db.insert(payoutsModel).values({
            stripePayoutId: stripePayout.id,
            amount: (amountInCents / 100).toString(),
            currency: stripePayout.currency,
            status: stripePayout.status,
            arrivalDate: new Date(stripePayout.arrival_date * 1000),
        }).returning();

        // Optional: Save to financial events ledger
        await db.insert(financialEventsModel).values({
            type: "payout",
            stripeObjectId: stripePayout.id,
            amount: (amountInCents / 100).toString(),
        });

        return { stripePayout, savedPayout };
    },

    getBankAccounts: async () => {
        return await stripeFinanceService.getBankAccounts();
    },

    attachBankAccount: async (token) => {
        return await stripeFinanceService.attachBankAccount(token);
    },

    removeBankAccount: async (bankAccountId) => {
        return await stripeFinanceService.removeBankAccount(bankAccountId);
    },

    setDefaultBankAccount: async (bankAccountId) => {
        return await stripeFinanceService.setDefaultBankAccount(bankAccountId);
    }
};
