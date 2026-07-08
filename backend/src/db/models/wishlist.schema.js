import { pgTable, uuid, unique } from "drizzle-orm/pg-core";
import { userAccountModel } from "./user.account.schema.js";
import { oldBookProductModel } from "./old.book.product.schema.js";
import { eBookProductModel } from "./e.book.product.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";
import { relations } from "drizzle-orm";

// ─── Wishlist Table ───────────────────────────────────────────────────────────
// Each row = one user bookmarking one book listing.
// The composite unique constraint prevents duplicate hearts.

export const wishlistModel = pgTable("wishlist", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    bookId: uuid("book_id")
        .references(() => oldBookProductModel.id, { onDelete: "cascade" }),

    ebookId: uuid("ebook_id")
        .references(() => eBookProductModel.id, { onDelete: "cascade" }),

    ...timeStamps,
}, (table) => ({
    // A user cannot wishlist the same physical book twice (handled at application level now for mixed types)
    // userBookUnique: unique("wishlist_user_book_unique").on(table.userId, table.bookId),
    // userEbookUnique: unique("wishlist_user_ebook_unique").on(table.userId, table.ebookId),
}));

// ─── Relations ────────────────────────────────────────────────────────────────

export const wishlistRelations = relations(wishlistModel, ({ one }) => ({
    user: one(userAccountModel, {
        fields: [wishlistModel.userId],
        references: [userAccountModel.id],
    }),
    book: one(oldBookProductModel, {
        fields: [wishlistModel.bookId],
        references: [oldBookProductModel.id],
    }),
    ebook: one(eBookProductModel, {
        fields: [wishlistModel.ebookId],
        references: [eBookProductModel.id],
    }),
}));
