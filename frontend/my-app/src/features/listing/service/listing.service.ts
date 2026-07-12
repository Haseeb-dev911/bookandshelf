import { api } from "@/services/apiClient";

const endpoints = {
    getUserListings: "/old-book/listing",
    deleteUserListing: (bookId: string) => `/old-book/listing/${bookId}`,
    editUserListing: (bookId: string) => `/old-book/listing/${bookId}`,
    markAsSold: (bookId: string) => `/old-book/listing/${bookId}/sold`,
    getAllActiveListings: "/plp/listings",
    getAllCategories: "/plp/categories",
};

export const listingService = {
    getUserOldBookListing: async (categoryId?: string) => {
        const url = categoryId
            ? `${endpoints.getUserListings}?categoryId=${categoryId}`
            : endpoints.getUserListings;
        const response = await api.get(url);
        return response.data;
    },

    deleteUserOldBookProduct: async (bookId: string) => {
        const response = await api.delete(endpoints.deleteUserListing(bookId));
        return response.data;
    },

    markListingAsSold: async (bookId: string) => {
        const response = await api.patch(endpoints.markAsSold(bookId));
        return response.data;
    },

    editListing: async (bookId: string, data: Record<string, any>) => {
        const response = await api.patch(endpoints.editUserListing(bookId), data);
        return response.data;
    },

    getAllActiveBookListings: async (categoryId?: string) => {
        const url = categoryId
            ? `${endpoints.getAllActiveListings}?categoryId=${categoryId}`
            : endpoints.getAllActiveListings;
        const response = await api.get(url);
        return response.data;
    },

    getAllPLPCategories: async () => {
        const response = await api.get(endpoints.getAllCategories);
        return response.data;
    }
};


