import { api } from "@/services/apiClient";
import { PaymentIntentResponse, OrderStatusResponse } from "../types/payment.types";

export const paymentService = {
    createPaymentIntent: async (): Promise<PaymentIntentResponse> => {
        const response = await api.post<PaymentIntentResponse>("/payment/create-intent");
        return response.data;
    },
    getOrderStatus: async (paymentIntentId: string): Promise<OrderStatusResponse> => {
        const response = await api.get<OrderStatusResponse>(`/payment/order-status/${paymentIntentId}`);
        return response.data;
    }
};
