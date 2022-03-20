import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { faChevronDown, faChevronRight, faChevronUp, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';
import { CartContext, Product } from '../providers/CartDataProvider';
import Link from 'next/link';
import Image from 'next/image';

export default function CartWidget() {
  const [products, setProducts] = useState([] as Product[]);
  const { items, totalPrice, amountOfItems, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItemFromCart } = useContext(CartContext);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  return (
    <Popover as="span">
      <Popover.Button className="relative">
        {products.length > 0 ? <span className="w-2 h-2 rounded-full bg-red-600 absolute top-[0.05rem] right-[-0.2rem]" /> : null}
        <FontAwesomeIcon icon={faShoppingBasket} />
      </Popover.Button>

      <Popover.Panel className="absolute top-8 right-[-1.2rem] font-['Outfit'] bg-white dark:bg-[rgba(55,55,55,1)] dark:shadow-dark shadow-2xl w-screen xs:w-[50vw] md:w-[30vw] h-auto max-h-[80vh] overflow-y-auto rounded-b-md xs:rounded-br-none origin-top animate-slide-down">
        {products.length > 0 ? (
          <>
            {products.map((item: Product) => (
              <div
                key={item.id + item.size}
                className="relative flex items-start justify-start w-full py-7 px-5 border-b-2 text-black dark:text-white animate-appearing"
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
                    <span className="absolute right-5 top-5 cursor-pointer scale-75" onClick={() => handleRemoveItemFromCart(item)}>
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
          </>
        ) : null}
        {amountOfItems > 0 ? (
          <div className="sticky bottom-0 right-0 w-full bg-black text-sm z-10 p-5 flex items-center justify-around animate-appearing-short">
            <p className="border-b-2 border-black w-1/3 text-center">items: {amountOfItems}</p>
            <p className="border-b-2 border-black w-1/3 text-center">total: {totalPrice}$</p>
            <Popover.Button className="w-1/3">
              <Link href="/cart">
                <a className="border-b-2 lg:hover:border-white border-black text-center">
                  CHECKOUT
                  <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
                </a>
              </Link>
            </Popover.Button>
          </div>
        ) : null}
      </Popover.Panel>
    </Popover>
  );
}
