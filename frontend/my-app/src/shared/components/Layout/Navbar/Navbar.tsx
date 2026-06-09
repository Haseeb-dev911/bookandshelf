import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 h-[64px] flex items-center justify-between gap-4">

        {/* Left: Logo + Search */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img alt="BookShelf" className="h-[34px] w-auto" src={logo} />
          </Link>
          <div className="hidden lg:flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full px-3 py-1.5 gap-2 w-44">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline w-full"
              placeholder="Search books, authors"
              type="text"
            />
          </div>
        </div>

        {/* Center: Nav Links — hidden below lg */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            className="text-sm font-semibold text-primary border-b-2 border-primary pb-0.5 transition-all duration-200"
            to="/"
          >Home</Link>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Browse</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Sell</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">E-Books</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Categories</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">About</a>
        </div>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-1 shrink-0">
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          </button>
          <Link to="/login">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
            </button>
          </Link>
          {/* Hamburger — only below lg */}
          <button
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-6 py-4 flex flex-col gap-1 shadow-lg">
          {/* Mobile Search */}
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full px-3 py-2 gap-2 mb-3">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline w-full"
              placeholder="Search books, authors"
              type="text"
            />
          </div>
          <Link
            className="text-sm font-semibold text-primary py-3 px-2 border-b border-outline-variant/20"
            to="/"
            onClick={() => setMobileOpen(false)}
          >Home</Link>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Browse</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Sell</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>E-Books</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Categories</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>About</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
