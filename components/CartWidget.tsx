import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { faChevronDown, faChevronRight, faChevronUp, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';
import { CartContext, Product } from '../providers/CartDataProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function CartWidget() {
  const [products, setProducts] = useState([] as Product[]);
  const { items, totalPrice, amountOfItems, handleRemoveItemFromCart, handleIncrementQuantity, handleDecrementQuantity } = useContext(CartContext);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  return (
    <Popover as="span">
      <Popover.Button className="relative">
        {products.length > 0 ? <span className="w-2 h-2 rounded-full bg-red-600 absolute top-[0.05rem] right-[-0.2rem]" /> : null}
        <FontAwesomeIcon icon={faShoppingBasket} />
      </Popover.Button>

      <Popover.Panel className="absolute top-8 right-[-1.2rem] font-['Outfit'] bg-white shadow-2xl w-screen xs:w-[50vw] lg:w-[30vw] h-auto max-h-[80vh] overflow-y-auto rounded-b-md xs:rounded-br-none origin-top animate-slide-down">
        {products.length > 0 ? (
          <>
            {products.map((item: Product) => (
              <div key={item.id} className="relative flex items-center justify-start w-full px-5 py-3 border-b-2 text-black animate-appearing">
                <div className="bg-white shadow-md mr-3 rounded-2xl ">
                  <Image src={item.thumbnailUrl} width={110} height={100} alt={item.title} layout="fixed" objectFit="cover" priority />
                </div>
                <div className="w-full h-full flex flex-row items-center justify-between">
                  <div className="w-2/3">
                    <p className="text-xl xs:text-2xl">{item.title}</p>
                    <p className="text-sm">size: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-center flex-col w-1/3">
                    <FontAwesomeIcon className="cursor-pointer" icon={faChevronUp} onClick={() => handleIncrementQuantity(item)} />
                    <p>{item.quantity}</p>
                    <FontAwesomeIcon className="cursor-pointer" icon={faChevronDown} onClick={() => handleDecrementQuantity(item)} />
                  </div>
                  <p className="text-xl w-1/3 text-right">{item.quantity * item.price}$</p>
                  <span className="absolute right-2 top-2 cursor-pointer" onClick={() => handleRemoveItemFromCart(item)}>
                    ✖️
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : null}
        {amountOfItems > 0 ? (
          <div className="sticky bottom-0 right-0 w-full bg-black text-sm z-10 p-5 flex items-center justify-around animate-appearing-short">
            <p className="border-b-2 border-black w-1/3 text-center">items: {amountOfItems}</p>
            <p className="border-b-2 border-black w-1/3 text-center">total: {totalPrice}$</p>
            <Link href="#">
              <a className="border-b-2 lg:hover:border-white border-black w-1/3 text-center">
                CHECKOUT
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
          </div>
        ) : null}
      </Popover.Panel>
    </Popover>
  );
}
