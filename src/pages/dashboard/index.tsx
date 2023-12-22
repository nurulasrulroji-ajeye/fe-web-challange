import React, { useCallback, useEffect, useState } from 'react';
import { Dots, Input } from '@/components/atoms';
import { ProductCard } from '@/components/organisms';
import { useGetProductsQuery } from '@/redux/features/products/queries';
import { useDebounce, useInfiniteScroll } from '@/libs/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { FilmServices } from '@/domain/services/film-services';
import { People } from '@/types/people';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [peopleData, setPeopleData] = useState<People[]>([]);
  // const { data, loading, total } = useAppSelector((state) => state.product.products);
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
        total: data?.total || 0,
      }),
    }
  );

  // const loadAllProduct = useCallback(async () => {
  //   await dispatch(fetchAllProduct({ limit: 12, skip: page, search: '' }));
  // }, [dispatch, page]);

  // useEffect(() => {
  //   loadAllProduct();
  // }, [loadAllProduct]);

  const { scrollTargetDivRef } = useInfiniteScroll({
    isLoadMoreRule: !isFetching && products.length !== total,
    onLoadMore() {
      setPage(page + 1);
    },
  });

  const fetchAllPeople = useCallback(async () => {
    const peopleServices = new FilmServices();
    try {
      const response = await peopleServices.getAllFilm();
      setPeopleData(response.results);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchAllPeople();
  }, [fetchAllPeople]);

  return (
    <main className="w-full pt-24 max-w-4xl mx-auto lg:pt-32 px-5">
      <h1 className="text-2xl font-semibold">Product List</h1>
      {/* <section className="w-full grid grid-cols-2 gap-2 py-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <React.Fragment key={idx}>
            <ProductCard data={product} />
          </React.Fragment>
        ))}
      </section> */}
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {peopleData.map((people, idx) => (
            <tr key={idx}>
              <td>{people.name}</td>
              <td>{people.height}</td>
              <td>{people.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="py-4" ref={scrollTargetDivRef}>
        {isFetching ? <Dots size="base" color="black" /> : null}
      </div> */}
    </main>
  );
};

export default DashboardPage;
