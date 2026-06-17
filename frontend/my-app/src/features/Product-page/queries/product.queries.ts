import { useQuery } from "@tanstack/react-query";
import { productService } from "../service/product.service";

export const useProductDetails = (bookId: string) => {
    return useQuery({
        queryKey: ["product-details", bookId],
        queryFn: () => productService.getProductDetails(bookId),
        enabled: !!bookId,
        staleTime: 5 * 60 * 1000,
    });
};
