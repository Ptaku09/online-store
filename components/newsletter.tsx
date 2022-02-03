import React, { useState } from 'react';
import NewsletterFormField from './newsletterFromField';

type Types = {
  name: string;
  surname: string;
  email: string;
};

const initialState: Types = {
  name: '',
  surname: '',
  email: '',
};

export default function Newsletter() {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const registerUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      surname: { value: string };
      email: { value: string };
    };

    const name = target.name.value;
    const surname = target.surname.value;
    const email = target.email.value;

    const res = await fetch('/api/newsletter', {
      body: JSON.stringify({
        name,
        surname,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    setFormValues(initialState);

    console.log(result);
  };

  return (
    <form className="w-full md:w-2/3 lg:w-1/2 flex items-center justify-center flex-col text-['Outfit'] p-2 2xl:px-32" onSubmit={registerUser}>
      <NewsletterFormField id="name" type="text" value={formValues.name} maxLength={20} onChange={handleInputChange} />
      <NewsletterFormField id="surname" type="text" value={formValues.surname} maxLength={30} onChange={handleInputChange} />
      <NewsletterFormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
      <button className="bg-orange-400 w-full lg:w-1/2 p-4 shadow rounded-lg lg:hover:bg-orange-300 focus:bg-orange-500 mt-5" type="submit">
        SUBSCRIBE NEWSLETTER
      </button>
    </form>
  );
}
