import { GetServerSideProps } from 'next';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import FormField from '../components/FormField';
import useForm, { InitialStateTypes } from '../hooks/useForm';
import Google from '../assets/google-brands.svg';
import Image from 'next/image';
import Link from 'next/link';

const initialState: InitialStateTypes = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
};

export default function SignIn() {
  const { data: session } = useSession();
  const { formValues, setFormValues, handleInputChange } = useForm(initialState);

  const handleSigningIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await signIn('credentials', {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });

    setFormValues(initialState);
  };

  return (
    <div className="w-screen h-mobile-screen xs:h-auto lg:h-screen flex items-center justify-center px-14 xs:px-32 py-20">
      <div className="lg:grid lg:grid-cols-[4fr_5fr] w-full lg:w-4/5 h-auto lg:h-full bg-white rounded-lg shadow-2xl dark:shadow-dark">
        <div className="bg-[url('../public/images/signin.jpg')] bg-cover rounded-l-lg" />
        <div className="relative flex items-center justify-center flex-col p-5 font-['Outfit'] text-black">
          <p className="text-4xl lg:absolute top-8 mx-auto border-b-2 border-b-black px-7 pb-4">Sign in!</p>
          <form className="flex flex-col items-center mt-5 lg:mt-0" onSubmit={handleSigningIn}>
            <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
            <FormField id="password" type="password" value={formValues.password || ''} maxLength={40} onChange={handleInputChange} />
            <button className="bg-orange-400 text-white shadow-xl lg:hover:bg-orange-300 w-2/3 py-2 rounded-md">Login</button>
          </form>
          <button
            className="text-md mt-10 border-2 py-3 px-5 flex items-center justify-center gap-3 lg:hover:bg-gray-200"
            onClick={() => signIn('google')}
          >
            Sign in with Google
            <Image src={Google} width={30} height={30} alt="Google" />
          </button>
          <p className="text-sm mt-2">
            first time here?{' '}
            <Link href="/signup">
              <a className="text-blue-600 hover:text-blue-400">Create an account!</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
