import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import DeleteAccount from '../components/userMenu/DeleteAccount';
import Orders from '../components/userMenu/Orders';
import Returns from '../components/userMenu/Returns';
import AccountInformation from '../components/userMenu/AccountInformation';

export default function User() {
  const { data: session } = useSession();
  const [selected, setSelected] = useState('orders');
  const [screenWidth, setScreenWidth] = useState(768);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setScreenWidth(window.screen.width);
    setSelected(sessionStorage.getItem('user-menu-cart') || 'orders');
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.id);
    sessionStorage.setItem('user-menu-cart', event.target.id);
  };

  const handleMenuOpen = () => {
    setOpen((prevState) => !prevState);
    document.body.style.overflow === 'hidden' ? (document.body.style.overflow = 'unset') : (document.body.style.overflow = 'hidden');
  };

  const handleSignOut = () => {
    signOut().then(() => {
      localStorage.setItem('cart-data', JSON.stringify([]));
      sessionStorage.clear();
    });
  };

  return (
    <>
      <Head>
        <title>{session?.user.name?.split(' ')[0]}&apos;s account</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen min-h-screen lg:h-screen lg:grid lg:grid-cols-[1fr_5fr] font-['Outfit'] px-14 py-20 md:px-20 text-2xl dark:bg-[rgba(55,55,55,1)]">
        {screenWidth > 1024 ? (
          <div className="flex items-start justify-start flex-col w-full h-full border-r-[1px] border-black dark:border-white">
            <h1 className="text-4xl border-b-[1px] pb-3 pr-9 border-black dark:border-white">
              Hello,
              <br /> {session?.user.name?.split(' ')[0]}!
            </h1>
            <div className="mt-10 h-full flex flex-col items-start justify-between pb-5">
              <form className="text-lg">
                <div className="flex flex-col justify-between gap-6 dark:text-white">
                  <div>
                    <input
                      type="radio"
                      name="side-menu"
                      id="orders"
                      checked={selected === 'orders'}
                      onChange={handleInputChange}
                      className="peer"
                      hidden
                    />
                    <label
                      htmlFor="orders"
                      className="pb-1 pr-5 border-b-2 border-white hover:border-black dark:border-[rgba(55,55,55,1)] dark:hover:border-white dark:peer-checked:border-white peer-checked:border-black cursor-pointer"
                    >
                      Your orders
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="side-menu"
                      id="returns"
                      checked={selected === 'returns'}
                      onChange={handleInputChange}
                      className="peer"
                      hidden
                    />
                    <label
                      htmlFor="returns"
                      className="pb-1 pr-5 border-b-2 border-white hover:border-black dark:border-[rgba(55,55,55,1)] dark:hover:border-white dark:peer-checked:border-white peer-checked:border-black cursor-pointer"
                    >
                      Your returns
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="side-menu"
                      id="info"
                      checked={selected === 'info'}
                      onChange={handleInputChange}
                      className="peer"
                      hidden
                    />
                    <label
                      htmlFor="info"
                      className="pb-1 pr-5 border-b-2 border-white hover:border-black dark:border-[rgba(55,55,55,1)] dark:hover:border-white dark:peer-checked:border-white peer-checked:border-black cursor-pointer"
                    >
                      Account information
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="side-menu"
                      id="delete"
                      checked={selected === 'delete'}
                      onChange={handleInputChange}
                      className="peer"
                      hidden
                    />
                    <label
                      htmlFor="delete"
                      className="pb-1 pr-5 border-b-2 border-white dark:border-[rgba(55,55,55,1)] hover:border-red-700 dark:hover:border-red-700 peer-checked:border-red-700 text-red-700 cursor-pointer"
                    >
                      Delete account
                    </label>
                  </div>
                </div>
              </form>
              <button className="lg:hover:text-orange-400" onClick={handleSignOut}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              className={`fixed left-5 top-16 flex flex-col h-6 justify-around transition duration-300 ${
                isOpen ? 'z-30 translate-y-[-2.5rem]' : 'translate-y-0'
              }`}
              onClick={handleMenuOpen}
            >
              <div
                className={`w-6 h-[0.18rem] transition origin-[1px] duration-300 ${
                  isOpen ? 'bg-black dark:bg-white rotate-45' : 'bg-black dark:bg-white rotate-0'
                }`}
              />
              <div
                className={`w-6 h-[0.18rem] transition origin-[1px] duration-300 ${
                  isOpen ? 'bg-black dark:bg-white translate-x-5 opacity-0' : 'bg-black dark:bg-white translate-x-0 opacity-100'
                }`}
              />
              <div
                className={`w-6 h-[0.18rem] transition origin-[1px] duration-300 ${
                  isOpen ? 'bg-black dark:bg-white rotate-[-45deg]' : 'bg-black dark:bg-white rotate-0'
                }`}
              />
            </button>
            <div
              className={`fixed top-0 left-0 z-20 w-full h-full flex flex-col xs:flex-row items-center justify-around bg-white dark:bg-black dark:text-white text-black bg-opacity-100 transition duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-[-100vw]'
              }`}
            >
              <div className="flex flex-col items-start">
                <h1 className="text-4xl mb-14">
                  Hello,
                  <br /> {session?.user.name?.split(' ')[0]}!
                </h1>
                <form className="text-2xl">
                  <div className="flex flex-col justify-between gap-8">
                    <div>
                      <input
                        type="radio"
                        name="side-menu"
                        id="orders"
                        checked={selected === 'orders'}
                        onChange={handleInputChange}
                        onClick={handleMenuOpen}
                        className="peer"
                        hidden
                      />
                      <label
                        htmlFor="orders"
                        className="pb-1 border-b-2 border-white border-opacity-0 peer-checked:border-black dark:peer-checked:border-white"
                      >
                        Your orders
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="side-menu"
                        id="returns"
                        checked={selected === 'returns'}
                        onChange={handleInputChange}
                        onClick={handleMenuOpen}
                        className="peer"
                        hidden
                      />
                      <label
                        htmlFor="returns"
                        className="pb-1 border-b-2 border-white border-opacity-0 peer-checked:border-black dark:peer-checked:border-white"
                      >
                        Your returns
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="side-menu"
                        id="info"
                        checked={selected === 'info'}
                        onChange={handleInputChange}
                        onClick={handleMenuOpen}
                        className="peer"
                        hidden
                      />
                      <label
                        htmlFor="info"
                        className="pb-1 border-b-2 border-white border-opacity-0 peer-checked:border-black dark:peer-checked:border-white"
                      >
                        Account information
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="side-menu"
                        id="delete"
                        checked={selected === 'delete'}
                        onChange={handleInputChange}
                        onClick={handleMenuOpen}
                        className="peer"
                        hidden
                      />
                      <label htmlFor="delete" className="pb-1 border-b-2 border-white border-opacity-0 peer-checked:border-red-700 text-red-700">
                        Delete account
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <button onClick={handleSignOut}>Logout</button>
            </div>
          </>
        )}
        <div className="w-full flex items-start justify-center md:pl-14 overflow-y-auto">
          {selected === 'orders' ? (
            <Orders />
          ) : selected === 'returns' ? (
            <Returns />
          ) : selected === 'info' ? (
            <AccountInformation />
          ) : (
            <DeleteAccount />
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
