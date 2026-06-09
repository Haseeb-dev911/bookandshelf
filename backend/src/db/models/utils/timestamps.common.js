import { timestamp } from "drizzle-orm/pg-core";

export const timeStamps = {
    createdAt: timestamp("created_at", {
        withTimezone: true,
    }).defaultNow().notNull(),

    updatedAt: timestamp("updated_at", {
        withTimezone: true,
    }).defaultNow().notNull().$onUpdate(() => new Date())
}