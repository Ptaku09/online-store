import React from 'react';

export default function Returns() {
  return (
    <div className="w-full h-auto min-h-full flex flex-col items-center justify-start animate-appearing-short">
      <h1 className="text-5xl text-center">Returns</h1>
      <div className="mt-16 flex flex-col items-center justify-center">
        <p className="pb-3 px-6 border-b-[1px] text-center border-black dark:border-white">You have no returns yet 😎</p>
      </div>
    </div>
  );
}
