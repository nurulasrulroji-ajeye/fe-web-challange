import React, { useEffect, useState } from 'react';
import { Dots, Input } from '@/components/atoms';
import { ProductCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/redux/features/products/queries';
import { useDebounce, useInfiniteScroll } from '@/libs/hooks';

const DashboardPage = () => {
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchVal, 500);
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
        total: data?.total || 0,
      }),
    }
  );

  // useEffect(() => {
  //   if (searchVal.length === 0 || searchVal.length > 4) {
  //     debouncedValue;
  //   }
  // }, [debouncedValue, searchVal.length]);

  const { scrollTargetDivRef } = useInfiniteScroll({
    isFetching,
    current_total: products.length,
    total_data: total,
    onLoadMore() {
      setPage(page + 1);
    },
  });

  return (
    <main className="w-full pt-24 max-w-4xl mx-auto lg:pt-32 px-5">
      <h1 className="text-2xl font-semibold">Product List</h1>
      <div className="w-full flex justify-end mt-5">
        <Input
          variant="outline"
          size_variant="base"
          color="primary"
          placeholder="search..."
          className="md:max-w-xs px-4 "
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <section className="w-full grid grid-cols-2 gap-2 py-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <React.Fragment key={idx}>
            <ProductCard data={product} />
          </React.Fragment>
        ))}
      </section>
      <div className="py-4" ref={scrollTargetDivRef}>
        {isFetching ? <Dots size="base" color="black" /> : null}
      </div>
    </main>
  );
};

export default DashboardPage;
