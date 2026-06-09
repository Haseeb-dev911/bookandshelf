// ─── PLP Feature Public API ────────────────────────────────────────────────────
// Import from this index to keep consumers decoupled from internal file paths.

export { PLPPage } from "./pages/PLPPage";
export { PLPBookCard } from "./components/PLPBookCard";
export { PLPFilterBar } from "./components/PLPFilterBar";
export { usePLPListings, usePLPCategories } from "./queries/plp.queries";
export { useInfiniteScroll } from "./hooks/useInfiniteScroll";
export type { PLPFilters, BookListing, PLPCategory, SortOption } from "./types/plp.types";
