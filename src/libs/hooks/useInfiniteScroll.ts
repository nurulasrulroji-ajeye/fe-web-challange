import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  isLoadMoreRule: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({ onLoadMore, isLoadMoreRule }: InfiniteScrollProps) {
  const scrollTargetDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let target = entries[0];
        if (target.isIntersecting && isLoadMoreRule) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (scrollTargetDivRef.current) {
      observer.observe(scrollTargetDivRef.current);
    }

    return () => {
      if (scrollTargetDivRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(scrollTargetDivRef.current);
      }
    };
  }, [scrollTargetDivRef, onLoadMore, isLoadMoreRule]);

  return {
    scrollTargetDivRef
  }
}
