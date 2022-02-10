import React, { useEffect, useState } from 'react';
import { faChevronDown, faMoon, faShoppingBasket, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(768);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <header className="absolute bg-black w-screen h-10 top-0 flex justify-center items-center font-['Outfit'] text-white z-10">
      <Link href="/">
        <a className="font-bold absolute left-5">FVRT_STR</a>
      </Link>
      {screenWidth < 768 ? (
        <div className="flex flex-col w-screen">
          <Menu as="div">
            <div className="flex items-center justify-center">
              <Menu.Button className="py-2 text-white">
                SHOP <FontAwesomeIcon icon={faChevronDown} />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute text-black text-center w-full bg-white divide-y divide-gray-200 rounded-b-md shadow-lg">
              <div className="py-4">
                <Menu.Item>
                  <Link href="/men">
                    <a>MEN</a>
                  </Link>
                </Menu.Item>
              </div>
              <div className="py-4">
                <Menu.Item>
                  <Link href="/women">
                    <a>WOMEN</a>
                  </Link>
                </Menu.Item>
              </div>
              <div className="py-4">
                <Menu.Item>
                  <Link href="/kids">
                    <a>KIDS</a>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
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
        <FontAwesomeIcon className="ml-3 mr-3 cursor-pointer" icon={faUser} />
        <FontAwesomeIcon className="cursor-pointer" icon={faShoppingBasket} />
      </div>
    </header>
  );
}
