import { ArrowRight, CreditCard, ShieldCheck, ShoppingCart } from "lucide-react";
import type { CartTotals } from "../types/ebook-cart.types";

type CartSummaryProps = {
  totals: CartTotals;
  onCheckout: () => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const CartSummary = ({ totals, onCheckout }: CartSummaryProps) => {
  return (
    <aside className="sticky top-32 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4a1a14]/10 text-[#4a1a14]">
          <ShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-950">Order Summary</h2>
          <p className="text-sm text-slate-500">
            {totals.totalItems} e-book{totals.totalItems === 1 ? "" : "s"} selected
          </p>
        </div>
      </div>

      <div className="space-y-4 border-y border-slate-200 py-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-bold text-slate-950">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Digital Delivery</span>
          <span className="font-bold text-emerald-600">
            {formatCurrency(totals.shipping)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Tax Estimate</span>
          <span className="font-bold text-slate-950">
            {formatCurrency(totals.tax)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-lg font-black text-slate-950">Grand Total</span>
        <span className="text-2xl font-black text-[#4a1a14]">
          {formatCurrency(totals.grandTotal)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4a1a14] px-5 py-4 text-sm font-black text-white shadow-lg shadow-[#4a1a14]/20 transition hover:-translate-y-0.5 hover:bg-[#3a140f]"
      >
        Proceed to Checkout
        <ArrowRight className="h-4 w-4" />
      </button>

      <div className="mt-5 space-y-3 text-xs font-medium text-slate-500">
        <p className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[#7c6442]" />
          Accepted Payments: Visa, Mastercard, PayPal
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#7c6442]" />
          Secure checkout with instant e-book access
        </p>
      </div>
    </aside>
  );
};