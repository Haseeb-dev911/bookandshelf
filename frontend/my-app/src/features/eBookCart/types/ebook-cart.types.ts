export type EBookFormat = "PDF" | "EPUB" | "MOBI";

export type EBookCartItem = {
  cartId: string;
  id: string; // The ebookId
  title: string;
  author: string;
  category: { id: string; name: string };
  format: EBookFormat;
  price: number;
  discountPercentage: number;
  quantity: number; // Always 1
  images: { secure_url: string }[];
  fileSize: string;
  seller: {
    id: string;
    name: string;
    setting: { profileImageUrl: string | null } | null;
  };
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  totalItems: number;
};

export interface CartPayload {
  items: EBookCartItem[];
  count: number;
  totals: CartTotals;
}

export interface CartResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: CartPayload;
}

export interface CartToggleResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: {
    inCart: boolean;
    id?: string;
  };
}

export interface CartMergeResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: {
    merged: number;
  };
}
