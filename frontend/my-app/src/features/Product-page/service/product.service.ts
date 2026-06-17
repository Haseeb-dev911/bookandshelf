import { api } from "@/services/apiClient";
import type { BookListing } from "../../PLP/types/plp.types";

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: BookListing;
}

export const productService = {
  getProductDetails: async (bookId: string): Promise<ProductDetailsResponse> => {
    const res = await api.get<ProductDetailsResponse>(`/product/${bookId}`);
    return res.data;
  },
};
