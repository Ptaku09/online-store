import { GetStaticProps } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, Product } from '../providers/CartDataProvider';
import CartProduct from '../components/CartProduct';

export default function Cart() {
  const { items, amountOfItems, totalPrice } = useContext(CartContext);
  const [buttonText, setButtonText] = useState('Pay now');
  const [screenWidth, setScreenWidth] = useState(768);

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <div className="w-screen min-h-mobile-screen lg:min-h-screen bg-gray-300 xs:grid xs:grid-cols-[3fr_2fr] font-['Outfit']">
      <div className="w-full xs:max-h-mobile-screen lg:max-h-screen h-auto bg-white dark:bg-[rgba(55,55,55,1)] pt-20 lg:pt-28 pb-10 px-10 xs:px-20 2xl:px-60 overflow-y-auto">
        <div className="flex flex-row justify-center xs:justify-start">
          <h3 className="text-5xl">Cart</h3>
          <div className="h-full flex justify-center w-1/3 lg:w-1/6 bg-gray-300 ml-5 py-3 text-black rounded-md shadow-2xl">
            {amountOfItems}
            {amountOfItems === 1 ? '_ITEM' : '_ITEMS'}
          </div>
        </div>
        <div className="mt-10 rounded-t-md shadow-2xl dark:shadow-dark">
          {items.map((item: Product) => (
            <CartProduct key={item.id + item.size} item={item} />
          ))}
        </div>
      </div>
      <div className="w-full h-auto lg:h-full flex justify-start lg:justify-center flex-col bg-gray-300 text-black pt-10 xs:pt-20 lg:pt-28 pb-10 px-20 2xl:px-28 dark:border-l-2 dark:border-gray-500">
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
        {screenWidth > 475 ? (
          <button
            onClick={() => (buttonText.includes('frontend') ? setButtonText('Pay now') : setButtonText("It's only frontend 🤓"))}
            className="bottom-0 left-0 py-2 w-full bg-black text-white mt-10 shadow-xl lg:hover:opacity-75"
          >
            {buttonText}
          </button>
        ) : null}
      </div>
      {screenWidth < 475 ? (
        <button
          onClick={() => (buttonText.includes('frontend') ? setButtonText('Pay now') : setButtonText("It's only frontend 🤓"))}
          className="sticky bottom-4 mb-8 py-2 w-full bg-black text-white shadow-xl lg:hover:opacity-75"
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
