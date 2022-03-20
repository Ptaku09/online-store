import Image from 'next/image';
import GitHub from '../assets/github-brands.svg';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Footer() {
  const { status } = useSession();

  return (
    <div className="relative z-[2] w-screen flex justify-center bg-black">
      <div className="flex items-center md:items-start md:grid md:grid-cols-2 w-screen 2xl:w-2/3 bg-black py-8 pl-12 md:px-16 md:px-32 font-['Outfit'] text-white">
        <div className="w-full h-full md:h-[30vh] flex items-start justify-between flex-col">
          <div className="w-2/3 md:w-1/3">
            <h5 className="font-serif md:px-2 font-bold text-lg border-b-2 mb-4">FVRT_STR</h5>
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
            {[
              { title: 'About us', href: '/information#about' },
              { title: 'Delivery', href: '/information#delivery' },
              { title: 'Returns and exchanges', href: '/information#returns' },
              { title: 'Payments', href: '/information#payments' },
              { title: 'Size guide', href: '/information#size' },
            ].map(({ title, href }: { title: string; href: string }) => (
              <div key={title}>
                <Link href={href}>
                  <a className="lg:hover:border-b-[1px] lg:border-b-white">{title}</a>
                </Link>
                <br />
              </div>
            ))}
          </div>
          <div className="text-sm">
            <h5 className="mt-4 md:mt-0 md:mb-4">MY ACCOUNT</h5>
            {[
              { title: 'Orders', storageName: 'orders' },
              { title: 'Returns', storageName: 'returns' },
              { title: 'Account information', storageName: 'info' },
              { title: 'Delete account', storageName: 'delete' },
            ].map(({ title, storageName }: { title: string; storageName: string }) => (
              <div key={title} onClick={() => (status === 'authenticated' ? sessionStorage.setItem('user-menu-cart', storageName) : null)}>
                <Link href="/user">
                  <a className="lg:hover:border-b-[1px] lg:border-b-white">{title}</a>
                </Link>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
