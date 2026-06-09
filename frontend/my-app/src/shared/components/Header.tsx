import { Link } from 'react-router-dom';


import {
  CreditCardIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  User,
  UserIcon,
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
import { USER_ROUTES_PATH } from '@/app/router/routes.path';


export function Header() {
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
            <SearchIcon className='h-4 w-4' color='#9ca3af' />
          </div>
          <input
            className="w-full bg-transparent border border-surface-dim rounded-full py-2 pl-11 pr-4 text-[14px] text-gray-700 focus:outline-none focus:border-[var(--foreground)] placeholder-gray-400"
            placeholder="Search books, authors"
            type="text"
          />
        </div>


        <div className="flex items-center gap-5 shrink-0 text-gray-600 relative">
          <Link to={USER_ROUTES_PATH.wishlist} className="hover:text-mahogany transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </Link>

          <button className="hover:text-mahogany transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>

          <div className="relative">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" ><User /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"
                className="w-56 overflow-hidden text-[17px]"            >
                <Link to="/cart">
                  <DropdownMenuItem className='text-[17px]'>
                    <UserIcon />
                    Cart
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className='text-[17px]'>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <Link to={USER_ROUTES_PATH.setting}>
                  <DropdownMenuItem className='text-[17px]'>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-[17px]' variant="destructive">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header >
    </div >
  );
};


