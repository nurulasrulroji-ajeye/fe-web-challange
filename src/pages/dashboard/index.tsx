import { Dots } from '@/components/atoms';
import { ProductCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/redux/features/products/queries';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const DashboardPage = () => {
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const {
    products = [],
    isFetching,
    total,
  } = useGetProductsQuery(
    { page: page, search: '' },
    {
      selectFromResult: ({ data, isFetching }) => ({
        products: data?.products,
        isFetching,
        total: data?.total,
      }),
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let target = entries[0];
        if (target.isIntersecting && !isFetching && products.length !== total) {
          setPage(page + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isFetching, observerTarget, page, products.length, total]);

  return (
    <main className="w-full pt-24 max-w-4xl mx-auto lg:pt-32 px-5">
      <title>jsadhj</title>
      <h1 className="text-2xl font-semibold">Product List</h1>
      <section className="w-full grid grid-cols-2 gap-2 py-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <React.Fragment key={idx}>
            <ProductCard data={product} />
          </React.Fragment>
        ))}
      </section>
      <div className="py-4" ref={observerTarget}>
        {isFetching ? <Dots size="base" color="black" /> : null}
      </div>
    </main>
  );
};

export default DashboardPage;
