import { api } from "@/services/apiClient";
import type {
    WishlistResponse,
    WishlistToggleResponse,
    WishlistStatusResponse,
} from "../types/wishlist.types";

// ─── Wishlist Service ─────────────────────────────────────────────────────────

const WISHLIST_ENDPOINTS = {
    base:        "/wishlist",
    item:        (bookId: string) => `/wishlist/${bookId}`,
    statusBatch: "/wishlist/status/batch",
} as const;

export const wishlistService = {
    /**
     * Fetch the full wishlist for the logged-in user.
     */
    getWishlist: async (): Promise<WishlistResponse> => {
        const res = await api.get<WishlistResponse>(WISHLIST_ENDPOINTS.base);
        return res.data;
    },

    /**
     * Add a book to the wishlist. Returns { wishlisted: true }.
     */
    addToWishlist: async (bookId: string): Promise<WishlistToggleResponse> => {
        const res = await api.post<WishlistToggleResponse>(
            WISHLIST_ENDPOINTS.item(bookId)
        );
        return res.data;
    },

    /**
     * Remove a book from the wishlist. Returns { wishlisted: false }.
     */
    removeFromWishlist: async (bookId: string): Promise<WishlistToggleResponse> => {
        const res = await api.delete<WishlistToggleResponse>(
            WISHLIST_ENDPOINTS.item(bookId)
        );
        return res.data;
    },

    /**
     * Batch check which bookIds from a list are wishlisted by the current user.
     * Returns a statusMap: { [bookId]: boolean }
     */
    getWishlistStatus: async (
        bookIds: string[]
    ): Promise<WishlistStatusResponse> => {
        const res = await api.post<WishlistStatusResponse>(
            WISHLIST_ENDPOINTS.statusBatch,
            { bookIds }
        );
        return res.data;
    },
};
