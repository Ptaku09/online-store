import React, { useEffect, useState } from 'react';
import { faMoon, faShoppingBasket, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="absolute bg-black w-screen h-10 top-0 flex justify-between items-center font-['Outfit'] text-white z-10">
      <h1 className="ml-5 font-bold">FVRT_STR</h1>
      <div className="flex flex-row">
        <h1>MEN</h1>
        <h1 className="ml-10 mr-10">WOMEN</h1>
        <h1>KIDS</h1>
      </div>
      <div className="flex flex-row mr-5">
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
