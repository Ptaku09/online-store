import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';

interface Product {
  id: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  thumbnailUrl: string;
}

type Props = {
  product: Product;
};

export default function Basket() {
  const [products, setProducts] = useState([] as Props[]);

  return (
    <Popover as="span">
      <Popover.Button className="relative">
        {products.length > 0 ? <span className="w-2 h-2 rounded-full bg-red-600 absolute top-[0.05rem] right-[-0.2rem]" /> : null}
        <FontAwesomeIcon icon={faShoppingBasket} />
      </Popover.Button>

      <Popover.Panel className="absolute top-8 right-[-1.2rem] bg-white w-screen xs:w-[50vw] lg:w-[30vw] h-auto max-h-[50vh] overflow-y-auto rounded-b-md xs:rounded-br-none animate-appearing">
        <div className="flex items-start flex-col gap-6 text-black divide-y-2">
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
