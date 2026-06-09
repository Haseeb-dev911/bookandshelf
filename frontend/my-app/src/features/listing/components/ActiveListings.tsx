import libraryImg from '../../../assets/images/library.png';
import { useState } from 'react';
import { useUserOldBookListing, useDeleteUserOldBookProduct } from '../quries/listing.queries';
import { BookOldUploadMetaData } from '@/features/sellUpload/quries/upload.book.metadata.query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CirclePlus, MoreHorizontal, BookOpen, SlidersHorizontal, ArrowUpDown, Heart } from 'lucide-react';
import { showSuccess, showError } from '@/shared/utils/toast.global';
import { Link } from 'react-router-dom';
import { USER_ROUTES_PATH } from '@/app/router/routes.path';
import { useQueryClient } from '@tanstack/react-query';

export const ActiveListings = () => {

  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Recently Added');
  // Wishlist state: bookId -> boolean (local UI state, ready for wishlist module)
  const [wishlisted, setWishlisted] = useState<Record<string, boolean>>({});
  const toggleWishlist = (id: string) => setWishlisted(prev => ({ ...prev, [id]: !prev[id] }));

  const { data: metadata } = BookOldUploadMetaData();
  const categories = metadata?.payload?.categoriesPayload || [];

  const { data } = useUserOldBookListing(selectedCategory);
  const deleteMutation = useDeleteUserOldBookProduct();

  const listings = Array.isArray(data?.payload) ? data.payload : [];

  const handleDelete = async (bookId: string) => {
    deleteMutation.mutate(bookId, {
      onSuccess: () => showSuccess("Listing deleted successfully."),
      onError: () => showError("Failed to delete listing.")
    });

    listings.filter((v: any) => (
      v.id !== bookId
    ));
    
    await queryClient.invalidateQueries({
      queryKey: ["user-old-book-listings"],
    });
  };


  // Frontend Sorting
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-20 px-4 md:px-6 lg:px-10 py-10 antialiased">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 tracking-tight mb-2">
            Your Listed Books
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Manage your current listings, track conditions, and update pricing across channels.
          </p>
        </div>
        <Link
          to={USER_ROUTES_PATH.uploadBookToSell}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-800 hover:border-slate-800 shadow-sm hover:shadow active:scale-[0.98]"
        >
          Add new book
          <CirclePlus className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[140px]"
            >
              <option value="">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[160px]"
          >
            <option>Recently Added</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Content State Rendering */}
      {sortedListings.length <= 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl py-20 px-4 bg-slate-200/10">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm mb-4">
            <BookOpen className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">No active listings found</h3>
          <p className="text-slate-500 text-sm text-center max-w-sm mb-6">
            You haven't listed any items under this criteria yet. Start selling items from your personal collection today!
          </p>
          <Link
            to={USER_ROUTES_PATH.uploadBookToSell}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedListings.map((book: any) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group"
            >
              {/* Product Artwork Canvas */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6 relative">
                <img
                  src={book.images && book.images[0] ? book.images[0].secure_url : libraryImg}
                  alt={book.title}
                  className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-sm text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-lg text-slate-700 uppercase">
                  {book.condition}
                </span>
                {/* ── Wishlist Heart ── */}
                <button
                  id={`wishlist-listing-${book.id}`}
                  aria-label={wishlisted[book.id] ? 'Remove from wishlist' : 'Add to wishlist'}
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(book.id); }}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      wishlisted[book.id]
                        ? 'fill-rose-500 text-rose-500 scale-110'
                        : 'text-slate-400 hover:text-rose-400'
                    }`}
                  />
                </button>
              </div>

              {/* Information Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-playfair font-bold text-lg text-slate-900 mb-1 line-clamp-1 group-hover:text-slate-800 transition-colors">
                  {book.title}
                </h3>
                <p className="text-slate-400 text-xs tracking-wide uppercase font-medium mb-4">
                  ISBN / Core Identity
                </p>

                {/* Sticky Action Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      List Price
                    </span>
                    <span className="font-sans font-bold text-xl text-slate-900">
                      ${Number(book.price).toFixed(2)}
                    </span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-slate-400 hover:text-slate-700 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200/40 rounded-xl p-2 transition-all outline-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 p-1.5 bg-white border border-slate-200 shadow-lg rounded-xl">
                      <DropdownMenuItem
                        className="cursor-pointer font-medium text-sm text-slate-700 focus:bg-slate-50 focus:text-slate-900 px-3 py-2 rounded-lg"
                        onClick={() => { /* Edit Handler */ }}
                      >
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 font-medium text-sm focus:bg-red-50 focus:text-red-700 px-3 py-2 rounded-lg"
                        onClick={() => handleDelete(book.id)}
                      >
                        {deleteMutation.isPending ? "Deleting..." : "Remove Listing"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};