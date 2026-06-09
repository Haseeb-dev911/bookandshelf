import { Header } from '@/shared/components/Header';
import TrustBar from '../components/TrustBar';
import ShopByCategory from '../components/ShopByCategory';
import NewArrivals from '../components/NewArrivals';
import BridgingEras from '../components/BridgingEras';
import SearchSection from '../components/SearchSection';
import { Footer } from '../components/Footer';

import { Carousel } from "../components/hero.section.carousel";

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />


      <main className="grow">
        <Carousel />
        <TrustBar />
        <ShopByCategory />
        <NewArrivals />
        <BridgingEras />
        <SearchSection />
      </main>
      <Footer />
    </div>
  );
};
