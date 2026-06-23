import {
    uuid, pgTable, pgEnum, varchar, text,
    integer, numeric, boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userAccountModel } from "./user.account.schema.js";
import { categoriesModel } from "./category.book.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";

// ─── E-Book Format Enum ───────────────────────────────────────────────────────

export const eBookFormatEnum = pgEnum("ebook_format", [
    "PDF",
    "EPUB",
    "MOBI",
]);

// ─── E-Book Listing Status ────────────────────────────────────────────────────

export const eBookStatusEnum = pgEnum("ebook_status", [
    "active",
    "sold",
    "draft",
]);

// ─── E-Book Product Table ─────────────────────────────────────────────────────

export const eBookProductModel = pgTable("e_book_product", {
    id: uuid("id").defaultRandom().primaryKey(),

    sellerId: uuid("seller_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categoriesModel.id),

    title: varchar("title", { length: 255 }).notNull(),

    author: varchar("author", { length: 255 }).notNull().default("Unknown"),

    description: text("description"),

    price: numeric("price", { precision: 10, scale: 2 }).notNull(),

    discountPercentage: integer("discount_percentage").default(0).notNull(),

    format: eBookFormatEnum("format").default("PDF").notNull(),

    fileSize: varchar("file_size", { length: 50 }),

    pdfUrl: text("pdf_url"),

    pdfPublicId: varchar("pdf_public_id", { length: 255 }),

    status: eBookStatusEnum("status").default("active").notNull(),

    ...timeStamps,
});

// ─── E-Book Cover Images Table ────────────────────────────────────────────────

export const eBookProductImagesModel = pgTable("e_book_product_images", {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
        .notNull()
        .references(() => eBookProductModel.id, {
            onUpdate: "cascade",
            onDelete: "cascade",
        }),

    public_id: varchar("public_id", { length: 255 }).notNull(),

    secure_url: text("secure_url").notNull(),

    format: varchar("format", { length: 50 }).notNull(),

    resource_type: varchar("resource_type", { length: 50 }).notNull(),

    ...timeStamps,
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const eBookProductRelations = relations(eBookProductModel, ({ many, one }) => ({
    images: many(eBookProductImagesModel),
    seller: one(userAccountModel, {
        fields: [eBookProductModel.sellerId],
        references: [userAccountModel.id],
    }),
    category: one(categoriesModel, {
        fields: [eBookProductModel.categoryId],
        references: [categoriesModel.id],
    }),
}));

export const eBookProductImagesRelations = relations(eBookProductImagesModel, ({ one }) => ({
    product: one(eBookProductModel, {
        fields: [eBookProductImagesModel.productId],
        references: [eBookProductModel.id],
    }),
}));
