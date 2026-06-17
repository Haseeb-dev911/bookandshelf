import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import type { PLPCategory, PLPFilters, SortOption } from "../types/plp.types";

interface PLPFilterBarProps {
  filters: PLPFilters;
  categories: PLPCategory[];
  onFilterChange: (key: keyof PLPFilters, value: string) => void;
}

const CONDITIONS = [
  { value: "",     label: "All Conditions" },
  { value: "new",  label: "New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];

const TYPES = [
  { value: "all", label: "All Types" },
  { value: "ebook", label: "E-Books" },
  { value: "physical", label: "Physical Books" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",     label: "Recently Added" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const selectClass =
  "bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer";

export const PLPFilterBar = ({ filters, categories, onFilterChange }: PLPFilterBarProps) => {
  return (
    <div
      id="plp-filter-bar"
      className="sticky top-[72px] z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-sm"
    >
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">

        <div className="flex items-center gap-4 flex-wrap">

          {/* ── Category filter ── */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-slate-700">Category:</span>
            <select
              id="filter-category"
              value={filters.categoryId}
              onChange={(e) => onFilterChange("categoryId", e.target.value)}
              className={`${selectClass} min-w-[150px]`}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* ── Type filter ── */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">Type:</span>
            <select
              id="filter-type"
              value={filters.type || "all"}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className={`${selectClass} min-w-[140px]`}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── Condition filter ── */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">Condition:</span>
            <select
              id="filter-condition"
              value={filters.condition}
              onChange={(e) => onFilterChange("condition", e.target.value)}
              className={`${selectClass} min-w-[140px]`}
            >
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Sort ── */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-700">Sort:</span>
          <select
            id="filter-sort"
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value as SortOption)}
            className={`${selectClass} min-w-[170px]`}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};
