import TitleDesc from './titleDesc';
import React from 'react';

type Props = {
  index: string;
  title: string;
  titleDesc: string;
  description: string;
};

export default function ArticleData({ index, title, titleDesc, description }: Props) {
  return (
    <div>
      <h1 className="absolute text-9xl font-bold opacity-30">{index}</h1>
      <div className="mt-16 ml-20">
        <TitleDesc desc={titleDesc} />
        <h3 className="text-5xl font-thin">{title}</h3>
        <p className="mt-4 font-light">{description}</p>
      </div>
    </div>
  );
}
