import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center no-underline select-none tracking-tight text-black dark:text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            {/* "book" - Bold & Heavy */}
            <span className="text-2xl font-extrabold">
                book
            </span>

            {/* "&" - Thin & Elegant */}
            <span className="text-2xl font-light px-0.5">
                &
            </span>

            {/* "Shelf" - Regular/Clean */}
            <span className="text-2xl font-normal tracking-wide">
                Shelf
            </span>
        </Link>
    );
};