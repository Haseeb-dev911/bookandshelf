import { pgTable, pgEnum, uuid, varchar, timestamp, jsonb, text } from "drizzle-orm/pg-core";

export const paymentLogStatusEnum = pgEnum("payment_log_status", [
    "processed",
    "failed",
]);

export const paymentLogsModel = pgTable("payment_logs", {
    id: uuid("id").defaultRandom().primaryKey(),

    stripeEventId: varchar("stripe_event_id", { length: 255 }).notNull().unique(),

    eventType: varchar("event_type", { length: 255 }).notNull(),

    payload: jsonb("payload").notNull(),

    status: paymentLogStatusEnum("status").default("processed").notNull(),

    error: text("error"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
