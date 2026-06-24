import { pgTable, pgEnum, uuid, varchar, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userAccountModel } from "./user.account.schema.js";
import { eBookProductModel } from "./e.book.product.schema.js";

// ─── Order Status Enum ────────────────────────────────────────────────────────

export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "paid",
    "failed",
    "refunded",
]);

// ─── Orders Table ─────────────────────────────────────────────────────────────
// Each row = one checkout session / payment intent for a user.

export const ordersModel = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 })
        .notNull()
        .unique(),

    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),

    currency: varchar("currency", { length: 10 }).default("usd").notNull(),

    status: orderStatusEnum("status").default("pending").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Order Items Table ────────────────────────────────────────────────────────
// Each row = one e-book purchased within an order.

export const orderItemsModel = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),

    orderId: uuid("order_id")
        .notNull()
        .references(() => ordersModel.id, { onDelete: "cascade" }),

    ebookId: uuid("ebook_id")
        .references(() => eBookProductModel.id, { onDelete: "set null" }),

    priceAtPurchase: numeric("price_at_purchase", { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const ordersRelations = relations(ordersModel, ({ one, many }) => ({
    user: one(userAccountModel, {
        fields: [ordersModel.userId],
        references: [userAccountModel.id],
    }),
    items: many(orderItemsModel),
}));

export const orderItemsRelations = relations(orderItemsModel, ({ one }) => ({
    order: one(ordersModel, {
        fields: [orderItemsModel.orderId],
        references: [ordersModel.id],
    }),
    ebook: one(eBookProductModel, {
        fields: [orderItemsModel.ebookId],
        references: [eBookProductModel.id],
    }),
}));
