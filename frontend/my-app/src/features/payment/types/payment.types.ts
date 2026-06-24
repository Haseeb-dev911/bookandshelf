export interface PaymentIntentResponse {
    success: boolean;
    message: string;
    errors: any;
    payload: {
        clientSecret: string;
        orderId: string;
    };
}

export interface OrderStatusResponse {
    success: boolean;
    message: string;
    errors: any;
    payload: {
        status: "pending" | "paid" | "failed" | "refunded";
    };
}
