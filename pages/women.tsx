import { OrderDirection, Product1Fragment } from '../graphql/types';
import Head from 'next/head';
import Product from '../components/Product';
import { GetStaticProps } from 'next';
import { fetchProducts } from '../graphql';
import React from 'react';

type Props = {
  products: Product1Fragment[];
};

export default function Women({ products }: Props) {
  return (
    <>
      <Head>
        <title>Shop women!</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="min-h-screen h-auto w-screen flex justify-center items-center flex-col p-20 dark:bg-[rgba(55,55,55,1)]">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mt-8 text-center border-b-2 border-orange-400 pb-7 lg:w-2/3">SHOP WOMEN</h1>
        <div className="flex items-center justify-center flex-row flex-wrap mt-12 2xl:w-4/5">
          {products.map(({ id, name, thumbnail, pricing }) => (
            <div key={id}>
              <Product id={id} name={name} price={pricing?.priceRange?.stop?.gross.amount || 10} thumbnailUrl={thumbnail?.url || ''} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await fetchProducts(10, OrderDirection.Desc);
  const mappedData = data.data.products?.edges.map(({ node }) => node) || [];

  return {
    props: {
      products: mappedData,
    },
  };
};
