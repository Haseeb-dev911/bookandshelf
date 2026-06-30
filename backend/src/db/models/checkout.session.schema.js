import { pgTable, pgEnum, uuid, varchar, numeric, timestamp, jsonb } from "drizzle-orm/pg-core";
import { userAccountModel } from "./user.account.schema.js";
import { relations } from "drizzle-orm";

export const checkoutSessionStatusEnum = pgEnum("checkout_session_status", [
    "pending",
    "completed",
    "failed",
]);

export const checkoutSessionsModel = pgTable("checkout_sessions", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 })
        .notNull()
        .unique(),

    // Store a snapshot of the cart items (e.g. [{ ebookId, priceAtPurchase }])
    itemsSnapshot: jsonb("items_snapshot").notNull(),

    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),

    currency: varchar("currency", { length: 10 }).default("usd").notNull(),

    status: checkoutSessionStatusEnum("status").default("pending").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const checkoutSessionsRelations = relations(checkoutSessionsModel, ({ one }) => ({
    user: one(userAccountModel, {
        fields: [checkoutSessionsModel.userId],
        references: [userAccountModel.id],
    }),
}));
