import Head from 'next/head';
import React from 'react';
import TitleDesc from '../components/TitleDesc';
import { GetStaticProps } from 'next';
import Newsletter from '../components/Newsletter';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Article from '../components/Article';

export default function Home() {
  return (
    <>
      <Head>
        <title>FVRT_STR</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="h-auto min-h-full md:min-h-screen w-screen flex justify-center items-center flex-col overflow-y-scroll no-scrollbar">
        <div className="w-screen h-mobile-screen md:h-screen flex justify-center items-center flex-col bg-[url('../public/images/homeBackgroundMobile.jpg')] xs:bg-[url('../public/images/homeBackground.jpg')] md:bg-[url('../public/images/homeBackgroundMobile.jpg')] lg:bg-[url('../public/images/homeBackground.jpg')] lg:bg-fixed bg-scroll bg-cover bg-no-repeat bg-center">
          <div className="absolute right-0 top-0 h-mobile-screen w-screen lg:h-screen m-0 shadow-gradient dark:shadow-gradient-dark" />
          <div className="relative z-[2]">
            <TitleDesc desc="enjoy shopping" />
            <h1 className="text-white font-serif text-5xl md:text-8xl light:text-border">FVRT_STR</h1>
            <a className="text-white font-['Outfit'] mt-2 relative text-border-thin lg:hover:text-orange-400" href="#why-you-should-choose-us">
              scroll down ↓
            </a>
          </div>
        </div>
        <div className="h-auto min-h-screen w-screen dark:bg-[rgba(55,55,55,1)] bg-white flex justify-start items-center flex-col pt-10 pb-10 px-16 md:p-24 font-['Outfit']">
          <h2 className="relative text-6xl font-serif dark:text-white text-black mb-12">
            <span id="why-you-should-choose-us" className="absolute -top-20" />
            Why you should choose us?
          </h2>
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
          <div className="pb-24 md:pb-14 md:pb-24 text-white flex flex-col md:flex-row md:w-4/5 lg:w-2/3 items-center justify-center">
            <Link href="/men">
              <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl dark:shadow-dark">
                MEN
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
            <Link href="/women">
              <a className="w-full px-8 py-3 my-8 mx-8 md:mx-14 lg:mx-24 bg-black lg:hover:bg-gray-800 text-center shadow-xl dark:shadow-dark">
                WOMEN
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </Link>
            <Link href="/kids">
              <a className="w-full px-8 py-3 bg-black lg:hover:bg-gray-800 text-center shadow-xl dark:shadow-dark">
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
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
