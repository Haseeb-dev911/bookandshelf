import { NavLink } from "react-router-dom";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import styles from "./Menu.modal.module.scss";
import { USER_ROUTES_PATH } from '@/app/router/routes.path';

export function MenuModal() {
    return (
        <div >
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className={`
                            relative group overflow-hidden
                            bg-white text-gray-800 font-medium
                            px-5 py-6 rounded-xl
                            border-2 border-b-4 border-gray-200 active:border-b-2
                            shadow-[0_4px_0_0_rgba(229,231,235,1)] active:shadow-none
                            transition-all duration-150 ease-out
                            hover:bg-gray-50 hover:-translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(229,231,235,1)] hover:border-b-[6px]
                            active:translate-y-[2px]
                            cursor-pointer 
                            flex items-center justify-center gap-2
                            ${styles.menuModalButton}
                        `}
                    >
                        <span className="relative z-10 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">
                            <Menu className="w-5 h-5 text-gray-700  transition-colors" />
                        </span>
                    </Button>

                </SheetTrigger>
                <SheetContent side="right" className="w-full 
                sm:max-w-md border-none bg-white animate-t p-8 flex flex-col
                 justify-between h-full rounded-tl-2xl rounded-bl-2xl ">

                    <div>
                        <div className="flex justify-start gap-6 mb-12">
                            <SheetClose asChild>
                                <button className="w-12 h-12 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors focus:outline-none">
                                    <X className="w-5 h-5" />
                                </button>
                            </SheetClose>
                            <SheetTitle className="relative version-link w-fit transition-all duration-500 ease-out 
                        hover:text-mahogany group flex items-center">Menu</SheetTitle>
                        </div>

                        <nav
                            style={{ fontFamily: "'Cinzel', serif" }}
                            className="flex flex-col gap-6 text-[45px] leading-none text-gray-800 font-medium select-none"
                        >
                            {[
                                { label: 'Home', href: USER_ROUTES_PATH.home },
                                { label: 'Browse', href: USER_ROUTES_PATH.browse },
                                { label: 'Sell', href: USER_ROUTES_PATH.sell },
                                { label: 'Categories', href: '/categories' },
                                { label: 'Setting', href: USER_ROUTES_PATH.setting },
                                { label: 'About', href: '/about' },
                            ].map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={link.href}
                                    className={({ isActive }) => `
                                    relative version-link w-fit flex items-center transition-all duration-500 ease-out select-none 
                                    active:scale-95 group
                                    ${isActive
                                            ? 'text-mahogany tracking-widest pl-4'
                                            : 'text-gray-400 hover:text-gray-800 hover:tracking-widest hover:pl-4'
                                        }
                                     `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span
                                                className={`
                                                    absolute left-0 top-1/2 -translate-y-1/2 bg-mahogany 
                                                    rounded-full aspect-square transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                                                    ${isActive
                                                        ? 'w-2 h-2 opacity-100 scale-100'
                                                        : 'w-2 h-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100' // Hidden by default, pops up nicely on hover
                                                    }
                                             `}
                                            />
                                            <span className="relative transition-transform duration-500 ease-out">
                                                {link.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div >
    );
}