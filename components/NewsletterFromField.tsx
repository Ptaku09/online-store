import React, { ChangeEventHandler } from 'react';

type Props = {
  id: string;
  type: string;
  value: string;
  maxLength: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function NewsletterFormField({ id, type, value, maxLength, onChange }: Props) {
  return (
    <>
      <label className="text-[0.75rem] ml-5 w-full lg:w-4/5" htmlFor={id}>
        {id.toUpperCase()}
      </label>
      <input
        className="w-full lg:w-4/5 py-3 px-3 border-[1px] border-gray-300 dark:bg-gray-300 dark:border-0 shadow text-lg md:text-xl text-black focus:outline-orange-400 focus:animate-pulse rounded-lg mb-6"
        name={id}
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        required
      />
    </>
  );
}
