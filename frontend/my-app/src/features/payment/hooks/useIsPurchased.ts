import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/apiClient";
import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";

const checkIsPurchased = async (ebookId: string): Promise<boolean> => {
    const res = await api.get<{ payload: { isPurchased: boolean } }>(
        `/payment/is-purchased/${ebookId}`
    );
    return res.data.payload.isPurchased;
};

/**
 * Returns whether the currently logged-in user has already purchased this ebook.
 * Only runs if the user is authenticated.
 */
export function useIsPurchased(ebookId: string | undefined) {
    const { data: profileData, isSuccess } = useProfileDataQuery();
    const isLoggedIn = isSuccess && !!profileData?.payload;

    const { data: isPurchased = false, isLoading } = useQuery({
        queryKey: ["is-purchased", ebookId],
        queryFn: () => checkIsPurchased(ebookId!),
        enabled: !!ebookId && isLoggedIn,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

    return { isPurchased, isLoading };
}
