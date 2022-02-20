import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import React, { useState } from 'react';
import FormField from '../components/FormField';
import useForm from '../hooks/useForm';
import Google from '../assets/google-brands.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const initialState = {
  email: '',
  password: '',
};

export default function SignIn() {
  const { formValues, setFormValues, handleInputChange } = useForm(initialState);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await signIn('credentials', {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });

    if (await getSession()) {
      setFormValues(initialState);
      await router.push('/user');
    } else {
      setMessage('Wrong credentials');
    }
  };

  return (
    <div className="w-screen h-mobile-screen xs:h-auto lg:h-screen flex items-center justify-center px-14 xs:px-32 py-20">
      <div className="lg:grid lg:grid-cols-[4fr_5fr] w-full lg:w-4/5 h-auto lg:h-full bg-white rounded-lg shadow-2xl dark:shadow-dark">
        <div className="bg-[url('../public/images/signin.jpg')] bg-cover rounded-l-lg" />
        <div className="relative flex items-center justify-center flex-col p-5 font-['Outfit'] text-black">
          <p className="text-4xl lg:absolute top-8 mx-auto border-b-2 border-b-black px-7 pb-4">Sign in!</p>
          <form className="flex flex-col items-center mt-5 lg:mt-0" onSubmit={handleSignIn}>
            <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
            <FormField id="password" type="password" value={formValues.password || ''} maxLength={40} onChange={handleInputChange} />
            {message ? <p className="text-red-700 text-sm xs:text-xl mb-3 text-center">{message}</p> : null}
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
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/user',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
