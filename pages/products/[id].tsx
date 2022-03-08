import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getAllProductsIds, getProductById } from '../../lib/products';
import { Product2Fragment } from '../../graphql/types';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CartContext, Product as ProductToAdd } from '../../providers/CartDataProvider';

type Props = {
  productData: Product2Fragment;
};

interface ParamsProps extends ParsedUrlQuery {
  id: string;
}

export default function Product({ productData }: Props) {
  const [selected, setSelected] = useState('');
  const router = useRouter();
  const { handleAddItemToCart } = useContext(CartContext);

  const handleAddToCart = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const productToAdd: ProductToAdd = {
      id: productData.id,
      title: productData.name,
      price: productData.pricing?.priceRange?.stop?.gross.amount || 10,
      size: selected,
      quantity: 1,
      thumbnailUrl: productData.thumbnail?.url || '',
    };

    handleAddItemToCart(productToAdd, selected);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.id);

  return (
    <>
      <Head>
        <title>{productData.name}</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen min-h-mobile-screen lg:min-h-screen h-auto flex items-center justify-center flex-col dark:bg-[rgba(55,55,55,1)]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 h-full w-full p-16 xs:p-20 lg:mx-10 mt-20 lg:mt-10 animate-appearing">
          <div className="w-full h-full flex items-start lg:items-center justify-center">
            <div className="relative bg-white h-72 xs:h-[26rem] w-full lg:h-full lg:w-4/5 shadow-2xl dark:shadow-dark mb-3 transform rounded-2xl touch-pinch-zoom">
              <Image src={productData.thumbnail?.url || ''} alt={productData.name} layout="fill" objectFit="cover" priority />
            </div>
          </div>
          <div className="lg:relative flex items-start justify-start flex-col w-full h-full pt-10 xs:p-10">
            <div
              onClick={() => router.back()}
              className="absolute flex items-center justify-center top-16 xs:top-20 lg:top-[-2rem] mb-10 text-sm text-white bg-black py-3 px-10 rounded-xl shadow-2xl border-2 border-black focus:border-orange-400 cursor-pointer"
            >
              <FontAwesomeIcon className="mr-2 scale-90" icon={faChevronLeft} />
              GO BACK
            </div>
            <h3 className="text-3xl font-thin border-b-2 xs:w-1/2 text-left pb-2">{productData.name}</h3>
            <h2 className="text-5xl font-normal my-5 font-['Outfit']">{productData.pricing?.priceRange?.stop?.gross.amount || 10} $</h2>
            <p className="font-['Outfit']">{productData.seoDescription ? productData.seoDescription : 'Enjoy best quality!'}</p>
            <form className="flex flex-col justify-between w-full lg:w-1/2" onSubmit={handleAddToCart}>
              <div className="flex flex-row justify-between xs:justify-around lg:justify-between xs:gap-0 lg:gap-16 my-10 xs:mt-16 xs:mb-0 lg:my-10 text-white">
                <div>
                  <input type="radio" name="sizes" id="S" checked={selected === 'S'} onChange={handleInputChange} className="peer" hidden />
                  <label
                    htmlFor="S"
                    className="w-16 h-16 xs:w-16 xs:h-16 bg-black text-xl xs:text-2xl flex items-center justify-center rounded-xl border-2 border-black cursor-pointer peer-checked:border-orange-400"
                  >
                    S
                  </label>
                </div>
                <div>
                  <input type="radio" name="sizes" id="M" checked={selected === 'M'} onChange={handleInputChange} className="peer" hidden />
                  <label
                    htmlFor="M"
                    className="w-16 h-16 xs:w-16 xs:h-16 bg-black text-xl xs:text-2xl flex items-center justify-center rounded-xl border-2 border-black cursor-pointer peer-checked:border-orange-400"
                  >
                    M
                  </label>
                </div>
                <div>
                  <input type="radio" name="sizes" id="L" checked={selected === 'L'} onChange={handleInputChange} className="peer" hidden />
                  <label
                    htmlFor="L"
                    className="w-16 h-16 xs:w-16 xs:h-16 bg-black text-xl xs:text-2xl flex items-center justify-center rounded-xl border-2 border-black cursor-pointer peer-checked:border-orange-400"
                  >
                    L
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-orange-400 w-full p-4 flex items-center justify-center shadow rounded-lg text-white text-2xl lg:hover:bg-orange-300 xs:mt-10 font-['Outfit']"
              >
                ADD TO CART
                <FontAwesomeIcon className="ml-3" icon={faShoppingBasket} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
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
