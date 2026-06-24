import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { CartItemCard } from "../components/CartItemCard";
import { CartSummary } from "../components/CartSummary";
import { EmptyCart } from "../components/EmptyCart";
import { useCart } from "../hooks/useCart";
import { AUTH_ROUTES_PATH, USER_ROUTES_PATH } from "@/app/router/routes.path";

export const EBookCartPage = () => {
  const { cartItems, isLoading, removeItem, totals, isLoggedIn } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRemove = async (id: string) => {
    try {
      await removeItem(id);
      toast.success("E-book removed from cart");
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed to checkout");
      navigate(`${AUTH_ROUTES_PATH.login}?redirect=${location.pathname}`);
      return;
    }
    navigate(USER_ROUTES_PATH.checkout);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="grow flex items-center justify-center">
          <span className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f4]">
      <Header />

      <main className="grow pt-32">
        {isCartEmpty ? (
          <EmptyCart isLoggedIn={isLoggedIn} />
        ) : (
          <>
            <section className="border-b border-slate-200/70 bg-gradient-to-br from-[#fbf9f4] via-white to-[#f7f3e9] px-4 pb-12 pt-8">
              <div className="mx-auto max-w-[1280px]">
                <span className="mb-4 inline-flex rounded-full bg-[#4a1a14]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#4a1a14]">
                  Digital Library
                </span>

                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                      E-Book Cart
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                      Review your selected e-books before checkout. After
                      payment, files will be available for instant download.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      Total Items
                    </p>
                    <p className="mt-1 text-3xl font-black text-[#4a1a14]">
                      {totals.totalItems}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-10 md:px-6 lg:grid-cols-[1fr_380px] lg:px-10">
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item as any}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <CartSummary totals={totals} onCheckout={handleCheckout} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
