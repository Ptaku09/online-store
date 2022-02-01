import Image from 'next/image';
import Img from '../public/images/articleTest.jpg';
import React from 'react';
import ArticleData from './articleData';

type Props = {
  index: string;
  title: string;
  titleDesc: string;
  description: string;
  imageOnLeft?: boolean;
};

export default function Article({ index, title, titleDesc, description, imageOnLeft = false }: Props) {
  return (
    <div className="md:mb-32 md:ml-8 md:mr-8 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-6 2xl:gap-28">
      {imageOnLeft ? (
        <>
          <div className="w-full h-full flex items-center justify-center 2xl:justify-end">
            <div className="w-full h-full lg:w-4/5 2xl:w-3/5">
              <Image className="rounded-2xl shadow" src={Img} objectFit="cover" alt={title} />
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center 2xl:justify-start">
            <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center 2xl:justify-end">
            <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
          </div>
          <div className="w-full h-full flex items-center justify-center 2xl:justify-start">
            <div className="w-full h-full lg:w-4/5 2xl:w-3/5">
              <Image className="rounded-2xl shadow" src={Img} objectFit="cover" alt={title} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
