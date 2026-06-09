import { api } from "@/services/apiClient";
import type { SellerProfileResponse } from "../types/seller-profile.types";

// ─── Seller Profile Service ───────────────────────────────────────────────────

const SELLER_ENDPOINTS = {
  profile: (sellerId: string) => `/seller-profile/${sellerId}`,
} as const;

export const sellerProfileService = {
  /**
   * Fetch seller details + all their active listings by seller ID.
   */
  getSellerProfile: async (sellerId: string): Promise<SellerProfileResponse> => {
    const res = await api.get<SellerProfileResponse>(
      SELLER_ENDPOINTS.profile(sellerId)
    );
    return res.data;
  },
};
