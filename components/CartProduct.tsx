import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { CartContext, Product } from '../providers/CartDataProvider';

export default function CartProduct({ item }: { item: Product }) {
  const { handleRemoveItemFromCart, handleIncrementQuantity, handleDecrementQuantity } = useContext(CartContext);

  return (
    <div className="relative flex items-center justify-start w-full px-5 py-7 border-b-2 text-black dark:text-white animate-appearing">
      <Link href={`/products/${item.id}`}>
        <a>
          <div className="bg-white shadow-md mr-3 rounded-2xl ">
            <Image src={item.thumbnailUrl} width={110} height={100} alt={item.title} layout="fixed" objectFit="cover" priority />
          </div>
        </a>
      </Link>
      <div className="w-full h-full flex flex-row items-center justify-between">
        <Link href={`/products/${item.id}`}>
          <a className="w-2/3">
            <p className="text-xl xs:text-2xl">{item.title}</p>
            <p className="text-sm">size: {item.size}</p>
          </a>
        </Link>
        <div className="flex items-center justify-center flex-col w-1/3">
          <FontAwesomeIcon className="cursor-pointer" icon={faChevronUp} onClick={() => handleIncrementQuantity(item)} />
          <p>{item.quantity}</p>
          <FontAwesomeIcon className="cursor-pointer" icon={faChevronDown} onClick={() => handleDecrementQuantity(item)} />
        </div>
        <p className="text-xl w-1/3 text-right">{item.quantity * item.price}$</p>
        <span className="absolute right-2 top-2 cursor-pointer scale-75" onClick={() => handleRemoveItemFromCart(item)}>
          ❌
        </span>
      </div>
    </div>
  );
}
