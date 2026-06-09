import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import type { BookListing } from "../types/plp.types";
import libraryImg from "../../../assets/images/library.png";
import { wishlistService } from "../../wishlist/service/wishlist.service";
import { showError, showSuccess } from "@/shared/utils/toast.global";

// ─── Condition colour map ─────────────────────────────────────────────────────

const conditionStyles: Record<string, { pill: string; label: string }> = {
  new:  { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "New" },
  good: { pill: "bg-sky-100 text-sky-700 border-sky-200",             label: "Good" },
  fair: { pill: "bg-amber-100 text-amber-700 border-amber-200",       label: "Fair" },
  poor: { pill: "bg-red-100 text-red-600 border-red-200",             label: "Poor" },
};

// ─── BookCard ─────────────────────────────────────────────────────────────────

interface BookCardProps {
  book: BookListing;
}

export const PLPBookCard = ({ book }: BookCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    // On component mount, fetch the wishlist status for this book
    const fetchStatus = async () => {
      try {
        const response = await wishlistService.getWishlistStatus([book.id]);
        const isWishlisted = response.payload?.statusMap?.[book.id] ?? false;
        setWishlisted(isWishlisted);
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error("Failed to fetch wishlist status", err);
        }
      }
    };
    fetchStatus();
  }, [book.id]);
  const imageUrl = book.images?.[0]?.secure_url ?? libraryImg;
  const style    = conditionStyles[book.condition] ?? { pill: "bg-slate-100 text-slate-600 border-slate-200", label: book.condition };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* ── Wishlist Heart Button ── */}
      <button
        id={`wishlist-btn-${book.id}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={async (e) => {
          e.stopPropagation();
          // Optimistically toggle UI
          setWishlisted((prev) => !prev);
          try {
            if (!wishlisted) {
              // currently not wishlisted, add it
              const res = await wishlistService.addToWishlist(book.id);
              showSuccess(res.message || "Added to wishlist.");
            } else {
              // currently wishlisted, remove it
              const res = await wishlistService.removeFromWishlist(book.id);
              showSuccess(res.message || "Removed from wishlist.");
            }
          } catch (err: any) {
            // revert UI on error
            setWishlisted((prev) => !prev);
            const errMsg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || "Something went wrong. Please try again.";
            showError(errMsg);
            console.error("Wishlist toggle failed", err);
          }
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            wishlisted
              ? "fill-rose-500 text-rose-500 scale-110"
              : "text-slate-400 hover:text-rose-400"
          }`}
        />
      </button>

      {/* ── Book Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={book.title}
          loading="lazy"
          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.05] transition-transform duration-500"
        />
        {/* Condition badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${style.pill}`}
        >
          {style.label}
        </span>
      </div>

      {/* ── Card Details ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1 group-hover:text-slate-700 transition-colors">
          {book.title}
        </h3>

        {book.description && (
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {book.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Price
            </span>
            <span className="font-bold text-xl text-slate-900">
              ${Number(book.price).toFixed(2)}
            </span>
          </div>

          {/* CTA */}
          <button
            id={`view-details-${book.id}`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};
