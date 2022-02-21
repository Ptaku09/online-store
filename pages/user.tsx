import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import DeleteUser from '../components/userMenu/DeleteUser';

export default function User() {
  const { data: session } = useSession();
  const [selected, setSelected] = useState('orders');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.id);

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

      <div className="w-screen min-h-mobile-screen lg:h-screen lg:grid lg:grid-cols-[1fr_5fr] font-['Outfit'] p-20 text-2xl dark:bg-[rgba(55,55,55,1)]">
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
                  <input type="radio" name="side-menu" id="info" checked={selected === 'info'} onChange={handleInputChange} className="peer" hidden />
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
            <button className="lg:hover:text-orange-400" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center pl-14 overflow-y-auto">
          {selected === 'orders' ? <p>orders</p> : selected === 'returns' ? <p>returns</p> : selected === 'info' ? <p>info</p> : <DeleteUser />}
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
