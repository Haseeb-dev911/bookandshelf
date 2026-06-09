import { api } from './apiClient';

const endpoints = {
  locations: {
    countries: '/seed/getCountry',
    cities: (countryId: string | number) => `/seed/getCity/${countryId}`,
  }
};

export const locationService = {
  getCountries: async () => {    
    const response = await api.get(endpoints.locations.countries);

    const data = response.data;

    return data?.payload ?? [];
  },

  getCities: async (countryId: string | number) => {
    const response = await api.get(endpoints.locations.cities(countryId));

    const data = response.data;
    return data?.payload ?? [];
  }
};