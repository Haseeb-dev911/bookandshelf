import { useQuery } from "@tanstack/react-query";
import { sellerProfileService } from "../service/seller-profile.service";

// ─── Seller Profile Query ─────────────────────────────────────────────────────

export const useSellerProfile = (sellerId: string) => {
  return useQuery({
    queryKey: ["seller-profile", sellerId],
    queryFn: () => sellerProfileService.getSellerProfile(sellerId),
    enabled: !!sellerId,
  });
};
