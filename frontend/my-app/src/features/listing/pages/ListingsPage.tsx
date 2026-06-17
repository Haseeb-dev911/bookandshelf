import { Link, useNavigate } from 'react-router-dom';

import { ActiveListings } from '../components/ActiveListings';
import { Header } from '@/shared/components/Header';
import { useUserOldBookListing } from '../quries/listing.queries';
import { ThreeDotLoader } from '@/shared/components/loaders/Three.dot.loader';
import { NoListings } from '../components/NoListings';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';

export const ListingsPage = () => {
  const navigate = useNavigate();
  const { data: profileData, isSuccess, isLoading: profileLoading } = useProfileDataQuery();
  const isLoggedIn = isSuccess && profileData?.success;
  const showAuthModal = !profileLoading && !isLoggedIn;

  const { data, isLoading } = useUserOldBookListing();

  const renderContent = () => {
    if (isLoading || profileLoading) {
      return <ThreeDotLoader />;
    }

    if (!isLoggedIn) {
      return null;
    }

    if (!data?.payload || data.payload.length === 0) {
      return <NoListings />;
    }

    return <ActiveListings />;
  };

  return (
    <>
      <Header />

      {/* Auth required modal */}
      <Dialog open={showAuthModal} onOpenChange={() => navigate("/")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to view and manage your book listings. Please sign in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Link to={AUTH_ROUTES_PATH.login}>
              <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                Log In
              </Button>
            </Link>
            <Link to={AUTH_ROUTES_PATH.signup}>
              <Button className="w-full sm:w-auto cursor-pointer bg-black hover:bg-neutral-800 text-white">
                Sign Up
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center flex-col min-h-[95vh]">
        <main className="flex-1 h-full items-center">
          {renderContent()}
        </main>
      </div>
    </>
  );
};