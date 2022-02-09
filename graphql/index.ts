import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ProductItemQuery, ProductItemQueryVariables, ProductListQuery, ProductListQueryVariables } from './types';

export const client = new ApolloClient({
  uri: 'https://vercel.saleor.cloud/graphql/',
  cache: new InMemoryCache(),
});

const PRODUCT_LIST_QUERY = gql`
  fragment Product1 on Product {
    id
    name
    thumbnail {
      url
    }
    pricing {
      priceRange {
        stop {
          gross {
            amount
          }
        }
      }
    }
  }
  query ProductList {
    products(channel: "default-channel", first: 13) {
      edges {
        node {
          ...Product1
        }
      }
    }
  }
`;

const PRODUCT_ITEM_QUERY = gql`
  fragment Product2 on Product {
    id
    name
    seoDescription
    thumbnail {
      url
    }
    pricing {
      priceRange {
        stop {
          gross {
            amount
          }
        }
      }
    }
  }
  query ProductItem($id: [ID]) {
    products(channel: "default-channel", first: 1, filter: { ids: $id }) {
      edges {
        node {
          ...Product2
        }
      }
    }
  }
`;

export const fetchProducts = () =>
  client.query<ProductListQuery, ProductListQueryVariables>({
    query: PRODUCT_LIST_QUERY,
  });

export const fetchProductById = (id: string) =>
  client.query<ProductItemQuery, ProductItemQueryVariables>({
    query: PRODUCT_ITEM_QUERY,
    variables: { id },
  });
