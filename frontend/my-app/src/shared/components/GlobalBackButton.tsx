import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button 
      onClick={() => navigate(-1)}
      className="fixed top-8 left-4 z-50 flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md text-gray-700 hover:text-black hover:bg-gray-50 transition-all active:scale-95 group"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
    </button>
  );
}
