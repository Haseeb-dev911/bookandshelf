import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { useOrderStatus } from "../queries/payment.queries";
import { useQueryClient } from "@tanstack/react-query";

export const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paymentIntentId = searchParams.get("payment_intent");
    const queryClient = useQueryClient();

    const { data } = useOrderStatus(paymentIntentId);
    
    const status = data?.payload?.status;

    // Save PI to local storage for global watching if user leaves
    useEffect(() => {
        if (paymentIntentId && status === "pending") {
            localStorage.setItem("pending_payment_intent", paymentIntentId);
        }
    }, [paymentIntentId, status]);

    useEffect(() => {
        if (status === "paid") {
            localStorage.removeItem("pending_payment_intent");
            // Invalidate cart to show it's empty
            queryClient.invalidateQueries({ queryKey: ["ebook-cart"] });
            
            const timer = setTimeout(() => {
                navigate(USER_ROUTES_PATH.home);
            }, 3000);
            return () => clearTimeout(timer);
        } else if (status === "failed") {
            localStorage.removeItem("pending_payment_intent");
            const timer = setTimeout(() => {
                navigate(USER_ROUTES_PATH.paymentFailed);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status, navigate, queryClient]);

    return (
        <div className="flex min-h-screen flex-col bg-[#fbf9f4]">
            <Header />

            <main className="grow flex items-center justify-center p-4">
                <div className="text-center">
                    {(!status || status === "pending") ? (
                        <>
                            <Loader2 className="mx-auto h-24 w-24 text-blue-500 mb-6 animate-spin" />
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
                                Processing Payment...
                            </h1>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                Please wait while we confirm your payment. Do not refresh this page.
                            </p>
                        </>
                    ) : status === "paid" ? (
                        <>
                            <CheckCircle2 className="mx-auto h-24 w-24 text-emerald-500 mb-6" />
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
                                Payment Successful!
                            </h1>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                Thank you for your purchase. Your e-books are now available in your library. Redirecting you shortly...
                            </p>
                            <Link
                                to={USER_ROUTES_PATH.home}
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-black text-white hover:bg-slate-800 transition"
                            >
                                Go to Dashboard
                            </Link>
                        </>
                    ) : status === "failed" ? (
                         <>
                            <XCircle className="mx-auto h-24 w-24 text-red-500 mb-6" />
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
                                Payment Failed
                            </h1>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                We couldn't confirm your payment. Redirecting...
                            </p>
                        </>
                    ) : (
                        <>
                            <Loader2 className="mx-auto h-24 w-24 text-slate-500 mb-6 animate-spin" />
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
                                Loading...
                            </h1>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};
