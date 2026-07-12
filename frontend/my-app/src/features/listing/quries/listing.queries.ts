import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listingService } from "../service/listing.service";

export const useUserOldBookListing = (categoryId?: string) => {
    return useQuery({
        queryKey: ["user-old-book-listings", categoryId],
        queryFn: () => listingService.getUserOldBookListing(categoryId),
        staleTime: 0,        // Always revalidate — sockets keep this fresh
        gcTime: 5 * 60 * 1000,
    });
};

export const useDeleteUserOldBookProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.deleteUserOldBookProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
        }
    });
};

export const useMarkListingAsSold = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.markListingAsSold,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        }
    });
};

export const useEditListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ bookId, data }: { bookId: string; data: Record<string, any> }) =>
            listingService.editListing(bookId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
        }
    });
};

export const useAllActiveBookListings = (categoryId?: string) => {
    return useQuery({
        queryKey: ["plp-all-active-listings", categoryId],
        queryFn: () => listingService.getAllActiveBookListings(categoryId),
        staleTime: 0,
        gcTime: 5 * 60 * 1000,
    });
};

export const useAllPLPCategories = () => {
    return useQuery({
        queryKey: ["plp-categories"],
        queryFn: () => listingService.getAllPLPCategories(),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    });
};

