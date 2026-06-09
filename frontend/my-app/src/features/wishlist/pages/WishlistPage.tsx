import { Link } from "react-router-dom";
import { Heart, BookOpen, Loader2 } from "lucide-react";
import { Header } from "@/shared/components/Header";
import { WishlistBookCard } from "../components/WishlistBookCard";
import { useWishlist } from "../queries/wishlist.queries";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";

// ─── Skeleton card for loading ───────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex flex-col animate-pulse">
    <div className="aspect-[4/3] bg-slate-100" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
      <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
      <div className="mt-auto h-8 bg-slate-100 rounded-xl w-full" />
    </div>
  </div>
);

// ─── Empty state ─────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 px-4">
    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center border border-rose-100 shadow-sm mb-6">
      <Heart className="w-10 h-10 text-rose-300" />
    </div>
    <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-2">
      Your wishlist is empty
    </h2>
    <p className="text-slate-500 text-sm text-center max-w-xs leading-relaxed mb-8">
      Browse books and tap the heart icon to save your favourites here.
    </p>
    <Link
      to={USER_ROUTES_PATH.browse}
      id="wishlist-browse-books-btn"
      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-150 shadow-md"
    >
      <BookOpen className="w-4 h-4" />
      Browse Books
    </Link>
  </div>
);

// ─── WishlistPage ─────────────────────────────────────────────────────────────

export const WishlistPage = () => {
  const { data, isLoading, isFetching } = useWishlist();

  const items = data?.payload?.items ?? [];
  const count = data?.payload?.count ?? 0;

  return (
    <>
      <style>{`
        @keyframes wishlistCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Header />

      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <section
        id="wishlist-hero"
        className="pt-36 pb-14 px-4 bg-gradient-to-br from-slate-50 via-white to-rose-50/40"
      >
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-rose-400 mb-4">
            Saved Books
          </span>
          <div className="flex items-end gap-4 flex-wrap">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
              My Wishlist
            </h1>
            {!isLoading && (
              <span className="mb-2 inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold px-3 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                {count} {count === 1 ? "book" : "books"}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed mt-3">
            All the books you've saved in one place. Ready to buy whenever you are.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main
        id="wishlist-grid"
        className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-12"
      >
        {/* Subtle loading indicator on refetch */}
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Refreshing…
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <WishlistBookCard key={item.wishlistId} item={item} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
