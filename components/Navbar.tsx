import React, { useEffect, useState } from 'react';
import { faChevronDown, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import CartWidget from './CartWidget';
import { Popover } from '@headlessui/react';

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(768);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <header className="fixed bg-black w-screen h-10 top-0 flex justify-center items-center font-['Outfit'] text-white z-10">
      <Link href="/">
        <a className="font-bold absolute left-5 z-20">FVRT_STR</a>
      </Link>
      {screenWidth < 768 ? (
        <div className="flex flex-col w-screen">
          <Popover className="relative" as="div">
            <div className="flex items-center justify-center">
              <Popover.Button>
                SHOP <FontAwesomeIcon icon={faChevronDown} />
              </Popover.Button>
            </div>

            <Popover.Panel className="absolute top-8 bg-white w-screen h-auto overflow-y-auto rounded-b-md shadow-lg">
              <div className="text-black text-center flex flex-col w-full bg-white divide-y divide-gray-200">
                <Popover.Button>
                  <Link href="/men" passHref>
                    <div className="w-full py-4">
                      <a>MEN</a>
                    </div>
                  </Link>
                </Popover.Button>
                <Popover.Button>
                  <Link href="/women" passHref>
                    <div className="w-full py-4">
                      <a>WOMEN</a>
                    </div>
                  </Link>
                </Popover.Button>
                <Popover.Button>
                  <Link href="/kids" passHref>
                    <div className="w-full py-4">
                      <a>KIDS</a>
                    </div>
                  </Link>
                </Popover.Button>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      ) : (
        <>
          <Link href="/men">
            <a className="hover:text-orange-400">MEN</a>
          </Link>
          <Link href="/women">
            <a className="hover:text-orange-400 mx-10">WOMEN</a>
          </Link>
          <Link href="/kids">
            <a className="hover:text-orange-400">KIDS</a>
          </Link>
        </>
      )}
      <div className="absolute right-5">
        {theme === 'light' ? (
          <FontAwesomeIcon className="cursor-pointer" icon={faMoon} onClick={() => setTheme('dark')} />
        ) : (
          <FontAwesomeIcon className="cursor-pointer" icon={faSun} onClick={() => setTheme('light')} />
        )}
        <Link href="/signin">
          <a>
            <FontAwesomeIcon className="ml-3 mr-3 cursor-pointer" icon={faUser} />
          </a>
        </Link>
        <CartWidget />
      </div>
    </header>
  );
}
