import { ActiveListings } from '../components/ActiveListings';
import { Header } from '@/shared/components/Header';
import { useUserOldBookListing } from '../quries/listing.queries';
import { ThreeDotLoader } from '@/shared/components/loaders/Three.dot.loader';
import { NoListings } from '../components/NoListings';

export const ListingsPage = () => {

  const { data, isLoading } = useUserOldBookListing();

  const renderContent = () => {
    if (isLoading) {
      return <ThreeDotLoader />;
    }

    if (!data?.payload || data.payload.length === 0) {
      return <NoListings />;
    }

    return <ActiveListings />;
  };

  return (
    <>
      <Header />
      <div className="flex items-center flex-col min-h-[95vh]">
        <main className="flex-1 h-full items-center">
          {renderContent()}
        </main>
      </div>
    </>
  );
};