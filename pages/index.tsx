import Head from 'next/head';
import React from 'react';
import TitleDesc from '../components/titleDesc';
import { GetStaticProps } from 'next';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const handleScrollDown = (): void => {
    window.scrollTo({
      top: window.screen.height,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Head>
        <title>Online store!</title>
      </Head>

      <div className="h-auto min-h-screen w-screen flex justify-center items-center flex-col overflow-y-scroll no-scrollbar">
        <div className="bg-[url('../public/images/homeBackground.png')] bg-cover bg-fixed w-screen h-screen flex justify-center items-center flex-col light:shadow-[inset_0_-100px_62px_-44px_rgba(241,241,241,1)]">
          <div className="w-full h-full absolute top-0 left-0 shadow-gradient dark:shadow-gradient-dark z-[1]" />
          <div className="pb-10 relative z-[2]">
            <TitleDesc desc="enjoy shopping" />
            <h1 className="text-white font-serif text-8xl light:text-border">FVRT_STR</h1>
            <button className="text-white font-['Outfit'] mt-2 relative text-border-thin" onClick={handleScrollDown}>
              scroll down ↓
            </button>
          </div>
        </div>
        <div className="h-auto min-h-screen w-screen bg-white dark:bg-black" />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
