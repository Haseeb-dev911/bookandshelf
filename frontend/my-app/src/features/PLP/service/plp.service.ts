import { api } from "@/services/apiClient";
import type { PLPListingsResponse, PLPCategoriesResponse, PLPFilters } from "../types/plp.types";

const PLP_ENDPOINTS = {
    listings:   "/plp/listings",
    categories: "/plp/categories",
} as const;

export interface FetchListingsParams extends Partial<PLPFilters> {
    page?: number;
    limit?: number;
}

export const plpService = {
    /**
     * Fetch paginated, filtered book listings.
     * Used by react-query's useInfiniteQuery for infinite scroll.
     */
    getListings: async (params: FetchListingsParams = {}): Promise<PLPListingsResponse> => {
        const {
            categoryId = "",
            condition  = "",
            type       = "all",
            search     = "",
            sortBy     = "newest",
            page       = 1,
            limit      = 12,
        } = params;

        const queryParams = new URLSearchParams();
        if (categoryId) queryParams.set("categoryId", categoryId);
        if (condition)  queryParams.set("condition",  condition);
        if (type !== "all") queryParams.set("type", type);
        if (search)     queryParams.set("search",     search);
        if (sortBy)     queryParams.set("sortBy",     sortBy);
        queryParams.set("page",  String(page));
        queryParams.set("limit", String(limit));

        const url = `${PLP_ENDPOINTS.listings}?${queryParams.toString()}`;
        const response = await api.get<PLPListingsResponse>(url);
        return response.data;
    },

    /**
     * Fetch all categories — used for the category filter dropdown.
     */
    getCategories: async (): Promise<PLPCategoriesResponse> => {
        const response = await api.get<PLPCategoriesResponse>(PLP_ENDPOINTS.categories);
        return response.data;
    },
};
