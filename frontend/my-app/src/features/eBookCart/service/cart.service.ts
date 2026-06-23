import { api } from "@/services/apiClient";
import type { CartResponse, CartToggleResponse, CartMergeResponse } from "../types/ebook-cart.types";

const CART_ENDPOINTS = {
    base: "/cart",
    item: (ebookId: string) => `/cart/${ebookId}`,
    merge: "/cart/merge",
} as const;

export const cartService = {
    getCart: async (): Promise<CartResponse> => {
        const res = await api.get<CartResponse>(CART_ENDPOINTS.base);
        return res.data;
    },

    addToCart: async (ebookId: string): Promise<CartToggleResponse> => {
        const res = await api.post<CartToggleResponse>(CART_ENDPOINTS.item(ebookId));
        return res.data;
    },

    removeFromCart: async (ebookId: string): Promise<CartToggleResponse> => {
        const res = await api.delete<CartToggleResponse>(CART_ENDPOINTS.item(ebookId));
        return res.data;
    },

    mergeGuestCart: async (ebookIds: string[]): Promise<CartMergeResponse> => {
        const res = await api.post<CartMergeResponse>(CART_ENDPOINTS.merge, { ebookIds });
        return res.data;
    },
};
