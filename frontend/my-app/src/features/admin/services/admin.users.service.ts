import { api } from "@/services/apiClient";

export interface UserItem {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "support";
    status: "active" | "banned" | "restricted";
    createdAt: string;
    avatar?: string;
}

export interface UserDetails extends UserItem {
    isEmailVerified: boolean;
    bio?: string;
    totalOrders: number;
    uploadedOldBooks: number;
    wishlistCount: number;
    activeListings: Array<{
        id: string;
        title: string;
        price: string;
        status: string;
        createdAt: string;
    }>;
}

export interface UsersResponse {
    success: boolean;
    message: string;
    payload: {
        users: UserItem[];
        totalCount: number;
    };
}

export interface UserDetailsResponse {
    success: boolean;
    message: string;
    payload: UserDetails;
}

const endpoints = {
    users: "/admin/users",
};

export const adminUsersService = {
    getUsers: async (params: { page?: number; limit?: number; search?: string; role?: string; status?: string; sortBy?: string }): Promise<UsersResponse> => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.role && params.role !== "all") queryParams.append("role", params.role);
        if (params.status && params.status !== "all") queryParams.append("status", params.status);
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);

        const response = await api.get(`${endpoints.users}?${queryParams.toString()}`);
        return response.data;
    },

    getUserDetails: async (userId: string): Promise<UserDetailsResponse> => {
        const response = await api.get(`${endpoints.users}/${userId}`);
        return response.data;
    },

    blockUser: async (userId: string, reason?: string) => {
        const response = await api.patch(`${endpoints.users}/${userId}/block`, { reason });
        return response.data;
    },

    unblockUser: async (userId: string) => {
        const response = await api.patch(`${endpoints.users}/${userId}/unblock`);
        return response.data;
    },

    restrictUser: async (userId: string) => {
        const response = await api.patch(`${endpoints.users}/${userId}/restrict`);
        return response.data;
    },

    unrestrictUser: async (userId: string) => {
        const response = await api.patch(`${endpoints.users}/${userId}/unrestrict`);
        return response.data;
    },

    changeRole: async (userId: string, role: "user" | "admin" | "support") => {
        const response = await api.patch(`${endpoints.users}/${userId}/change-role`, { role });
        return response.data;
    }
};
