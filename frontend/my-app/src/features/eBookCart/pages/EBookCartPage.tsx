import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { CartItemCard } from "../components/CartItemCard";
import { CartSummary } from "../components/CartSummary";
import { EmptyCart } from "../components/EmptyCart";
import { initialEBookCartItems } from "../data/ebook-cart.mock";
import type { CartTotals, EBookCartItem } from "../types/ebook-cart.types";

export const EBookCartPage = () => {
  const [cartItems, setCartItems] = useState<EBookCartItem[]>(
    initialEBookCartItems
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const shipping = 0;
    const tax = subtotal * 0.08;
    const grandTotal = subtotal + shipping + tax;

    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return {
      subtotal,
      shipping,
      tax,
      grandTotal,
      totalItems,
    };
  }, [cartItems]);

  const handleIncrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("E-book removed from cart");
  };

  const handleCheckout = () => {
    toast.success("Checkout UI ready. Backend/payment integration pending.");
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f4]">
      <Header />

      <main className="grow pt-32">
        {isCartEmpty ? (
          <EmptyCart />
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
                      Review your selected e-books before checkout. After payment, files will be available for instant download.
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
                    item={item}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
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