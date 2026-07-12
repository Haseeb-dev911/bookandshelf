import { Link } from "react-router-dom";
import { XCircle, RefreshCcw } from "lucide-react";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";

export const PaymentFailedPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#fbf9f4]">
            <Header />

            <main className="grow flex items-center justify-center p-4">
                <div className="text-center">
                    <XCircle className="mx-auto h-24 w-24 text-red-500 mb-6" />
                    <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        We couldn't process your payment. Please try again or use a different payment method.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to={USER_ROUTES_PATH.cart}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4a1a14] px-6 py-3 text-sm font-black text-white hover:bg-[#3a140f] transition shadow-lg shadow-[#4a1a14]/20"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Try Again
                        </Link>
                        <Link
                            to={USER_ROUTES_PATH.home}
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-900 hover:bg-slate-300 transition"
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
