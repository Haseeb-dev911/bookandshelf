import { and, eq, inArray, or } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { wishlistModel } from "../../../db/models/wishlist.schema.js";
import { oldBookProductModel } from "../../../db/models/old.book.product.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";
import { AppError } from "../../../error/App.error.js";

// ─── Wishlist Repository ──────────────────────────────────────────────────────

export const wishlistRepository = {

    /** Add a book to the user's wishlist. Ignores duplicate (idempotent). */
    addToWishlist: async (userId, bookId) => {
        // Prevent duplicate wishlists manually since we removed the unique constraint
        const existing = await wishlistRepository.isWishlisted(userId, bookId);
        if (existing) {
            return { alreadyExists: true, id: null };
        }

        // Check if it's an old book
        const [oldBook] = await db
            .select({ id: oldBookProductModel.id })
            .from(oldBookProductModel)
            .where(
                and(
                    eq(oldBookProductModel.id, bookId),
                    eq(oldBookProductModel.status, "active")
                )
            )
            .limit(1);

        // Check if it's an ebook
        const [eBook] = await db
            .select({ id: eBookProductModel.id })
            .from(eBookProductModel)
            .where(
                and(
                    eq(eBookProductModel.id, bookId),
                    eq(eBookProductModel.status, "active")
                )
            )
            .limit(1);

        if (!oldBook && !eBook) {
            throw new AppError("Book not found", 404, [
                { field: "bookId", message: "Book listing not found or unavailable." }
            ]);
        }

        const isEbook = !!eBook;
        
        // Insert
        const [inserted] = await db
            .insert(wishlistModel)
            .values({ 
                userId, 
                bookId: isEbook ? null : bookId,
                ebookId: isEbook ? bookId : null
            })
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
                    or(
                        eq(wishlistModel.bookId, bookId),
                        eq(wishlistModel.ebookId, bookId)
                    )
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
                        // We safely load locationCity if it exists, Drizzle handles it gracefully via LEFT JOIN
                        locationCity: true
                    }
                },
                ebook: {
                    with: {
                        images: true,
                        seller: {
                            with: {
                                setting: true
                            }
                        }
                    }
                }
            },
            orderBy: (w, { desc }) => [desc(w.createdAt)],
        });
        
        // Filter out any items where BOTH book and ebook are somehow missing/deleted
        return items.filter(item => item.book || item.ebook);
    },

    /** Return a Set of book IDs that the user has wishlisted — fast status check. */
    getWishlistedBookIds: async (userId, bookIds) => {
        if (!bookIds || bookIds.length === 0) return new Set();

        const rows = await db
            .select({ bookId: wishlistModel.bookId, ebookId: wishlistModel.ebookId })
            .from(wishlistModel)
            .where(
                and(
                    eq(wishlistModel.userId, userId),
                    or(
                        inArray(wishlistModel.bookId, bookIds),
                        inArray(wishlistModel.ebookId, bookIds)
                    )
                )
            );

        return new Set(rows.map((r) => r.ebookId || r.bookId));
    },

    /** Check whether a single book is in the user's wishlist. */
    isWishlisted: async (userId, bookId) => {
        const [row] = await db
            .select({ id: wishlistModel.id })
            .from(wishlistModel)
            .where(
                and(
                    eq(wishlistModel.userId, userId),
                    or(
                        eq(wishlistModel.bookId, bookId),
                        eq(wishlistModel.ebookId, bookId)
                    )
                )
            )
            .limit(1);

        return !!row;
    },
};
