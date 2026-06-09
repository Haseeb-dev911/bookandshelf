import { Trash2, ExternalLink, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";
import type { WishlistItem } from "../types/wishlist.types";
import { useRemoveFromWishlist } from "../queries/wishlist.queries";
import { showSuccess, showError } from "@/shared/utils/toast.global";
import libraryImg from "@/assets/images/library.png";
import { USER_ROUTE_BUILDER } from "@/app/router/routes.path";

// ─── Condition colour map ─────────────────────────────────────────────────────

const conditionStyles: Record<string, { pill: string; label: string }> = {
  new:  { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "New" },
  good: { pill: "bg-sky-100 text-sky-700 border-sky-200",             label: "Good" },
  fair: { pill: "bg-amber-100 text-amber-700 border-amber-200",       label: "Fair" },
  poor: { pill: "bg-red-100 text-red-600 border-red-200",             label: "Poor" },
};

// ─── WishlistBookCard ─────────────────────────────────────────────────────────

interface WishlistBookCardProps {
  item: WishlistItem;
}

export const WishlistBookCard = ({ item }: WishlistBookCardProps) => {
  const { mutate: removeFromWishlist, isPending } = useRemoveFromWishlist();

  const imageUrl = item.images?.[0]?.secure_url ?? libraryImg;
  const style = conditionStyles[item.condition] ?? {
    pill: "bg-slate-100 text-slate-600 border-slate-200",
    label: item.condition,
  };

  const sellerAvatar = item.seller?.setting?.profileImageUrl ?? null;
  const sellerName   = item.seller?.name ?? "Unknown Seller";
  const sellerId     = item.seller?.id ?? item.sellerId;
  const cityName     = item.locationCity?.name ?? null;

  const handleRemove = () => {
    removeFromWishlist(item.id, {
      onSuccess: (res) => {
        showSuccess(res.message || "Removed from wishlist.");
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Failed to remove from wishlist.";
        showError(msg);
      },
    });
  };

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{ animation: "wishlistCardIn 0.35s ease both" }}
    >
      {/* ── Book Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={item.title}
          loading="lazy"
          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.05] transition-transform duration-500"
        />
        {/* Condition badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${style.pill}`}
        >
          {style.label}
        </span>

        {/* Remove button */}
        <button
          id={`wishlist-remove-${item.id}`}
          aria-label="Remove from wishlist"
          disabled={isPending}
          onClick={handleRemove}
          className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-red-200 shadow-sm transition-all duration-200 hover:bg-red-50 hover:scale-110 active:scale-95 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? (
            <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
          ) : (
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          )}
        </button>
      </div>

      {/* ── Card Details ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Seller row */}
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
            {cityName && (
              <p className="flex items-center gap-0.5 text-[10px] text-slate-400 mt-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                {cityName}
              </p>
            )}
          </div>
        </Link>

        <h3 className="font-playfair font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1 group-hover:text-slate-700 transition-colors">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Price
            </span>
            <span className="font-bold text-xl text-slate-900">
              ${Number(item.price).toFixed(2)}
            </span>
          </div>

          {/* CTA */}
          <button
            id={`wishlist-view-${item.id}`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};
