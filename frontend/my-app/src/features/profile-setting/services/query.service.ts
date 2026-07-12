import { useQuery } from "@tanstack/react-query";
import { settingService } from "./setting.page.service";

export const useProfileDataQuery = () => {
    return useQuery<any>({
        queryKey: ["profileData"],
        queryFn: settingService.getUserprofileData,
        staleTime: 0,     // Always re-fetch when invalidated — critical for ban/restrict real-time
        retry: false,     // Don't retry 401/403 — they mean the user is banned/logged out
    });
};