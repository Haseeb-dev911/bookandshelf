// ─── Seller Profile Types ─────────────────────────────────────────────────────

import type { BookListing } from "../../PLP/types/plp.types";

export interface SellerDetails {
  id: string;
  name: string;
  email: string;
  description: string | null;
  cityName: string | null;
  countryName: string | null;
  profileImageUrl: string | null;
}

export interface SellerProfilePayload {
  seller: SellerDetails;
  listings: BookListing[];
}

export interface SellerProfileResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: SellerProfilePayload;
}
