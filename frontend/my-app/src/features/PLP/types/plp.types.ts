// ─── Book / Listing Types ─────────────────────────────────────────────────────

export type BookCondition = "new" | "good" | "fair" | "poor";
export type ListingStatus = "active" | "sold" | "draft";
export type SortOption = "newest" | "price_asc" | "price_desc";

export interface BookImage {
  id: string;
  productId: string;
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
}

export interface SellerSetting {
  profileImageUrl: string | null;
}

export interface SellerInfo {
  id: string;
  name: string;
  email: string;
  setting: SellerSetting | null;
}

export interface LocationCity {
  id: number;
  name: string;
}

export interface BookListing {
  id: string;
  sellerId: string;
  categoryId: string;
  title: string;
  description: string | null;
  price: number;
  city: number;
  country: number;
  condition: BookCondition;
  status: ListingStatus;
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  images: BookImage[];
  seller: SellerInfo | null;
  locationCity: LocationCity | null;
}

export interface PLPCategory {
  id: string;
  name: string;
}

// ─── API Response Shape ───────────────────────────────────────────────────────

export interface PLPListingsPayload {
  listings: BookListing[];
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface PLPListingsResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: PLPListingsPayload;
}

export interface PLPCategoriesResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: PLPCategory[];
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface PLPFilters {
  categoryId: string;
  condition: string;       // '' | BookCondition
  search: string;
  sortBy: SortOption;
}
