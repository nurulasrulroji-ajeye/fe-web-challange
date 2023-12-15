import { ProductCard } from '@/components/organisms';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { fetchAllProduct } from '@/redux/features/products/action';
import React, { useEffect } from 'react';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(fetchAllProduct({ limit: 10, skip: 0, search: '' }));
  }, [dispatch]);

  return (
    <main className="w-full pt-24 max-w-4xl mx-auto lg:pt-32 px-5">
      <h1 className="text-2xl font-semibold">Product List</h1>
      <section className="w-full grid grid-cols-2 gap-2 py-6 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <ProductCard key={product.id} data={product} loading={loading} />
        ))}
      </section>
    </main>
  );
};

export default DashboardPage;
