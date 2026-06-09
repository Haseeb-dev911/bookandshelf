import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const countriesModel = pgTable("countries", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 120 }).notNull(),

    phoneCode: varchar("phone_code", { length: 10 }),

    flagUrl: varchar("flag_url", { length: 500 }),
    
    iso2: varchar("iso2", { length: 2 }),

    createdAt: timestamp("created_at").defaultNow(),
});