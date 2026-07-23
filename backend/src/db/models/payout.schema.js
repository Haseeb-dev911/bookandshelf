import { pgTable, uuid, varchar, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const payoutStatusEnum = pgEnum("payout_status", [
    "pending",
    "in_transit",
    "paid",
    "failed",
    "canceled",
]);

export const payoutsModel = pgTable("payouts", {
    id: uuid("id").defaultRandom().primaryKey(),
    
    stripePayoutId: varchar("stripe_payout_id", { length: 255 }).notNull().unique(),
    
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    
    currency: varchar("currency", { length: 10 }).default("usd").notNull(),
    
    status: payoutStatusEnum("status").default("pending").notNull(),
    
    arrivalDate: timestamp("arrival_date", { withTimezone: true }),
    
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
