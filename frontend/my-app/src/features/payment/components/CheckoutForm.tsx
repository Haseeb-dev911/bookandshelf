import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Ensure this matches your route setup exactly, including the protocol and domain.
                // Using window.location.origin to build the absolute URL.
                return_url: `${window.location.origin}${USER_ROUTES_PATH.paymentSuccess}`,
            },
        });

        if (error) {
            toast.error(error.message || "An unexpected error occurred.");
            // Also redirect or handle failure if it's an immediate fail (some failures redirect)
            if (error.type === "card_error" || error.type === "validation_error") {
                setIsProcessing(false);
            } else {
                window.location.href = USER_ROUTES_PATH.paymentFailed;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <PaymentElement />
            </div>

            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4a1a14] px-5 py-4 text-sm font-black text-white shadow-lg shadow-[#4a1a14]/20 transition hover:-translate-y-0.5 hover:bg-[#3a140f] disabled:opacity-70 disabled:hover:translate-y-0"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Pay Now
                        <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </form>
    );
};
