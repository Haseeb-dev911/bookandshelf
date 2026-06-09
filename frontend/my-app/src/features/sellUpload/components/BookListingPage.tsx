import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { USER_ROUTES_PATH } from "@/app/router/routes.path";

import { BookUploadForm } from "./add.book.form";

export function BookListingPage() {
  return (
    <div className="min-h-screen py-10 px-4 font-sans antialiased text-[#1A1A1A]">

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
        <BookUploadForm />
      </div>

    </div>
  );
};