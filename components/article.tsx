import Image from 'next/image';
import sale from '../public/images/sale.jpg';
import eco from '../public/images/ecoFriendly.jpg';
import materials from '../public/images/materials.jpg';
import React, { useEffect, useState } from 'react';
import ArticleData from './articleData';

const images = [materials, eco, sale];

type Props = {
  index: string;
  title: string;
  titleDesc: string;
  description: string;
  imageOnLeft?: boolean;
};

export default function Article({ index, title, titleDesc, description, imageOnLeft = false }: Props) {
  const [screenWidth, setScreenWidth] = useState(768);

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <div className="mb-24 xs:mb-44 md:mb-16 lg:mb-32 md:mx-8 md:grid md:grid-cols-2 gap-6 2xl:gap-28">
      {imageOnLeft || screenWidth < 768 ? (
        <>
          <div className="w-full h-[30vh] md:h-full flex items-center justify-center 2xl:justify-end">
            <div className="w-full lg:w-4/5 2xl:w-3/5">
              <Image className="rounded-2xl shadow" src={images[parseInt(index) - 1]} objectFit="cover" alt={title} priority />
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center md:items-start 2xl:justify-start">
            <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center md:items-start 2xl:justify-end">
            <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
          </div>
          <div className="w-full h-[30vh] md:h-full flex items-center justify-center 2xl:justify-start">
            <div className="w-full lg:w-4/5 2xl:w-3/5">
              <Image className="rounded-2xl shadow" src={images[parseInt(index) - 1]} objectFit="cover" alt={title} priority />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
