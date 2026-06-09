import { useState, useMemo } from 'react';
import { Header } from '@/shared/components/Header';
import { useAllActiveBookListings, useAllPLPCategories } from '../quries/listing.queries';
import { ThreeDotLoader } from '@/shared/components/loaders/Three.dot.loader';
import { SlidersHorizontal, ArrowUpDown, BookOpen, Search, X } from 'lucide-react';
import libraryImg from '../../../assets/images/library.png';

// ── Condition pill colours ────────────────────────────────────────────────────
const conditionStyles: Record<string, string> = {
  new: 'bg-emerald-100 text-emerald-700',
  good: 'bg-sky-100 text-sky-700',
  fair: 'bg-amber-100 text-amber-700',
  poor: 'bg-red-100 text-red-700',
};

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-28 px-4">
    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200 shadow-sm mb-6">
      <BookOpen className="w-9 h-9 text-slate-400" />
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2 font-playfair">No books found</h2>
    <p className="text-slate-500 text-sm text-center max-w-xs leading-relaxed">
      Try adjusting your filters or check back later for new listings.
    </p>
  </div>
);

// ── Book Card ─────────────────────────────────────────────────────────────────
interface BookCardProps {
  book: any;
}

const BookCard = ({ book }: BookCardProps) => {
  const imageUrl = book.images?.[0]?.secure_url ?? libraryImg;
  const conditionClass = conditionStyles[book.condition] ?? 'bg-slate-100 text-slate-600';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image canvas */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={book.title}
          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.05] transition-transform duration-500"
        />
        {/* Condition badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${conditionClass}`}>
          {book.condition}
        </span>
      </div>

      {/* Details */}
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Price</span>
            <span className="font-bold text-xl text-slate-900">${Number(book.price).toFixed(2)}</span>
          </div>

          {/* CTA */}
          <button
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

// ── PLP Page ──────────────────────────────────────────────────────────────────
export const PLPPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Recently Added');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: listingsData, isLoading: listingsLoading } = useAllActiveBookListings(selectedCategory || undefined);
  const { data: categoriesData } = useAllPLPCategories();

  const categories = categoriesData?.payload ?? [];
  const rawListings: any[] = Array.isArray(listingsData?.payload) ? listingsData.payload : [];

  // Client-side search & sort
  const filteredListings = useMemo(() => {
    let result = [...rawListings];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [rawListings, sortBy, searchQuery]);

  return (
    <>
      <Header />

      {/* ── Hero banner ────────────────────────────────────────────────── */}
      <section className="pt-36 pb-14 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description…"
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Filter & sort bar ───────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div className="flex items-center gap-6 flex-wrap">
            {/* Category filter */}
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[150px]"
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2.5">
            <ArrowUpDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-slate-700">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[170px]"
            >
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-12">

        {/* Result count */}
        {!listingsLoading && (
          <p className="text-sm text-slate-500 mb-8">
            Showing <span className="font-semibold text-slate-800">{filteredListings.length}</span> listing{filteredListings.length !== 1 ? 's' : ''}
            {searchQuery && <> for "<span className="text-slate-700 font-medium">{searchQuery}</span>"</>}
          </p>
        )}

        {listingsLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <ThreeDotLoader />
          </div>
        ) : filteredListings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
