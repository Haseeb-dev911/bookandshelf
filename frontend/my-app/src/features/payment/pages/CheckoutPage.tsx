import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";
import { useCreatePaymentIntent } from "../queries/payment.queries";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { useCart } from "@/features/eBookCart/hooks/useCart";
import { CartSummary } from "@/features/eBookCart/components/CartSummary";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const CheckoutPage = () => {
    const { mutateAsync: createIntent } = useCreatePaymentIntent();
    const { totals } = useCart();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    // Guard against double-firing in React StrictMode or on re-renders
    const hasInitialised = useRef(false);

    useEffect(() => {
        if (hasInitialised.current) return;
        hasInitialised.current = true;

        createIntent()
            .then((res) => {
                setClientSecret(res.payload.clientSecret);
            })
            .catch(() => {
                toast.error("Failed to initialize checkout. Please try again.");
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mt-20 flex min-h-screen flex-col bg-[#fbf9f4]">
            <Header />

            <main className="grow pt-32 pb-20">
                <section className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-10">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black tracking-tight text-slate-950">
                            Secure Checkout
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Complete your purchase to access your digital library instantly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
                        {/* Payment Area */}
                        <div>
                            {!clientSecret ? (
                                <div className="flex h-[400px] items-center justify-center rounded-3xl border border-slate-200/70 bg-white shadow-sm">
                                    <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
                                </div>
                            ) : (
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: 'stripe',
                                            variables: {
                                                colorPrimary: '#4a1a14',
                                                colorBackground: '#ffffff',
                                                colorText: '#0f172a',
                                                colorDanger: '#ef4444',
                                                fontFamily: 'Inter, system-ui, sans-serif',
                                                borderRadius: '12px',
                                            }
                                        }
                                    }}
                                >
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>

                        {/* Order Summary sidebar reused from Cart */}
                        <div className="lg:sticky lg:top-32 lg:self-start pointer-events-none">
                            {/* Make summary non-clickable on checkout page to avoid 'Proceed to checkout' clicks */}
                            <CartSummary totals={totals} onCheckout={() => {}} />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};
