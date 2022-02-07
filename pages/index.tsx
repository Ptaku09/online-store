import Head from 'next/head';
import React from 'react';
import TitleDesc from '../components/titleDesc';
import { GetStaticProps } from 'next';
import Footer from '../components/footer';
import Newsletter from '../components/newsletter';
import Article from '../components/article';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const handleScrollDown = (): void => {
    window.scrollTo({
      top: window.screen.height,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Head>
        <title>Online store!</title>
      </Head>

      <div className="fixed right-0 bottom-0 min-h-screen min-w-screen max-h-screen w-screen h-screen lg:h-screen z-[-100] m-0 bg-black bg-[url('../public/images/homeBackgroundMobile.jpg')] xs:bg-[url('../public/images/homeBackground.jpg')] bg-cover bg-no-repeat bg-center" />
      <div className="absolute right-0 bottom-0 min-h-screen max-h-screen w-screen h-screen lg:h-screen z-[-99] m-0 shadow-gradient dark:shadow-gradient-dark" />
      <div className="h-auto min-h-full lg:min-h-screen w-screen flex justify-center items-center flex-col overflow-y-scroll no-scrollbar">
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <div className="relative z-[2]">
            <TitleDesc desc="enjoy shopping" />
            <h1 className="text-white font-serif text-5xl md:text-8xl light:text-border">FVRT_STR</h1>
            <button className="text-white font-['Outfit'] mt-2 relative text-border-thin lg:hover:text-orange-400" onClick={handleScrollDown}>
              scroll down ↓
            </button>
          </div>
        </div>
        <div className="h-auto min-h-screen w-screen dark:bg-[rgba(55,55,55,1)] bg-white flex justify-start items-center flex-col pt-10 pb-10 px-16 lg:p-24 font-['Outfit']">
          <h2 className="text-6xl font-serif dark:text-white text-black my-12 lg:mt-32 lg:mb-24 2xl:mt-24">Why you should choose us?</h2>
          <Article
            index="01"
            title="Premium materials"
            titleDesc="quality is the key"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed diam nonumy eirmod tempor invidunt ut labore et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipis"
          />
          <Article
            index="02"
            title="Eco friendly"
            titleDesc="green matters"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed diam nonumy eirmod tempor invidunt ut labore et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipis"
            imageOnLeft={true}
          />
          <Article
            index="03"
            title="Always best prices"
            titleDesc="make it works"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed diam nonumy eirmod tempor invidunt ut labore et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipiscing elit sed diam nonumy eirm odio et dol consectetur adipis"
          />
          <div className="pb-24 md:pb-14 lg:pb-24 text-white flex flex-col md:flex-row md:w-4/5 lg:w-2/3 items-center justify-center">
            <Link href="#">
              <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl">
                MEN
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
            <Link href="#">
              <a className="w-full px-8 py-3 my-8 mx-8 md:mx-14 lg:mx-24 bg-black lg:hover:bg-gray-800 text-center shadow-xl">
                WOMEN
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
            <Link href="#">
              <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl">
                KIDS
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
          </div>
          <h2 className="text-6xl border-t-2 border-t-orange-400 w-full md:w-4/5 text-center pb-6 pt-12 font-serif dark:text-white text-black">
            Let&apos;s keep in touch!
          </h2>
          <Newsletter />
        </div>
        <div className="w-screen flex justify-center bg-black">
          <Footer />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
