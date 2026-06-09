// ─── Wishlist Feature Types ───────────────────────────────────────────────────

import type { BookListing } from "../../PLP/types/plp.types";

// ── API Response shapes ───────────────────────────────────────────────────────

export interface WishlistItem extends BookListing {
    wishlistId: string;
    addedAt: string;
}

export interface WishlistPayload {
    items: WishlistItem[];
    count: number;
}

export interface WishlistResponse {
    success: boolean;
    message: string;
    errors: null | unknown[];
    payload: WishlistPayload;
}

export interface WishlistTogglePayload {
    wishlisted: boolean;
    id?: string | null;
}

export interface WishlistToggleResponse {
    success: boolean;
    message: string;
    errors: null | unknown[];
    payload: WishlistTogglePayload;
}

export interface WishlistStatusPayload {
    statusMap: Record<string, boolean>;
}

export interface WishlistStatusResponse {
    success: boolean;
    message: string;
    errors: null | unknown[];
    payload: WishlistStatusPayload;
}
