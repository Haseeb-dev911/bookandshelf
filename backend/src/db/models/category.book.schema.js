import {
    pgTable, uuid, varchar, text, boolean, integer, jsonb, timestamp, pgEnum, primaryKey,
} from "drizzle-orm/pg-core";

import { userAccountModel } from "./user.account.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";


export const fieldTypeEnum = pgEnum("field_type", [
    "text",
    "number",
    "select",
]);

export const categoriesModel = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),

    ...timeStamps
});

export const categoryFieldModel = pgTable("category_field", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categoriesModel.id, {
            onUpdate: "cascade",
            onDelete: "cascade"
        }),

    // never change or delete
    fieldKey: varchar("field_key", { length: 100 }).notNull(),

    // can be edited
    label: varchar("label", { length: 100 }).notNull(),

    placeHolder: varchar("placeholder", { length: 100 }),

    fieldType: fieldTypeEnum("field_type").notNull(),

    required: boolean("required").default(false).notNull(),

    displayOrder: integer("display_order").default(0).notNull(),

    isActive: boolean("is_active").default(false).notNull(),

    ...timeStamps
});