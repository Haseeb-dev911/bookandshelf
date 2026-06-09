import { AppError } from "../../../error/App.error.js";
import { wishlistRepository } from "../repository/wishlist.repository.js";

// ─── Wishlist Service ─────────────────────────────────────────────────────────

export const addToWishlistService = async (userId, bookId) => {
    try {
        const result = await wishlistRepository.addToWishlist(userId, bookId);

        if (result.alreadyExists) {
            return {
                success: true,
                message: "Book is already in your wishlist.",
                payload: { wishlisted: true }
            };
        }

        return {
            success: true,
            message: "Book added to wishlist.",
            payload: { wishlisted: true, id: result.id }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(
            "Failed to add book to wishlist.",
            500,
            [{ field: "root", message: "Failed to add book to wishlist." }]
        );
    }
};

export const removeFromWishlistService = async (userId, bookId) => {
    try {
        const result = await wishlistRepository.removeFromWishlist(userId, bookId);

        return {
            success: true,
            message: result.removed ? "Book removed from wishlist." : "Book was not in wishlist.",
            payload: { wishlisted: false }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(
            "Failed to remove book from wishlist.",
            500,
            [{ field: "root", message: "Failed to remove book from wishlist." }]
        );
    }
};

export const getUserWishlistService = async (userId) => {
    try {
        const items = await wishlistRepository.getUserWishlist(userId);

        // Shape the response: flatten the nested book object
        const wishlistItems = items.map((item) => ({
            wishlistId: item.id,
            addedAt: item.createdAt,
            ...item.book,
        }));

        return {
            success: true,
            message: "Wishlist fetched successfully.",
            payload: {
                items: wishlistItems,
                count: wishlistItems.length,
            }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(
            "Failed to fetch wishlist.",
            500,
            [{ field: "root", message: "Failed to fetch wishlist." }]
        );
    }
};

/** Returns a map of { [bookId]: boolean } for a batch of book IDs — used by PLP to mark hearts. */
export const getWishlistStatusService = async (userId, bookIds) => {
    try {
        const wishlistedIds = await wishlistRepository.getWishlistedBookIds(userId, bookIds);

        const statusMap = {};
        for (const id of bookIds) {
            statusMap[id] = wishlistedIds.has(id);
        }

        return {
            success: true,
            message: "Wishlist status fetched.",
            payload: { statusMap }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(
            "Failed to fetch wishlist status.",
            500,
            [{ field: "root", message: "Failed to fetch wishlist status." }]
        );
    }
};
