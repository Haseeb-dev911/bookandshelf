import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  CreditCardIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  ShieldIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenuModal } from './Menu.modal';
import { USER_ROUTES_PATH, AUTH_ROUTES_PATH } from '@/app/router/routes.path';
import { ChatBadge } from '@/features/messaging/components/ChatBadge';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';
import { settingService } from '@/features/profile-setting/services/setting.page.service';
import defaultImg from "@/assets/default-img.jpg";


export function Header() {
  const { data, isSuccess } = useProfileDataQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await settingService.logout();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const isLoggedIn = isSuccess && data?.success;

  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center px-4 pointer-events-none">
      <header className="bg-white pointer-events-auto rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-surface-dim px-6 py-3 w-full max-w-[1100px] flex items-center justify-between gap-6">
        <MenuModal />
        <div className="flex items-center gap-3 w-[170px] h-[50px] cursor-pointer shrink-0">
          <Link
            to={"/"}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "25px" }}
          >
            Book&Shelf
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex md:flex-1 max-w relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4" color="#9ca3af" />
          </div>
          <input
            className="w-full bg-transparent border border-surface-dim rounded-full py-2 pl-11 pr-4 text-[14px] text-gray-700 focus:outline-none focus:border-[var(--foreground)] placeholder-gray-400"
            placeholder="Search books, authors"
            type="text"
          />
        </div>

        <div className="flex items-center gap-5 shrink-0 text-gray-600 relative">
          {isLoggedIn && (
            <>
            <Link
              to={USER_ROUTES_PATH.wishlist}
              className="hover:text-mahogany transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </Link>
            <ChatBadge />
            </>
          )}

          <Link
            to={USER_ROUTES_PATH.cart}
            className="hover:text-mahogany transition-colors"
          >
            <button className="hover:text-mahogany transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </button>
          </Link>

          <div className="relative">
            {isLoggedIn ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full overflow-hidden p-0 h-10 w-10 border border-gray-200 cursor-pointer"
                  >
                    <img
                      src={data.payload.profileImageUrl || defaultImg}
                      alt="User profile"
                      className="h-full w-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 overflow-hidden text-[17px]"
                >
                  <div className="px-3 py-2 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {data.payload.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {data.payload.email}
                    </p>
                  </div>
                  <Link to={USER_ROUTES_PATH.cart}>
                    <DropdownMenuItem className="text-[17px] cursor-pointer">
                      <UserIcon />
                      Cart
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="text-[17px] cursor-pointer">
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <Link to={USER_ROUTES_PATH.setting}>
                    <DropdownMenuItem className="text-[17px] cursor-pointer">
                      <SettingsIcon />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  {data.payload.role === "admin" && (
                    <Link to={USER_ROUTES_PATH.admin}>
                      <DropdownMenuItem className="text-[17px] cursor-pointer text-violet-700 hover:text-violet-800 hover:bg-violet-50">
                        <ShieldIcon />
                        Admin Panel
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-[17px] cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to={AUTH_ROUTES_PATH.login}
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 cursor-pointer"
              >
                Sign up/Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};


