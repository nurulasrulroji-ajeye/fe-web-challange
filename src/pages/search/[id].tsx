import { Dots } from '@/components/atoms';
import { ProductCard } from '@/components/organisms';
import { useInfiniteScroll } from '@/libs/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { fetchAllProduct } from '@/redux/features/products/action';
import { useGetSearchProductsQuery } from '@/redux/features/products/queries';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const SearchPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const { data, loading, total } = useAppSelector((state) => state.product.products);
  const search_text = query.id ? (query.id as string) : '';
  // const { data } = useGetSearchProductsQuery(
  //   { page: 0, search: search_text },
  //   { skip: search_text === '' }
  // );
  const loadAllProduct = useCallback(async () => {
    await dispatch(fetchAllProduct({ limit: 12, skip: page, search: search_text }));
  }, [dispatch, page, search_text]);

  useEffect(() => {
    loadAllProduct();
  }, [loadAllProduct]);

  const { scrollTargetDivRef } = useInfiniteScroll({
    isLoadMoreRule: !loading && data.length !== total,
    onLoadMore() {
      if (data.length !== 0) {
        setPage(page + 1);
      }
    },
  });
  useEffect(() => {
    console.log('hay query', data, data.length, total);
  }, [data, total]);
  return (
    <main className="w-full pt-24 max-w-4xl mx-auto lg:pt-32 px-5">
      <h1 className="text-2xl font-semibold">Product List</h1>
      <section className="w-full grid grid-cols-2 gap-2 py-6 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product, idx) => (
          <React.Fragment key={idx}>
            <ProductCard data={product} />
          </React.Fragment>
        ))}
      </section>
      <div className="py-4" ref={scrollTargetDivRef}>
        {loading ? <Dots size="base" color="black" /> : null}
      </div>
    </main>
  );
};

export default SearchPage;
