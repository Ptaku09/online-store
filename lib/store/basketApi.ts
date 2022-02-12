import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface Product {
  title: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
}

type Props = {
  product: Product;
};

export const basketApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/basket/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Basket'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ products: Props[] }, string>({
      query: () => '',
      providesTags: ['Basket'],
    }),

    addProduct: builder.mutation({
      query: (body: Props) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Basket'],
    }),

    removeProduct: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: '',
        method: 'DELETE',
      }),
      invalidatesTags: ['Basket'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  util: { getRunningOperationPromises },
} = basketApi;

export const { getAllProducts } = basketApi.endpoints;
