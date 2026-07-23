import { pgTable, uuid, varchar, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { ordersModel } from "./order.schema.js";

export const financialEventTypeEnum = pgEnum("financial_event_type", [
    "charge",
    "refund",
    "payout",
    "adjustment",
    "fee"
]);

export const financialEventsModel = pgTable("financial_events", {
    id: uuid("id").defaultRandom().primaryKey(),
    
    type: financialEventTypeEnum("type").notNull(),
    
    stripeObjectId: varchar("stripe_object_id", { length: 255 }).notNull(),
    
    orderId: uuid("order_id").references(() => ordersModel.id, { onDelete: "set null" }),
    
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
