import { pgTable, varchar, integer, timestamp, serial } from "drizzle-orm/pg-core";
import { countriesModel } from "./countries.schema.js";

export const citiesModel = pgTable("cities", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 120 }).notNull(),

    countryId: integer("country_id")
        .references(() => countriesModel.id)
        .notNull(),
    
    createdAt: timestamp("created_at").defaultNow(),
}) 