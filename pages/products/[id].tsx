import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getAllProductsIds, getProductById } from '../../lib/products';
import { Product2Fragment } from '../../graphql/types';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

type Props = {
  productData: Product2Fragment;
};

interface ParamsProps extends ParsedUrlQuery {
  id: string;
}

export default function Product({ productData }: Props) {
  const [selected, setSelected] = useState('');

  const handleAddToCart = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (selected !== '') console.log('added: ', selected);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.id);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col dark:bg-[rgba(55,55,55,1)]">
      <div className="grid grid-cols-2 gap-10 h-full w-full p-20 mx-10 mt-10 animate-appearing">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative bg-white h-full w-4/5 shadow-2xl dark:shadow-dark mb-3 transform rounded-2xl">
            <Image src={productData.thumbnail?.url || ''} alt={productData.name} layout="fill" objectFit="cover" priority />
          </div>
        </div>
        <div className="flex items-start justify-start flex-col w-full h-full p-10">
          <h3 className="text-3xl font-thin border-b-2 w-1/2 text-left pb-2">{productData.name}</h3>
          <h2 className="text-5xl font-normal my-5 font-['Outfit']">{productData.pricing?.priceRange?.stop?.gross.amount || 10} $</h2>
          <p className="font-['Outfit']">{productData.seoDescription ? productData.seoDescription : 'Enjoy best quality!'}</p>
          <form className="flex flex-col justify-between" onSubmit={handleAddToCart}>
            <div className="flex flex-row gap-16 my-10 text-white">
              <div>
                <input type="radio" name="sizes" id="S" checked={selected === 'S'} onChange={handleInputChange} className="peer" hidden />
                <label
                  htmlFor="S"
                  className="w-16 h-16 bg-black text-2xl flex items-center justify-center rounded-xl border-4 border-black cursor-pointer peer-checked:border-orange-400"
                >
                  S
                </label>
              </div>
              <div>
                <input type="radio" name="sizes" id="M" checked={selected === 'M'} onChange={handleInputChange} className="peer" hidden />
                <label
                  htmlFor="M"
                  className="w-16 h-16 bg-black text-2xl flex items-center justify-center rounded-xl border-4 border-black cursor-pointer peer-checked:border-orange-400"
                >
                  M
                </label>
              </div>
              <div>
                <input type="radio" name="sizes" id="L" checked={selected === 'L'} onChange={handleInputChange} className="peer" hidden />
                <label
                  htmlFor="L"
                  className="w-16 h-16 bg-black text-2xl flex items-center justify-center rounded-xl border-4 border-black cursor-pointer peer-checked:border-orange-400"
                >
                  L
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-400 w-full p-4 flex items-center justify-center shadow rounded-lg text-white text-2xl lg:hover:bg-orange-300 mt-10 font-['Outfit']"
            >
              ADD TO CART
              <FontAwesomeIcon className="cursor-pointer ml-3" icon={faShoppingBasket} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProductsIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as ParamsProps;
  const productData = await getProductById(id);

  return {
    props: {
      productData,
    },
  };
};
