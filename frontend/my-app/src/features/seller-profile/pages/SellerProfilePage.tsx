import { useParams, Link } from "react-router-dom";
import { MapPin, Mail, BookOpen, ArrowLeft, User } from "lucide-react";
import { useSellerProfile } from "../queries/seller-profile.queries";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";
import libraryImg from "@/assets/images/library.png";

// ─── SellerProfilePage ────────────────────────────────────────────────────────

export const SellerProfilePage = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const { data, isLoading, isError } = useSellerProfile(sellerId ?? "");

  const seller = data?.payload?.seller;
  const listings = data?.payload?.listings ?? [];

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading seller profile…</p>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (isError || !seller) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-playfair font-bold text-slate-800 mb-2">
            Seller not found
          </p>
          <p className="text-slate-500 text-sm mb-6">
            This seller profile doesn't exist or has been removed.
          </p>
          <Link
            to={USER_ROUTES_PATH.browse}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl = seller.profileImageUrl ?? null;
  const location =
    [seller.cityName, seller.countryName].filter(Boolean).join(", ") || null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Back nav ────────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8">
        <Link
          to={USER_ROUTES_PATH.browse}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>

      {/* ── Seller Hero Card ─────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-10">
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
          {/* Gradient banner */}
          <div className="h-28 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800" />

          {/* Seller info */}
          <div className="px-6 md:px-10 pb-8 -mt-12">
            {/* Avatar */}
            <div className="mb-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={seller.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-slate-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 mb-1">
                  {seller.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  {/* Email */}
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    {seller.email}
                  </span>
                  {/* Location */}
                  {location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {location}
                    </span>
                  )}
                </div>

                {seller.description && (
                  <p className="text-slate-500 text-sm mt-3 max-w-xl leading-relaxed">
                    {seller.description}
                  </p>
                )}
              </div>

              {/* Listings count badge */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 self-start sm:self-auto">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {listings.length} active listing{listings.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Seller Listings Grid ─────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-lg font-playfair font-bold text-slate-800 mb-6">
          Listed Books
        </h2>

        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl py-16 px-4 bg-white/60">
            <BookOpen className="w-8 h-8 text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">
              This seller has no active listings at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((book) => {
              const bookImage = book.images?.[0]?.secure_url ?? libraryImg;
              const conditionColors: Record<string, string> = {
                new: "bg-emerald-100 text-emerald-700 border-emerald-200",
                good: "bg-sky-100 text-sky-700 border-sky-200",
                fair: "bg-amber-100 text-amber-700 border-amber-200",
                poor: "bg-red-100 text-red-600 border-red-200",
              };
              const conditionStyle =
                conditionColors[book.condition] ??
                "bg-slate-100 text-slate-600 border-slate-200";

              return (
                <article
                  key={book.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
                    <img
                      src={bookImage}
                      alt={book.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.05] transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${conditionStyle}`}
                    >
                      {book.condition}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-playfair font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1">
                      {book.title}
                    </h3>
                    {book.description && (
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
                        {book.description}
                      </p>
                    )}
                    {book.locationCity?.name && (
                      <span className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {book.locationCity.name}
                      </span>
                    )}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-xl text-slate-900">
                        ${Number(book.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
