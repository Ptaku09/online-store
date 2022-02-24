import React, { ChangeEventHandler } from 'react';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function PasswordFormField({ label, name, value, onChange }: Props) {
  return (
    <>
      <label className="text-[0.75rem] ml-5 w-full" htmlFor="current">
        {label.toUpperCase()}
      </label>
      <input
        className="w-full py-2 px-3 border-[1px] border-gray-300 bg-white shadow text-md text-black focus:outline-orange-400 focus:animate-pulse rounded-lg"
        name={name}
        type="password"
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
