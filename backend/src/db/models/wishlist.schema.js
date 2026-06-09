import { pgTable, uuid, unique } from "drizzle-orm/pg-core";
import { userAccountModel } from "./user.account.schema.js";
import { oldBookProductModel } from "./old.book.product.schema.js";
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
        .notNull()
        .references(() => oldBookProductModel.id, { onDelete: "cascade" }),

    ...timeStamps,
}, (table) => ({
    // A user cannot wishlist the same book twice
    userBookUnique: unique("wishlist_user_book_unique").on(table.userId, table.bookId),
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
}));
