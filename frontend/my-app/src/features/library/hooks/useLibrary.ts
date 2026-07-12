import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/apiClient";
import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";

export interface LibraryItem {
    ebookId: string;
    title: string;
    author: string;
    coverImage: string | null;
    purchaseDate: string;
}

const fetchLibrary = async (): Promise<LibraryItem[]> => {
    const res = await api.get<{ data: LibraryItem[] }>("/library");
    return res.data.data;
};

export function useLibrary() {
    const { data: profileData, isSuccess } = useProfileDataQuery();
    const isLoggedIn = isSuccess && !!profileData?.payload;

    return useQuery({
        queryKey: ["library"],
        queryFn: fetchLibrary,
        enabled: isLoggedIn,
        staleTime: 1000 * 60 * 5,
    });
}
