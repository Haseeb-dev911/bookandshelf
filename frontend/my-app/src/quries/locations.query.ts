import { useQuery } from "@tanstack/react-query";

import { locationService } from "@/services/locationService";
import { cityDatatype, countryDatatype } from "@/features/auth/types/locations.types";

export const useCountries = () => {
    return useQuery<countryDatatype[]>({
        queryKey: ["countries"],
        queryFn: locationService.getCountries,
    });
};

export const useCities = (countryId: string) => {
    return useQuery<cityDatatype[]>({
        queryKey: ["cities", countryId],
        queryFn: () => locationService.getCities(countryId),
        enabled: !!countryId
    });
};  