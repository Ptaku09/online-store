import Image from 'next/image';
import GitHub from '../assets/github-brands.svg';
import React from 'react';

export default function Footer() {
  return (
    <div className="w-screen flex justify-center bg-black">
      <div className="flex items-center md:items-start md:grid md:grid-cols-2 w-screen 2xl:w-2/3 bg-black py-8 pl-12 md:px-16 lg:px-32 font-['Outfit'] text-white">
        <div className="w-full h-full md:h-[30vh] flex items-start justify-between flex-col">
          <div className="w-2/3 md:w-1/3">
            <h5 className="font-serif lg:px-2 font-bold text-lg border-b-2 mb-4">FVRT_STR</h5>
            <p className="text-sm mb-8 md:mb-0">Enjoy premium quality and be greater every day!</p>
          </div>
          <div className="opacity-50 flex flex-row items-center">
            <p className="text-xs">Copyright 2022 Ptaku09</p>
            <a className="ml-1 translate-y-px" href="https://github.com/Ptaku09" rel="noreferrer" target="_blank">
              <Image src={GitHub.src} width={15} height={15} alt="GitHub" />
            </a>
          </div>
        </div>
        <div className="w-full md:grid md:grid-cols-2">
          <div className="text-sm">
            <h5 className="md:mb-4">INFORMATION</h5>
            <p>About us</p>
            <p>Delivery</p>
            <p>Returns and exchanges</p>
            <p>Payments</p>
            <p className="mb-4 md:mb-0">Size guide</p>
          </div>
          <div className="text-sm">
            <h5 className="md:mb-4">MY ACCOUNT</h5>
            <p>Orders</p>
            <p>Returns</p>
            <p>Account information</p>
            <p>Delete account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
