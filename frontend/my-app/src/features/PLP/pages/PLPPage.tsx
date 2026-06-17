import { useState, useCallback, useMemo } from "react";
import { Search, X, BookOpen, Loader2 } from "lucide-react";
import { Header } from "@/shared/components/Header";
// import { ThreeDotLoader } from "@/shared/components/loaders/Three.dot.loader";
import { PLPFilterBar } from "../components/PLPFilterBar";
import { PLPBookCard } from "../components/PLPBookCard";
import { usePLPListings, usePLPCategories } from "../queries/plp.queries";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import type { PLPFilters, BookListing } from "../types/plp.types";
// import libraryImg from "../../../assets/images/library.png";

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-28 px-4">
    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200 shadow-sm mb-6">
      <BookOpen className="w-9 h-9 text-slate-400" />
    </div>
    <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-2">No books found</h2>
    <p className="text-slate-500 text-sm text-center max-w-xs leading-relaxed">
      Try adjusting your filters or check back later for new listings.
    </p>
  </div>
);

// ─── Card skeleton for loading ────────────────────────────────────────────────
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

// ─── PLPPage ──────────────────────────────────────────────────────────────────
export const PLPPage = () => {
  // ── Filter state ──
  const [filters, setFilters] = useState<PLPFilters>({
    categoryId: "",
    condition:  "",
    type: "all",
    search:     "",
    sortBy:     "newest",
  });

  // ── Pending search input (debounce-like: user types then presses Enter or waits) ──
  const [searchInput, setSearchInput] = useState("");

  const handleFilterChange = useCallback(
    (key: keyof PLPFilters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSearchSubmit = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: searchInput }));
  }, [searchInput]);

  const handleSearchClear = useCallback(() => {
    setSearchInput("");
    setFilters((prev) => ({ ...prev, search: "" }));
  }, []);

  // ── Data fetching ──
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePLPListings(filters);

  const { data: categoriesData } = usePLPCategories();
  const categories = categoriesData?.payload ?? [];

  // ── Flatten all pages into a single list ──
  const allListings: BookListing[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload?.listings ?? []) ?? [];
  }, [data]);

  // ── Infinite scroll sentinel ──
  const sentinelRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
  });

  const totalLoaded = allListings.length;

  return (
    <>
      <Header />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section
        id="plp-hero"
        className="pt-36 pb-14 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100"
      >
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">
            Marketplace
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
            Browse Books
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
            Discover used books listed by readers across the platform. Find your next great read at the right price.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="plp-search-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search by title or description…"
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-24 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchInput && (
                <button
                  onClick={handleSearchClear}
                  id="plp-search-clear"
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearchSubmit}
                id="plp-search-submit"
                className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <PLPFilterBar
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main
        id="plp-grid"
        className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-12"
      >
        {/* Result count */}
        {!isLoading && (
          <p className="text-sm text-slate-500 mb-8">
            Showing{" "}
            <span className="font-semibold text-slate-800">{totalLoaded}</span>{" "}
            listing{totalLoaded !== 1 ? "s" : ""}
            {filters.search && (
              <>
                {" "}for "
                <span className="text-slate-700 font-medium">{filters.search}</span>
                "
              </>
            )}
          </p>
        )}

        {/* Initial loading skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : allListings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Book cards grid — infinite scroll via map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allListings.map((book) => (
                <PLPBookCard key={book.id} book={book} />
              ))}
            </div>

            {/* ── Infinite scroll sentinel ── */}
            <div ref={sentinelRef} className="h-1" aria-hidden="true" />

            {/* Loading spinner for next page */}
            {isFetchingNextPage && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-7 h-7 animate-spin text-slate-400" />
                <span className="ml-3 text-sm text-slate-500">Loading more books…</span>
              </div>
            )}

            {/* End of results */}
            {!hasNextPage && allListings.length > 0 && (
              <p className="text-center text-sm text-slate-400 py-10 tracking-wide">
                You've seen all{" "}
                <span className="font-semibold text-slate-600">{totalLoaded}</span>{" "}
                listings ✓
              </p>
            )}
          </>
        )}
      </main>
    </>
  );
};
