import { and, eq, inArray } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { wishlistModel } from "../../../db/models/wishlist.schema.js";
import { oldBookProductModel, oldBookProductImagesModel } from "../../../db/models/old.book.product.schema.js";
import { AppError } from "../../../error/App.error.js";

// ─── Wishlist Repository ──────────────────────────────────────────────────────

export const wishlistRepository = {

    /** Add a book to the user's wishlist. Ignores duplicate (idempotent). */
    addToWishlist: async (userId, bookId) => {
        // Verify the book exists and is active
        const [book] = await db
            .select({ id: oldBookProductModel.id })
            .from(oldBookProductModel)
            .where(
                and(
                    eq(oldBookProductModel.id, bookId),
                    eq(oldBookProductModel.status, "active")
                )
            )
            .limit(1);

        if (!book) {
            throw new AppError("Book not found", 404, [
                { field: "bookId", message: "Book listing not found or unavailable." }
            ]);
        }

        // Insert — ignore conflict on unique constraint
        const [inserted] = await db
            .insert(wishlistModel)
            .values({ userId, bookId })
            .onConflictDoNothing()
            .returning({ id: wishlistModel.id });

        return { alreadyExists: !inserted, id: inserted?.id ?? null };
    },

    /** Remove a book from the user's wishlist. */
    removeFromWishlist: async (userId, bookId) => {
        const [deleted] = await db
            .delete(wishlistModel)
            .where(
                and(
                    eq(wishlistModel.userId, userId),
                    eq(wishlistModel.bookId, bookId)
                )
            )
            .returning({ id: wishlistModel.id });

        return { removed: !!deleted };
    },

    /** Get all wishlist entries for a user with full book + image details. */
    getUserWishlist: async (userId) => {
        const items = await db.query.wishlistModel.findMany({
            where: (w, { eq }) => eq(w.userId, userId),
            with: {
                book: {
                    with: {
                        images: true,
                        seller: {
                            with: {
                                setting: true
                            }
                        },
                        locationCity: true
                    }
                }
            },
            orderBy: (w, { desc }) => [desc(w.createdAt)],
        });
        return items;
    },

    /** Return a Set of book IDs that the user has wishlisted — fast status check. */
    getWishlistedBookIds: async (userId, bookIds) => {
        if (!bookIds || bookIds.length === 0) return new Set();

        const rows = await db
            .select({ bookId: wishlistModel.bookId })
            .from(wishlistModel)
            .where(
                and(
                    eq(wishlistModel.userId, userId),
                    inArray(wishlistModel.bookId, bookIds)
                )
            );

        return new Set(rows.map((r) => r.bookId));
    },

    /** Check whether a single book is in the user's wishlist. */
    isWishlisted: async (userId, bookId) => {
        const [row] = await db
            .select({ id: wishlistModel.id })
            .from(wishlistModel)
            .where(
                and(
                    eq(wishlistModel.userId, userId),
                    eq(wishlistModel.bookId, bookId)
                )
            )
            .limit(1);

        return !!row;
    },
};
