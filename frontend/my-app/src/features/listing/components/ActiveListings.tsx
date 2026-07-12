import libraryImg from '../../../assets/images/library.png';
import { useState } from 'react';
import { useUserOldBookListing, useDeleteUserOldBookProduct, useMarkListingAsSold, useEditListing } from '../quries/listing.queries';
import { BookOldUploadMetaData } from '@/features/sellUpload/quries/upload.book.metadata.query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CirclePlus, MoreHorizontal, BookOpen, SlidersHorizontal, ArrowUpDown, MapPin, Edit2, BadgeCheck } from 'lucide-react';
import { showSuccess, showError } from '@/shared/utils/toast.global';
import { Link } from 'react-router-dom';
import { USER_ROUTES_PATH } from '@/app/router/routes.path';
import { useForm } from 'react-hook-form';

// ─── Edit Listing Dialog ──────────────────────────────────────────────────────

interface EditDialogProps {
  book: any;
  categories: any[];
  onClose: () => void;
}

const EditListingDialog = ({ book, categories, onClose }: EditDialogProps) => {
  const editMutation = useEditListing();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: book.title ?? '',
      author: book.author ?? '',
      description: book.description ?? '',
      price: Number(book.price) ?? 0,
      condition: book.condition ?? 'good',
      categoryId: book.categoryId ?? '',
    }
  });

  const onSubmit = async (values: any) => {
    editMutation.mutate({ bookId: book.id, data: values }, {
      onSuccess: () => { showSuccess('Listing updated successfully.'); onClose(); },
      onError: () => showError('Failed to update listing. Please try again.'),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-playfair font-bold text-slate-900 flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-slate-600" />
            Edit Listing
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Title</label>
              <input {...register('title')} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Author</label>
              <input {...register('author')} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Description</label>
            <textarea {...register('description')} rows={3} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Price ($)</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Condition</label>
              <select {...register('condition')} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white">
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Category</label>
              <select {...register('categoryId')} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white">
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || editMutation.isPending}
              className="px-5 py-2 text-sm font-semibold bg-slate-900 hover:bg-slate-700 text-white rounded-xl transition-colors disabled:opacity-60"
            >
              {editMutation.isPending ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── ActiveListings ───────────────────────────────────────────────────────────

export const ActiveListings = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Recently Added');
  const [editingBook, setEditingBook] = useState<any>(null);

  const { data: metadata } = BookOldUploadMetaData();
  const categories = metadata?.payload?.categoriesPayload || [];

  const { data } = useUserOldBookListing(selectedCategory);
  const deleteMutation = useDeleteUserOldBookProduct();
  const markSoldMutation = useMarkListingAsSold();

  const listings = Array.isArray(data?.payload) ? data.payload : [];

  const handleDelete = (bookId: string) => {
    deleteMutation.mutate(bookId, {
      onSuccess: () => showSuccess('Listing deleted successfully.'),
      onError: () => showError('Failed to delete listing.'),
    });
  };

  const handleMarkSold = (bookId: string) => {
    markSoldMutation.mutate(bookId, {
      onSuccess: () => showSuccess('Listing marked as sold.'),
      onError: () => showError('Failed to mark listing as sold.'),
    });
  };

  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return Number(a.price) - Number(b.price);
    if (sortBy === 'Price: High to Low') return Number(b.price) - Number(a.price);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-20 px-4 md:px-6 lg:px-10 py-10 antialiased">

      {editingBook && (
        <EditListingDialog
          book={editingBook}
          categories={categories}
          onClose={() => setEditingBook(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 tracking-tight mb-2">
            Your Listed Books
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Manage your current listings, track conditions, and update pricing.
          </p>
        </div>
        <Link
          to={USER_ROUTES_PATH.uploadBookToSell}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-800 shadow-sm hover:shadow active:scale-[0.98]"
        >
          Add new book
          <CirclePlus className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[140px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2.5">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer min-w-[160px]"
          >
            <option>Recently Added</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      {sortedListings.length <= 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl py-20 px-4 bg-slate-200/10">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm mb-4">
            <BookOpen className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">No listings found</h3>
          <p className="text-slate-500 text-sm text-center max-w-sm mb-6">
            You haven't listed any items yet. Start selling books from your collection today!
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
          {sortedListings.map((book: any) => {
            const isSold = book.status === 'sold';

            return (
              <div
                key={book.id}
                className={`relative bg-white rounded-2xl overflow-hidden border shadow-sm flex flex-col h-full group transition-all duration-200
                  ${isSold
                    ? 'border-slate-100 opacity-50 grayscale pointer-events-none'
                    : 'border-slate-200/70 hover:border-slate-300 hover:shadow-md'
                  }`}
              >
                {/* Sold overlay badge */}
                {isSold && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <span className="flex items-center gap-1.5 bg-slate-900/80 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Sold
                    </span>
                  </div>
                )}

                {/* Book image */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6 relative">
                  <img
                    src={book.images?.[0]?.secure_url ?? libraryImg}
                    alt={book.title}
                    className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-sm text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-lg text-slate-700 uppercase">
                    {book.condition}
                  </span>
                </div>

                {/* Info body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-playfair font-bold text-lg text-slate-900 mb-0.5 line-clamp-1">
                    {book.title}
                  </h3>
                  {book.author && (
                    <p className="text-xs text-slate-500 mb-1 truncate">by {book.author}</p>
                  )}
                  {book.locationCity?.name && (
                    <span className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {book.locationCity.name}
                    </span>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">List Price</span>
                      <span className="font-sans font-bold text-xl text-slate-900">
                        ${Number(book.price).toFixed(2)}
                      </span>
                    </div>

                    {/* Actions menu — disabled for sold listings */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          disabled={isSold}
                          className="text-slate-400 hover:text-slate-700 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200/40 rounded-xl p-2 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 p-1.5 bg-white border border-slate-200 shadow-lg rounded-xl">
                        <DropdownMenuItem
                          className="cursor-pointer font-medium text-sm text-slate-700 focus:bg-slate-50 focus:text-slate-900 px-3 py-2 rounded-lg flex items-center gap-2"
                          onClick={() => setEditingBook(book)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer font-medium text-sm text-slate-700 focus:bg-slate-50 focus:text-slate-900 px-3 py-2 rounded-lg"
                          onClick={() => handleMarkSold(book.id)}
                        >
                          {markSoldMutation.isPending ? 'Marking…' : 'Mark as Sold'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 font-medium text-sm focus:bg-red-50 focus:text-red-700 px-3 py-2 rounded-lg"
                          onClick={() => handleDelete(book.id)}
                        >
                          {deleteMutation.isPending ? 'Deleting…' : 'Remove Listing'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};