import { TProducts } from "@/domain/entities";
import { ProductServices } from "@/domain/services/product-services";
import { IResponseProaduct } from "@/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productServices = new ProductServices()

export const productQueries = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  reducerPath: "products",
  endpoints: (build) => ({
    getProducts: build.query<IResponseProaduct<TProducts[]>, { page: number; search: string }>({
      queryFn: async (params) => {
        const { search, page } = params;
        const response = await productServices.getAllProduct({ limit: 12, search, skip: page * 12 })
        return {
          data: response,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.products.push(...newItems.products)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    })
  }),
})

export const { useGetProductsQuery } = productQueries