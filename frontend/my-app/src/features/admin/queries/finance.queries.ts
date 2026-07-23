import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeService } from "../services/finance.service";

export const financeKeys = {
  all: ["finance"] as const,
  dashboard: () => [...financeKeys.all, "dashboard"] as const,
  balance: () => [...financeKeys.all, "balance"] as const,
  transactions: (limit?: number, startingAfter?: string) => [...financeKeys.all, "transactions", { limit, startingAfter }] as const,
  payouts: (limit?: number, startingAfter?: string) => [...financeKeys.all, "payouts", { limit, startingAfter }] as const,
  banks: () => [...financeKeys.all, "banks"] as const,
};

export const useFinanceDashboard = () => {
  return useQuery({
    queryKey: financeKeys.dashboard(),
    queryFn: financeService.getDashboardStats,
  });
};

export const useBalance = () => {
  return useQuery({
    queryKey: financeKeys.balance(),
    queryFn: financeService.getBalance,
  });
};

export const useTransactions = (limit = 10, startingAfter?: string) => {
  return useQuery({
    queryKey: financeKeys.transactions(limit, startingAfter),
    queryFn: () => financeService.getTransactions(limit, startingAfter),
  });
};

export const usePayouts = (limit = 10, startingAfter?: string) => {
  return useQuery({
    queryKey: financeKeys.payouts(limit, startingAfter),
    queryFn: () => financeService.getPayouts(limit, startingAfter),
  });
};

export const useBanks = () => {
  return useQuery({
    queryKey: financeKeys.banks(),
    queryFn: financeService.getBanks,
  });
};

export const useCreatePayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: financeService.createPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.all });
    },
  });
};

export const useAttachBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: financeService.attachBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.banks() });
    },
  });
};

export const useRemoveBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: financeService.removeBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.banks() });
    },
  });
};

export const useSetDefaultBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: financeService.setDefaultBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.banks() });
    },
  });
};
