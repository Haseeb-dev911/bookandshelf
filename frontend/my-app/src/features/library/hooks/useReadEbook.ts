import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/apiClient";

const fetchEbookReadUrl = async (ebookId: string): Promise<string> => {
    const res = await api.get(`/library/${ebookId}/read`, {
        responseType: 'blob'
    });
    return URL.createObjectURL(res.data);
};

export function useReadEbook(ebookId: string | undefined) {
    return useQuery({
        queryKey: ["ebook-read-url", ebookId],
        queryFn: () => fetchEbookReadUrl(ebookId!),
        enabled: !!ebookId,
        staleTime: 0, // ensure we always fetch a fresh signed url
        refetchOnMount: "always",
    });
}
