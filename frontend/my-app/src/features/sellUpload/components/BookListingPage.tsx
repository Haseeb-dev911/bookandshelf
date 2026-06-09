import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { USER_ROUTES_PATH, AUTH_ROUTES_PATH } from "@/app/router/routes.path";
import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";

import { BookUploadForm } from "./add.book.form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function BookListingPage() {
  const { data, isSuccess, isLoading } = useProfileDataQuery();
  const navigate = useNavigate();

  // If not authenticated, show login modal
  const isLoggedIn = isSuccess && data?.success;

  // Show modal for unauthenticated users after query resolves
  const showAuthModal = !isLoading && !isLoggedIn;

  return (
    <div className="min-h-screen py-10 px-4 font-sans antialiased text-[#1A1A1A]">

      {/* Auth required modal */}
      <Dialog open={showAuthModal} onOpenChange={() => navigate(USER_ROUTES_PATH.sell)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to list a book for sale. Please sign in or create an account to continue.
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

      {/* Top Header Area */}
      <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <Link
          to={USER_ROUTES_PATH.sell}
          className="flex items-center  text-sm font-medium hover:opacity-70 transition text-[#1A1A1A]"
        >
          <ArrowLeft />

        </Link>

        <h1 className="text-2xl font-semibold tracking-wide text-[#1A1A1A]">
          Upload Book
        </h1>
        <div></div>
      </div>

      <div className="max-w-3xl  mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 sm:p-12">
        {isLoggedIn && <BookUploadForm />}
      </div>

    </div>
  );
};