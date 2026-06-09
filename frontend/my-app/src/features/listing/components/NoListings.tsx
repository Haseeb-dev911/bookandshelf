import { USER_ROUTES_PATH } from '@/app/router/routes.path';
import { BookCopy, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NoListings = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40 h-full py-20 px-4">
      <div className='flex flex-col items-center justify-center'>

        <BookCopy size={50} />
        <h1 className="text-4xl font-playfair font-bold text-on-surface mb-2 mt-10 text-center">
          Begin Your Chapter
        </h1>
        <p className="text-on-surface-variant text-center max-w-[500px] mb-4">
          You haven’t listed any books for sale yet.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to={USER_ROUTES_PATH.uploadBookToSell}
            className="pt-2 pb-2 pr-5 pl-5 border-black border rounded-2xl cursor-pointer transition-all duration-300 ease-out
      hover:bg-black hover:border-mahogany hover:text-white
      hover:shadow-[0_4px_20px_rgba(141,46,46,0.15)] /* Subtle brand glow */
      active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px] flex gap-2">
              List you book <CirclePlus />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
