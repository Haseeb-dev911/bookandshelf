import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export const adminQueryKeys = {
  stats: ["admin", "stats"] as const,
  ebooks: ["admin", "ebooks"] as const,
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: adminQueryKeys.stats,
    queryFn: () => adminService.getDashboardStats(),
  });
};

export const useEbooks = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...adminQueryKeys.ebooks, page, limit],
    queryFn: () => adminService.getEbooks(page, limit),
  });
};

export const useCreateEbook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.createEbook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.ebooks });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
    },
  });
};

export const useUpdateEbook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId, data }: { bookId: string; data: any }) => adminService.updateEbook(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.ebooks });
    },
  });
};

export const useDeleteEbook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteEbook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.ebooks });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
    },
  });
};

export const useBulkDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.applyBulkDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.ebooks });
    },
  });
};
