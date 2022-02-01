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
    <div className="mb-32 ml-8 mr-8">
      {imageOnLeft ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <Image className="rounded-2xl shadow" src={Img} objectFit="cover" alt="asdsad" />
          </div>
          <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <ArticleData index={index} title={title} titleDesc={titleDesc} description={description} />
          <div className="flex items-center justify-center">
            <Image className="rounded-2xl shadow" src={Img} objectFit="cover" alt="asdsad" />
          </div>
        </div>
      )}
    </div>
  );
}
