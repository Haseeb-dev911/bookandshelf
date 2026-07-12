import { eq, and } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { ordersModel, orderItemsModel } from "../../../db/models/order.schema.js";
import { eBookCartModel } from "../../../db/models/ebook.cart.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";
import { checkoutSessionsModel } from "../../../db/models/checkout.session.schema.js";
import { paymentLogsModel } from "../../../db/models/payment.logs.schema.js";
import { inArray } from "drizzle-orm";

// ─── Payment Repository ──────────────────────────────────────────────────────

export const paymentRepository = {
    /**
     * Fetch all cart items for a user with their ebook price & discount info.
     * This is the single source of truth for amount calculation.
     */
    getCartItemsWithPrices: async (userId) => {
        const items = await db
            .select({
                cartId: eBookCartModel.id,
                ebookId: eBookCartModel.ebookId,
                price: eBookProductModel.price,
                discountPercentage: eBookProductModel.discountPercentage,
                title: eBookProductModel.title,
            })
            .from(eBookCartModel)
            .innerJoin(
                eBookProductModel,
                eq(eBookCartModel.ebookId, eBookProductModel.id),
            )
            .where(
                and(
                    eq(eBookCartModel.userId, userId),
                    eq(eBookProductModel.status, "active"),
                ),
            );

        return items;
    },

    /**
     * Create an order with status 'pending' (before payment confirmation).
     */
    createOrder: async ({ userId, stripePaymentIntentId, amount, currency }) => {
        const [order] = await db
            .insert(ordersModel)
            .values({
                userId,
                stripePaymentIntentId,
                amount: amount.toString(),
                currency,
                status: "pending",
            })
            .returning({
                id: ordersModel.id,
                status: ordersModel.status,
            });

        return order;
    },

    /**
     * Create order items for a fulfilled order.
     * @param {string} orderId
     * @param {Array<{ ebookId: string, priceAtPurchase: number }>} items
     */
    createOrderItems: async (orderId, items) => {
        const rows = items.map((item) => ({
            orderId,
            ebookId: item.ebookId,
            priceAtPurchase: item.priceAtPurchase.toString(),
        }));

        await db.insert(orderItemsModel).values(rows);
    },

    /**
     * Clear all cart items for a user after successful payment.
     */
    clearUserCart: async (userId) => {
        await db
            .delete(eBookCartModel)
            .where(eq(eBookCartModel.userId, userId));
    },

    /**
     * Update the order status by Stripe Payment Intent ID.
     */
    updateOrderStatus: async (stripePaymentIntentId, status) => {
        const [updated] = await db
            .update(ordersModel)
            .set({ status })
            .where(eq(ordersModel.stripePaymentIntentId, stripePaymentIntentId))
            .returning({
                id: ordersModel.id,
                status: ordersModel.status,
            });

        return updated;
    },

    /**
     * Find an order by Stripe Payment Intent ID (for idempotency checks).
     */
    findOrderByPaymentIntentId: async (stripePaymentIntentId) => {
        const [order] = await db
            .select({
                id: ordersModel.id,
                status: ordersModel.status,
                userId: ordersModel.userId,
            })
            .from(ordersModel)
            .where(eq(ordersModel.stripePaymentIntentId, stripePaymentIntentId))
            .limit(1);

        return order || null;
    },

    /**
     * Create a checkout session before payment.
     */
    createCheckoutSession: async ({ userId, stripePaymentIntentId, itemsSnapshot, amount, currency }) => {
        const [session] = await db
            .insert(checkoutSessionsModel)
            .values({
                userId,
                stripePaymentIntentId,
                itemsSnapshot,
                amount: amount.toString(),
                currency,
                status: "pending",
            })
            .returning({
                id: checkoutSessionsModel.id,
                status: checkoutSessionsModel.status,
            });

        return session;
    },

    /**
     * Find a checkout session by Stripe Payment Intent ID.
     */
    findCheckoutSessionByIntentId: async (stripePaymentIntentId) => {
        const [session] = await db
            .select()
            .from(checkoutSessionsModel)
            .where(eq(checkoutSessionsModel.stripePaymentIntentId, stripePaymentIntentId))
            .limit(1);

        return session || null;
    },

    /**
     * Update checkout session status.
     */
    updateCheckoutSessionStatus: async (stripePaymentIntentId, status) => {
        const [updated] = await db
            .update(checkoutSessionsModel)
            .set({ status })
            .where(eq(checkoutSessionsModel.stripePaymentIntentId, stripePaymentIntentId))
            .returning({
                id: checkoutSessionsModel.id,
                status: checkoutSessionsModel.status,
            });

        return updated;
    },

    /**
     * Log a payment event.
     */
    createPaymentLog: async ({ stripeEventId, eventType, payload, status, error }) => {
        const [log] = await db
            .insert(paymentLogsModel)
            .values({
                stripeEventId,
                eventType,
                payload,
                status,
                error,
            })
            .returning({
                id: paymentLogsModel.id,
            });

        return log;
    },

    /**
     * Mark a list of ebooks as 'sold' so they can no longer be purchased.
     * @param {string[]} ebookIds
     */
    markEbooksAsSold: async (ebookIds) => {
        if (!ebookIds || ebookIds.length === 0) return;
        await db
            .update(eBookProductModel)
            .set({ status: "sold" })
            .where(inArray(eBookProductModel.id, ebookIds));
    },

    /**
     * Check if a user has already purchased a specific ebook.
     * Returns true if a 'paid' order exists containing that ebook.
     * @param {string} userId
     * @param {string} ebookId
     */
    isAlreadyPurchased: async (userId, ebookId) => {
        const [row] = await db
            .select({ id: orderItemsModel.id })
            .from(orderItemsModel)
            .innerJoin(ordersModel, eq(orderItemsModel.orderId, ordersModel.id))
            .where(
                and(
                    eq(ordersModel.userId, userId),
                    eq(ordersModel.status, "paid"),
                    eq(orderItemsModel.ebookId, ebookId)
                )
            )
            .limit(1);

        return !!row;
    },
};
