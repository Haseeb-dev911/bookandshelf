import { QueryClient } from "@tanstack/react-query";
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";

const localStoragePersister = experimental_createQueryPersister({
    storage: window.localStorage,
    prefix: "bookshelf-cache",
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
            refetchOnWindowFocus: false,
            retry: 1,
            persister: localStoragePersister.persisterFn,
        },
    },
});