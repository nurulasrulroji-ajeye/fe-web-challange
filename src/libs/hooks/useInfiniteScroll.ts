import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  isFetching: boolean,
  total_data: number,
  current_total: number,
  onLoadMore: () => void
}

export function useInfiniteScroll({ current_total, isFetching, onLoadMore, total_data }: InfiniteScrollProps) {
  const scrollTargetDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let target = entries[0];
        if (target.isIntersecting && !isFetching && current_total !== total_data) {
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
  }, [isFetching, scrollTargetDivRef, current_total, total_data, onLoadMore]);

  return {
    scrollTargetDivRef
  }
}