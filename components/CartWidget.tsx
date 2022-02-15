import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { faChevronRight, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';
import { CartContext, Product } from '../providers/CartDataProvider';
import Link from 'next/link';
import CartProduct from './CartProduct';

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

      <Popover.Panel className="absolute top-8 right-[-1.2rem] font-['Outfit'] bg-white dark:bg-[rgba(55,55,55,1)] dark:shadow-dark shadow-2xl w-screen xs:w-[50vw] lg:w-[30vw] h-auto max-h-[80vh] overflow-y-auto rounded-b-md xs:rounded-br-none origin-top animate-slide-down">
        {products.length > 0 ? (
          <>
            {products.map((item: Product) => (
              <CartProduct key={item.id + item.size} item={item} />
            ))}
          </>
        ) : null}
        {amountOfItems > 0 ? (
          <div className="sticky bottom-0 right-0 w-full bg-black text-sm z-10 p-5 flex items-center justify-around animate-appearing-short">
            <p className="border-b-2 border-black w-1/3 text-center">items: {amountOfItems}</p>
            <p className="border-b-2 border-black w-1/3 text-center">total: {totalPrice}$</p>
            <Popover.Button>
              <Link href="/cart">
                <a className="border-b-2 lg:hover:border-white border-black w-1/3 text-center">
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
