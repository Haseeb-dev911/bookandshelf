import { uuid, pgTable, jsonb, pgEnum, varchar, text, integer, numeric } from "drizzle-orm/pg-core";

import { userAccountModel } from "./user.account.schema.js";
import { categoriesModel } from "./category.book.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";
import { citiesModel } from "./cites.schema.js";
import { countriesModel } from "./countries.schema.js";
import { relations } from "drizzle-orm";


export const listingStatusEnum = pgEnum("listing_status", [
    "active",
    "sold",
    "draft"
]);

export const bookConditionEnum = pgEnum("book_condition", [
    "new",
    "good",
    "fair",
    "poor"
]);

export const oldBookProductModel = pgTable("old_book_product", {
    id: uuid("id").defaultRandom().primaryKey(),

    sellerId: uuid("seller_id")
        .notNull()
        .references(() => userAccountModel.id),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categoriesModel.id),

    title: varchar("title", {
        length: 255,
    }).notNull(),

    description: text("description"),

    price: numeric("price", { precision: 10, scale: 2 }).notNull(),

    city: integer("city").notNull().references(() => citiesModel.id),

    country: integer("country").notNull().references(() => countriesModel.id),

    condition: bookConditionEnum("condition").notNull(),

    status: listingStatusEnum("status")
        .default("active")
        .notNull(),

    customFields: jsonb("custom_fields")
        .$type()
        .notNull(),

    ...timeStamps
});

export const oldBookProductImagesModel = pgTable("old_book_product_images", {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
        .notNull()
        .references(() => oldBookProductModel.id, {
            onUpdate: "cascade",
            onDelete: "cascade"
        }),

    public_id: varchar("public_id",
        { length: 255 })
        .notNull(),

    secure_url: text("secure_url")
        .notNull(),

    format: varchar("format",
        { length: 50 })
        .notNull(),

    resource_type: varchar("resource_type",
        { length: 50 })
        .notNull(),

    ...timeStamps
});

export const oldBookProductRelations = relations(oldBookProductModel, ({ many }) => ({
    images: many(oldBookProductImagesModel),
}));

export const oldBookProductImagesRelations = relations(oldBookProductImagesModel, ({ one }) => ({
    product: one(oldBookProductModel, {
        fields: [oldBookProductImagesModel.productId],
        references: [oldBookProductModel.id],
    }),
}));