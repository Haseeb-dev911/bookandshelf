import { api } from "@/services/apiClient";

const endpoints = {
  dashboard: "/admin/finance/dashboard",
  balance: "/admin/finance/balance",
  transactions: "/admin/finance/transactions",
  payouts: "/admin/finance/payouts",
  payout: "/admin/finance/payout",
  banks: "/admin/finance/banks",
};

export const financeService = {
  getDashboardStats: async () => {
    const response = await api.get(endpoints.dashboard);
    return response.data;
  },

  getBalance: async () => {
    const response = await api.get(endpoints.balance);
    return response.data;
  },

  getTransactions: async (limit = 10, startingAfter?: string) => {
    let url = `${endpoints.transactions}?limit=${limit}`;
    if (startingAfter) url += `&starting_after=${startingAfter}`;
    const response = await api.get(url);
    return response.data;
  },

  getPayouts: async (limit = 10, startingAfter?: string) => {
    let url = `${endpoints.payouts}?limit=${limit}`;
    if (startingAfter) url += `&starting_after=${startingAfter}`;
    const response = await api.get(url);
    return response.data;
  },

  createPayout: async (amount: number) => {
    const response = await api.post(endpoints.payout, { amount });
    return response.data;
  },

  getBanks: async () => {
    const response = await api.get(endpoints.banks);
    return response.data;
  },

  attachBank: async (token: string) => {
    const response = await api.post(endpoints.banks, { token });
    return response.data;
  },

  removeBank: async (bankId: string) => {
    const response = await api.delete(`${endpoints.banks}/${bankId}`);
    return response.data;
  },

  setDefaultBank: async (bankId: string) => {
    const response = await api.patch(`${endpoints.banks}/${bankId}/default`);
    return response.data;
  }
};
