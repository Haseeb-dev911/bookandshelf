import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a sentinel element.
 * When that element enters the viewport, `onIntersect` is called.
 *
 * Usage:
 *   const sentinelRef = useInfiniteScroll({ onIntersect: fetchNextPage, enabled: hasNextPage });
 *   <div ref={sentinelRef} />
 */
export const useInfiniteScroll = ({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px 0px 200px 0px", // trigger 200px before the bottom
}: {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect, threshold, rootMargin]);

  return ref;
};
