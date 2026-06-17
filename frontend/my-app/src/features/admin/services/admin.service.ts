import { api } from "@/services/apiClient";
import type { AdminDashboardResponse, AdminEbooksResponse, EbookPayload } from "../types/admin.types";

const endpoints = {
  getDashboardStats: "/admin/stats",
  ebooks: "/admin/ebooks",
  bulkDiscount: "/admin/ebooks/discount/bulk",
};

export const adminService = {
  getDashboardStats: async (): Promise<AdminDashboardResponse> => {
    const response = await api.get(endpoints.getDashboardStats);
    return response.data;
  },
  
  getEbooks: async (page = 1, limit = 10): Promise<AdminEbooksResponse> => {
    const response = await api.get(`${endpoints.ebooks}?page=${page}&limit=${limit}`);
    return response.data;
  },

  createEbook: async (data: EbookPayload) => {
    const response = await api.post(endpoints.ebooks, data);
    return response.data;
  },

  updateEbook: async (bookId: string, data: Partial<EbookPayload>) => {
    const response = await api.patch(`${endpoints.ebooks}/${bookId}`, data);
    return response.data;
  },

  deleteEbook: async (bookId: string) => {
    const response = await api.delete(`${endpoints.ebooks}/${bookId}`);
    return response.data;
  },

  applyBulkDiscount: async (data: { discountPercentage: number, categoryId?: string }) => {
    const response = await api.patch(endpoints.bulkDiscount, data);
    return response.data;
  }
};
