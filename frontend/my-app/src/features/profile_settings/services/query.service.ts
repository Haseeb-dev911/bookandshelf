import { useQuery } from "@tanstack/react-query";
import { settingService } from "./setting.page.service";

export const useProfileDataQuery = () => {
    return useQuery<any>({
        queryKey: ["profileData"],
        queryFn: settingService.getUserprofileData,
    });
};