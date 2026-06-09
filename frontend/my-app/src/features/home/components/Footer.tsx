import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#fbf9f4] border-t border-slate-200/40 text-slate-800 pt-24 pb-12 overflow-hidden select-none">

      {/* 1. Top Edge Blur & Linear Gradient Transition */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none backdrop-blur-[1px] z-10" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 z-10 flex flex-col justify-between min-h-[320px]">

        {/* Top Content Row: Navigation Mapping */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16">
          <div className="max-w-xs">
            <h3 className="font-playfair font-bold text-xl text-slate-900 tracking-tight mb-3">
              Bookshelf
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Preserving the tactile history of every page, one collection at a time.
            </p>
          </div>

          {/* Clean Utilities Navigation Grid */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              About Us <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              Shipping <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              Privacy <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              Terms <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              Contact <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
            <a className="inline-flex items-center gap-0.5 hover:text-slate-900 transition-colors group" href="#">
              FAQ <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
            </a>
          </nav>
        </div>

        {/* Bottom Content Row: Matching Your Uploaded Screenshot Layout */}
        <div className="mt-auto pt-8 border-t border-slate-200/60 flex flex-row items-end justify-between gap-4">

          {/* Bottom Left: Meta Info */}
          <div className="flex flex-col gap-1 text-left">
            <span className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-900 inline-block" /> Bookshelf
            </span>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">
              © 2026 Bookshelf Inc. 
            </p>
          </div>

        
        </div>
      </div>

      {/* 2. Giant Watermark Backdrop Layer */}
      <div className="absolute bottom-[-3%] left-1/2 -translate-x-1/2 text-[14vw] font-playfair font-bold text-slate-900/[0.050] select-none pointer-events-none tracking-tight whitespace-nowrap z-0 leading-none blur-[1.5px]">
        Book&Shelf
      </div>

    </footer>
  );
};