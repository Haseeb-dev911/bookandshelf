import { useParams, Link } from "react-router-dom";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { useProductDetails } from "../queries/product.queries";
import { USER_ROUTES_PATH, USER_ROUTE_BUILDER } from "@/app/router/routes.path";
import libraryImg from "@/assets/images/library.png";
import { MapPin, User, ChevronRight, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/features/eBookCart/hooks/useCart";
import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";
import { messagingApi } from "@/features/messaging/services/messagingApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function ProductPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError } = useProductDetails(bookId ?? "");
  const { isInCart, addItem } = useCart();
  const { data: profileData } = useProfileDataQuery();
  const navigate = useNavigate();

  const currentUserId = profileData?.payload?.id;

  const handleChatClick = async () => {
    if (!currentUserId) {
        toast.error("Please login to chat with seller");
        navigate("/login");
        return;
    }
    const sellerId = book?.seller?.id || book?.sellerId;
    if (!sellerId) return;

    try {
        const conv = await messagingApi.createConversation(sellerId);
        navigate(`/messages/${conv.id}`);
    } catch (err) {
        console.error("Failed to start chat", err);
        toast.error("Failed to start chat");
    }
  };

  const book = data?.payload;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="grow flex items-center justify-center">
          <span className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-playfair font-bold text-slate-800 mb-2">Book not found</h1>
            <p className="text-slate-500 mb-6">The product you are looking for does not exist.</p>
            <Link to={USER_ROUTES_PATH.browse} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium">Back to Browse</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bookImage = book.images?.[0]?.secure_url ?? libraryImg;
  const sellerAvatar = book.seller?.setting?.profileImageUrl ?? null;
  const location = book.locationCity?.name ?? "Unknown Location";

  const originalPrice = Number(book.price);
  const discount = book.discountPercentage || 0;
  const hasDiscount = book.isEbook && discount > 0;
  const finalPrice = hasDiscount ? originalPrice - (originalPrice * discount / 100) : originalPrice;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="grow max-w-[1200px] mx-auto w-full px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to={USER_ROUTES_PATH.home} className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={USER_ROUTES_PATH.browse} className="hover:text-slate-900">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{book.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Image */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="aspect-[4/5] bg-white rounded-3xl border border-slate-200/70 shadow-sm flex items-center justify-center p-8 overflow-hidden relative group">
              <img 
                src={bookImage} 
                alt={book.title} 
                className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Thumbnails (just mapping the images) */}
            {book.images && book.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {book.images.map(img => (
                  <div key={img.id} className="w-20 h-20 flex-shrink-0 bg-white rounded-xl border border-slate-200/70 p-2 flex items-center justify-center cursor-pointer hover:border-slate-400">
                     <img src={img.secure_url} className="max-w-full max-h-full object-contain" alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-7 flex flex-col gap-8">
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900">
                  {book.title}
                </h1>
                {book.isEbook && (
                  <span className="bg-violet-100 text-violet-700 border border-violet-200 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                    E-Book
                  </span>
                )}
              </div>
              {book.author && (
                <p className="text-lg text-slate-600 mb-4">by {book.author}</p>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-white border border-slate-200/70 shadow-sm rounded-2xl p-6 flex flex-col gap-1 relative overflow-hidden">
              {hasDiscount && (
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                  {discount}% OFF
                </div>
              )}
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900">${finalPrice.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="text-xl font-bold text-slate-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {book.description || "No description provided."}
                </p>
              </div>

              {!book.isEbook && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Condition</h3>
                  <p className="text-slate-600 text-sm capitalize">
                    {book.condition || "Unknown"}
                  </p>
                </div>
              )}
            </div>

            {/* Seller Info Box */}
            <div className="bg-white border border-slate-200/70 shadow-sm rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-slate-900">Seller Info</h3>
              
              <div className="flex items-center gap-4">
                {sellerAvatar ? (
                  <img src={sellerAvatar} alt={book.seller?.name} className="w-14 h-14 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                )}
                
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{book.seller?.name}</h4>
                  {!book.isEbook && (
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                {book.isEbook ? (
                  <button 
                    onClick={() => {
                      if (!isInCart(book.id)) {
                        addItem(book);
                      }
                    }}
                    disabled={isInCart(book.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-green-500 disabled:hover:bg-green-500 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors shadow-sm"
                  >
                    {isInCart(book.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        In Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors shadow-sm">
                      Buy Now
                    </button>
                    {(book.seller?.id !== currentUserId && book.sellerId !== currentUserId) && (
                      <button 
                        onClick={handleChatClick}
                        className="flex-1 bg-primary text-primary-foreground font-medium py-3 rounded-xl transition-colors shadow-sm"
                      >
                        Chat With Seller
                      </button>
                    )}
                  </>
                )}
                <Link to={USER_ROUTE_BUILDER.sellerProfile(book.seller?.id ?? book.sellerId)} className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-900 font-medium py-3 rounded-xl transition-colors text-center flex items-center justify-center shadow-sm">
                  View Seller Profile
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
