import { fetchProductById, fetchProducts } from '../graphql';
import { OrderDirection } from '../graphql/types';

export const getAllProductsIds = async () => {
  const data = await fetchProducts(13, OrderDirection.Asc);
  const products = data.data.products?.edges.map(({ node }) => node) || [];

  return products.map(({ id }) => {
    return {
      params: {
        id,
      },
    };
  });
};

export const getProductById = async (id: string) => {
  const product = await fetchProductById(id);

  return product?.data?.products?.edges[0].node;
};
