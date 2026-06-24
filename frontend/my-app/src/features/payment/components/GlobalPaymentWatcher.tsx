import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderStatus } from "../queries/payment.queries";
import toast from "react-hot-toast";

export const GlobalPaymentWatcher = () => {
    // Only run this watcher if the current path is not /payment/success
    // to avoid duplicating toasts on the success page itself.
    const isSuccessPage = window.location.pathname.includes("/payment/success");
    
    // We keep a local state of the payment intent ID from local storage
    // but we only want to read it once per mount or if it changes
    const paymentIntentId = localStorage.getItem("pending_payment_intent");
    const queryClient = useQueryClient();

    const { data } = useOrderStatus(isSuccessPage ? null : paymentIntentId);

    useEffect(() => {
        if (!paymentIntentId || isSuccessPage) return;
        
        const status = data?.payload?.status;
        if (status === "paid") {
            toast.success("Payment completed successfully!");
            localStorage.removeItem("pending_payment_intent");
            queryClient.invalidateQueries({ queryKey: ["ebook-cart"] });
        } else if (status === "failed") {
            toast.error("Payment failed. Please try again.");
            localStorage.removeItem("pending_payment_intent");
        }
    }, [data, paymentIntentId, queryClient, isSuccessPage]);

    return null;
};
