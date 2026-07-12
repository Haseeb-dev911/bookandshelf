import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentService } from "../service/payment.service";

export const useCreatePaymentIntent = () => {
    return useMutation({
        mutationFn: () => paymentService.createPaymentIntent()
    });
};

export const useOrderStatus = (paymentIntentId: string | null) => {
    return useQuery({
        queryKey: ["order-status", paymentIntentId],
        queryFn: () => paymentService.getOrderStatus(paymentIntentId!),
        enabled: !!paymentIntentId,
        refetchInterval: (query) => {
            const status = query.state.data?.payload?.status;
            // stop polling if paid or failed
            if (status === "paid" || status === "failed") return false;
            return 3000; // poll every 3 seconds
        },
    });
};
