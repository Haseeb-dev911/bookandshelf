interface UsedBookCardProps {
  title: string;
  condition: string;
  conditionClass: string;
  sellerRating: number;
  price: string;
  imageUrl: string;
}

const UsedBookCard = ({ title, condition, conditionClass, sellerRating, price, imageUrl }: UsedBookCardProps) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient border border-outline-variant/20 hover:-translate-y-1 transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img alt="Physical Book" className="w-full h-full object-cover" src={imageUrl} />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-title-lg text-body-md font-bold text-on-surface">{title}</h3>
          <span className={`${conditionClass} text-[10px] font-bold uppercase px-2 py-1 rounded`}>{condition}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          <p className="font-label-sm text-on-surface-variant">Seller Rating: {sellerRating.toFixed(1)}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-title-lg text-primary">{price}</span>
          <button className="text-primary font-label-md hover:bg-primary/5 px-3 py-1 rounded-full border border-primary/20">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default UsedBookCard;
