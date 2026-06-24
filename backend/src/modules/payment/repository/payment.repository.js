import { eq, and } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { ordersModel, orderItemsModel } from "../../../db/models/order.schema.js";
import { eBookCartModel } from "../../../db/models/ebook.cart.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";

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
};
