interface EBookCardProps {
  title: string;
  author: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  hiddenOnMobile?: boolean;
  hiddenOnTablet?: boolean;
}

const EBookCard = ({ title, author, rating, reviewsCount, imageUrl, hiddenOnMobile, hiddenOnTablet }: EBookCardProps) => {
  return (
    <div className={`bg-surface-container-low rounded-xl p-4 shadow-ambient hover:shadow-ambient-lg transition-all duration-300 border border-outline-variant/30 ${hiddenOnMobile ? 'hidden md:block' : ''} ${hiddenOnTablet ? 'hidden lg:block' : ''}`}>
      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
        <img alt="E-book Cover" className="w-full h-full object-cover" src={imageUrl} />
      </div>
      <h3 className="font-title-lg text-body-md font-bold text-on-surface truncate">{title}</h3>
      <p className="font-body-md text-label-md text-on-surface-variant mb-2">{author}</p>
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        <span className="font-label-sm text-on-surface">{rating} <span className="text-on-surface-variant font-normal">({reviewsCount} reviews)</span></span>
      </div>
    </div>
  );
};

export default EBookCard;
