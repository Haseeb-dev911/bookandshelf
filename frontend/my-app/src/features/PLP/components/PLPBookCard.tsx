import { Heart, MapPin, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { BookListing } from "../types/plp.types";
import libraryImg from "../../../assets/images/library.png";
import { showError, showSuccess } from "@/shared/utils/toast.global";
import { USER_ROUTE_BUILDER } from "@/app/router/routes.path";
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from "@/features/wishlist/queries/wishlist.queries";

// ─── Condition colour map ─────────────────────────────────────────────────────

const conditionStyles: Record<string, { pill: string; label: string }> = {
  new:  { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "New" },
  good: { pill: "bg-sky-100 text-sky-700 border-sky-200",             label: "Good" },
  fair: { pill: "bg-amber-100 text-amber-700 border-amber-200",       label: "Fair" },
  poor: { pill: "bg-red-100 text-red-600 border-red-200",             label: "Poor" },
};

// ─── PLPBookCard ──────────────────────────────────────────────────────────────

interface BookCardProps {
  book: BookListing;
}

export const PLPBookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  // ── Derive wishlisted from the shared cache — no per-card fetch needed ──────
  const { data: wishlistData } = useWishlist();
  const wishlistItems = wishlistData?.payload?.items ?? [];
  const wishlisted = wishlistItems.some(
    (item) => item.id === book.id || (item as any).ebookId === book.id
  );

  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const isPending = isAdding || isRemoving;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPending) return;
    if (!wishlisted) {
      addToWishlist(book.id, {
        onSuccess: (res) => showSuccess((res as any).message || "Added to wishlist."),
        onError: (err: any) => showError(
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Failed to add to wishlist."
        ),
      });
    } else {
      removeFromWishlist(book.id, {
        onSuccess: (res) => showSuccess((res as any).message || "Removed from wishlist."),
        onError: (err: any) => showError(
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Failed to remove from wishlist."
        ),
      });
    }
  };

  const isEbook = book.isEbook;
  const imageUrl  = book.images?.[0]?.secure_url ?? libraryImg;
  const style     = isEbook 
    ? { pill: "bg-violet-100 text-violet-700 border-violet-200 font-bold", label: "E-Book" }
    : (conditionStyles[book.condition || ""] ?? { pill: "bg-slate-100 text-slate-600 border-slate-200", label: book.condition || "" });
  const sellerAvatar = book.seller?.setting?.profileImageUrl ?? null;
  const sellerName   = book.seller?.name ?? "Unknown Seller";
  const sellerId     = book.seller?.id ?? book.sellerId;
  const cityName     = book.locationCity?.name ?? null;

  const originalPrice = Number(book.price);
  const discount = book.discountPercentage || 0;
  const hasDiscount = isEbook && discount > 0;
  const finalPrice = hasDiscount ? originalPrice - (originalPrice * discount / 100) : originalPrice;

  return (
    <article 
      onClick={() => navigate(USER_ROUTE_BUILDER.product(book.id))}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >

      {/* ── Wishlist Heart Button ── */}
      <button
        id={`wishlist-btn-${book.id}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleWishlistToggle}
        disabled={isPending}
        className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 ${isPending ? "opacity-60 cursor-wait" : ""}`}
      >
        {isPending ? (
          <span className="w-3.5 h-3.5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin inline-block" />
        ) : (
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              wishlisted
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-slate-400 hover:text-rose-400"
            }`}
          />
        )}
      </button>

      {/* ── Book Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={book.title}
          loading="lazy"
          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.05] transition-transform duration-500"
        />
        {/* Condition / Type badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${style.pill}`}
        >
          {style.label}
        </span>
        {hasDiscount && (
          <span className="absolute top-3 right-14 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-rose-500 text-white border-rose-600 shadow-sm animate-pulse">
            -{discount}%
          </span>
        )}
      </div>

      {/* ── Card Details ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Seller row — avatar + name + city */}
        <Link
          to={USER_ROUTE_BUILDER.sellerProfile(sellerId)}
          className="flex items-center gap-2 mb-3 group/seller"
          onClick={(e) => e.stopPropagation()}
        >
          {sellerAvatar ? (
            <img
              src={sellerAvatar}
              alt={sellerName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 flex-shrink-0"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-slate-400" />
            </span>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700 group-hover/seller:text-slate-900 transition-colors truncate leading-none">
              {sellerName}
            </p>
            {cityName && !isEbook && (
              <p className="flex items-center gap-0.5 text-[10px] text-slate-400 mt-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                {cityName}
              </p>
            )}
          </div>
        </Link>

        <h3 className="font-playfair font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-0.5 group-hover:text-slate-700 transition-colors">
          {book.title}
        </h3>
        
        {book.author && (
          <p className="text-xs text-slate-500 mb-2 truncate">by {book.author}</p>
        )}

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
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-xl text-slate-900">
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-semibold text-slate-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
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
