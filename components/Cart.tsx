import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { faChevronRight, faShoppingBasket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';
import { CartContext, Product } from '../providers/CartDataProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const [products, setProducts] = useState([] as Product[]);
  const { items, totalPrice, amountOfItems, handleRemoveItemFromCart } = useContext(CartContext);

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
              <div key={item.id} className="flex items-center justify-start w-full px-5 py-3 border-b-2 text-black animate-appearing">
                <div className="bg-white shadow-md mr-3 rounded-2xl ">
                  <Image src={item.thumbnailUrl} width={110} height={100} alt={item.title} layout="fixed" objectFit="cover" priority />
                </div>
                <p>{item.title}</p>
                <p>{item.size}</p>
                <p>{item.quantity}</p>
                <p>{item.quantity * item.price}$</p>
                <FontAwesomeIcon onClick={() => handleRemoveItemFromCart(item)} className="ml-2 cursor-pointer" icon={faTrash} />
              </div>
            ))}
          </>
        ) : null}
        {amountOfItems > 0 ? (
          <div className="sticky bottom-0 right-0 w-full bg-black text-sm z-10 p-5 flex items-center justify-around animate-appearing-short">
            <p className="border-b-2 border-black">items: {amountOfItems}</p>
            <p className="border-b-2 border-black">total: {totalPrice}$</p>
            <Link href="#">
              <a className="border-b-2 lg:hover:border-white border-black">
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
