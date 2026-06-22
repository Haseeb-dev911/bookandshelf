import { BookOpen, Download, Minus, Plus, Trash2 } from "lucide-react";
import type { EBookCartItem } from "../types/ebook-cart.types";

type CartItemCardProps = {
  item: EBookCartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const CartItemCard = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps) => {
  return (
    <article className="group rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-[190px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-[#f7f3e9] p-5 sm:h-[170px] sm:w-[145px] sm:shrink-0">
          <img
            src={item.coverImage}
            alt={item.title}
            className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#4a1a14]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4a1a14]">
                {item.category}
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500">
                {item.format}
              </span>
            </div>

            <h2 className="text-xl font-bold leading-tight text-slate-950 md:text-2xl">
              {item.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              by {item.author}
            </p>

            <div className="mt-4 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4 text-[#7c6442]" />
                {item.delivery}
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#7c6442]" />
                {item.fileSize} · {item.license}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Price
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                {formatCurrency(item.price)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => onDecrement(item.id)}
                  disabled={item.quantity <= 1}
                  className="grid h-11 w-11 place-items-center text-slate-600 transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="grid h-11 min-w-12 place-items-center border-x border-slate-200 bg-white text-sm font-bold text-slate-950">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => onIncrement(item.id)}
                  className="grid h-11 w-11 place-items-center text-slate-600 transition hover:bg-white hover:text-slate-950"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                Remove
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};