import { GetStaticProps } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, Product } from '../providers/CartDataProvider';
import Head from 'next/head';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cart() {
  const { items, amountOfItems, totalPrice, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItemFromCart } = useContext(CartContext);
  const [buttonText, setButtonText] = useState('Pay now');
  const [screenWidth, setScreenWidth] = useState(768);

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen min-h-mobile-screen lg:min-h-screen bg-gray-300 lg:grid lg:grid-cols-[3fr_2fr] font-['Outfit']">
        <div className="w-full xs:max-h-mobile-screen lg:max-h-screen h-auto bg-white dark:bg-[rgba(55,55,55,1)] pt-20 lg:pt-28 pb-10 px-12 xs:px-20 2xl:px-60 overflow-y-auto">
          <div className="flex flex-row justify-center xs:justify-start">
            <h3 className="text-5xl">Cart</h3>
            <div className="h-full flex justify-center w-1/3 xs:w-1/5 lg:w-1/6 bg-gray-300 ml-5 py-3 text-black rounded-md shadow-2xl">
              {amountOfItems}
              {amountOfItems === 1 ? '_ITEM' : '_ITEMS'}
            </div>
          </div>
          <div className="mt-10">
            {items.map((item: Product) => (
              <div
                key={item.id + item.size}
                className="relative flex items-start justify-start w-full py-7 lg:px-5 border-b-2 text-black dark:text-white animate-appearing"
              >
                <Link href={`/products/${item.id}`}>
                  <a>
                    <div className="bg-white shadow-md">
                      <Image src={item.thumbnailUrl} width={100} height={120} alt={item.title} layout="fixed" objectFit="contain" priority />
                    </div>
                  </a>
                </Link>
                <div className="flex flex-col w-full">
                  <div className="w-full h-full mt-2 ml-5">
                    <Link href={`/products/${item.id}`}>
                      <a className="w-11/12">
                        <p className="text-lg xs:text-2xl">{item.title}</p>
                        <p className="text-sm">size: {item.size}</p>
                      </a>
                    </Link>
                    <span className="absolute right-0 lg:right-5 top-5 cursor-pointer scale-75" onClick={() => handleRemoveItemFromCart(item)}>
                      ❌
                    </span>
                  </div>
                  <div className="flex flex-row-reverse justify-between items-center w-full mt-3">
                    <div className="flex items-center justify-center flex-col">
                      <FontAwesomeIcon className="cursor-pointer" icon={faChevronUp} onClick={() => handleIncrementQuantity(item)} />
                      <p>{item.quantity}</p>
                      <FontAwesomeIcon className="cursor-pointer" icon={faChevronDown} onClick={() => handleDecrementQuantity(item)} />
                    </div>
                    <p className="text-xl text-right ml-5">{item.quantity * item.price}$</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto lg:h-full flex justify-start lg:justify-center flex-col bg-gray-300 text-black pt-10 xs:pt-20 lg:pt-28 pb-10 px-20 2xl:px-36 dark:border-l-2 dark:border-gray-500">
          <h3 className="text-4xl text-center">Complete your order</h3>
          <div className="grid grid-cols-2 mt-10 text-sm lg:text-base">
            <p className="text-left">ITEMS PRICE</p>
            <p className="text-right">{totalPrice}$</p>
          </div>
          <div className="grid grid-cols-2 mt-3 border-b-2 border-gray-200 pb-6 mt-10 text-sm lg:text-base">
            <p className="text-left">SHIPPING</p>
            <p className="text-right">from {totalPrice > 50 ? 0 : 5}$</p>
          </div>
          <div className="grid grid-cols-2 mt-5 mt-10 text-sm lg:text-base">
            <p className="text-left font-bold">TOTAL PRICE</p>
            <p className="text-right">{totalPrice > 50 ? totalPrice : totalPrice + 5}$</p>
          </div>
          {screenWidth > 768 ? (
            <button
              onClick={() => (buttonText.includes('frontend') ? setButtonText('Pay now') : setButtonText("It's only frontend 🤓"))}
              className="bottom-0 left-0 py-2 w-full bg-black text-white mt-10 shadow-xl lg:hover:opacity-75"
              disabled={amountOfItems === 0}
            >
              {buttonText}
            </button>
          ) : null}
        </div>
        {screenWidth < 768 ? (
          <button
            onClick={() => (buttonText.includes('frontend') ? setButtonText('Pay now') : setButtonText("It's only frontend 🤓"))}
            className="sticky bottom-4 mb-8 py-2 w-full bg-black text-white shadow-xl lg:hover:opacity-75"
            disabled={amountOfItems === 0}
          >
            {buttonText}
          </button>
        ) : null}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
