import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Orders() {
  return (
    <div className="w-full h-auto min-h-full flex flex-col items-center justify-start animate-appearing-short">
      <h1 className="text-5xl text-center">Orders</h1>
      <div className="mt-16 flex flex-col items-center justify-center">
        <p className="pb-3 px-6 border-b-[1px] text-center border-black dark:border-white">Here will be displayed your future orders!</p>
        <div className="w-full xs:w-1/2 mt-12 text-white text-lg flex flex-col items-center justify-center">
          <Link href="/men">
            <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl lg:dark:shadow-dark">
              MEN
              <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
            </a>
          </Link>
          <Link href="/women">
            <a className="w-full px-8 py-3 my-8 bg-black lg:hover:bg-gray-800 text-center shadow-xl lg:dark:shadow-dark">
              WOMEN
              <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
            </a>
          </Link>
          <Link href="/kids">
            <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl lg:dark:shadow-dark">
              KIDS
              <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
