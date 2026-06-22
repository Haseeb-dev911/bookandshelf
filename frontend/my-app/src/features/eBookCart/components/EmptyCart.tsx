import { ArrowRight, BookOpen, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";

export const EmptyCart = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 grid h-28 w-28 place-items-center rounded-[34px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="relative">
            <ShoppingCart className="h-14 w-14 text-slate-500" />
            <BookOpen className="absolute -right-4 -top-4 h-7 w-7 rounded-full bg-[#4a1a14] p-1.5 text-white" />
          </div>
        </div>

        <span className="mb-4 inline-flex rounded-full bg-[#4a1a14]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#4a1a14]">
          Empty Cart
        </span>

        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          Your e-book cart is empty
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-500">
          Looks like you have not added any e-books yet. Browse the marketplace and add your next digital read.
        </p>

        <Link
          to={USER_ROUTES_PATH.browse}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4a1a14] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#4a1a14]/20 transition hover:-translate-y-0.5 hover:bg-[#3a140f]"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};