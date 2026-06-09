import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 bg-inverse-surface border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <span className="font-display-lg text-headline-md text-inverse-on-surface">BookShelf</span>
          <p className="font-body-md text-body-md text-surface-variant">© 2024 BookShelf Marketplace. Scholarly Excellence.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Company</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">About</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Careers</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Legal</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Terms of Service</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Support</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Help Center</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
