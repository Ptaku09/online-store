import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Google from '../assets/google-brands.svg';
import Link from 'next/link';
import FormField from '../components/FormField';
import useForm from '../hooks/useForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const initialState = {
  name: '',
  surname: '',
  email: '',
};

const passwordsInitialState = {
  current: '',
  repeated: '',
};

const validationInitialState = {
  characters: false,
  digit: false,
  capital: false,
};

export default function SignUp() {
  const [passwords, setPasswords] = useState(passwordsInitialState);
  const [validationStatus, setValidationStatus] = useState(validationInitialState);
  const [isDisabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const { formValues, setFormValues, handleInputChange } = useForm(initialState);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //password security validation
    const checkPassword = () => {
      let characters = false;
      let digit = false;
      let capital = false;

      if (passwords.current.length >= 8) characters = true;
      if (/[A-Z]/.test(passwords.current)) capital = true;
      if (/\d/.test(passwords.current)) digit = true;

      setValidationStatus({
        characters,
        digit,
        capital,
      });

      return characters && digit && capital;
    };

    checkPassword() && passwords.current === passwords.repeated ? setDisabled(false) : setDisabled(true);
  }, [passwords]);

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setPasswords({
      ...passwords,
      [target.name]: target.value,
    });
  };

  const handleSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPending(true);

    const res = await fetch('/api/signup', {
      body: JSON.stringify({
        email: formValues.email.trim(),
        password: passwords.current.trim(),
        name: formValues.name?.trim(),
        surname: formValues.surname?.trim(),
      }),
      method: 'POST',
    });

    switch (res.status) {
      case 200:
        setFormValues(initialState);
        setPasswords(passwordsInitialState);
        setIsPending(false);
        await router.push('/signin');
        break;

      case 409:
        setIsPending(false);
        setMessage('The email is already associated with an account!');
        break;

      default:
        setIsPending(false);
        setMessage('Something went wrong. Try again later.');
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen min-h-mobile-screen lg:min-h-screen h-auto flex items-center justify-center px-14 py-20">
        <div className="lg:bg-[url('../public/images/signup.jpg')] lg:bg-cover flex justify-center w-full lg:w-4/5 h-auto rounded-lg bg-white shadow-2xl dark:shadow-dark">
          <div className="relative flex items-center justify-center flex-col p-5 font-['Outfit'] text-black bg-white rounded-lg lg:rounded-none lg:bg-opacity-80 w-full lg:w-1/2 shadow-lg">
            <p className="text-4xl lg:absolute top-8 mx-auto border-b-2 border-b-black px-7 pb-4">Sign up!</p>
            <form className="flex flex-col items-center mt-5 pt-6 lg:pt-32 w-full xs:w-7/12 lg:mt-0" onSubmit={handleSignUp}>
              <FormField id="name" type="text" value={formValues.name || ''} maxLength={40} onChange={handleInputChange} />
              <FormField id="surname" type="text" value={formValues.surname || ''} maxLength={40} onChange={handleInputChange} />
              <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
              <label className="text-[0.75rem] ml-5 w-full" htmlFor="current">
                PASSWORD
              </label>
              <input
                className="w-full py-2 px-3 border-[1px] border-gray-300 bg-white shadow text-md text-black focus:outline-orange-400 focus:animate-pulse rounded-lg"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordInputChange}
                required
              />
              <ol className="text-sm flex flex-row gap-6 mb-6 mt-2 list-disc">
                {validationStatus.characters ? <li className="text-green-600">8 characters</li> : <li className="text-red-700">8 characters</li>}
                {validationStatus.capital ? <li className="text-green-600">capital letter</li> : <li className="text-red-700">capital letter</li>}
                {validationStatus.digit ? <li className="text-green-600">digit</li> : <li className="text-red-700">digit</li>}
              </ol>
              <label className="text-[0.75rem] ml-5 w-full" htmlFor="repeated">
                REPEAT PASSWORD
              </label>
              <input
                className="w-full py-2 px-3 border-[1px] border-gray-300 bg-white shadow text-md text-black focus:outline-orange-400 focus:animate-pulse rounded-lg mb-6"
                name="repeated"
                type="password"
                value={passwords.repeated}
                onChange={handlePasswordInputChange}
                required
              />
              {message ? <p className="text-red-700 text-sm xs:text-xl mb-3 text-center">{message}</p> : null}
              <button
                className="flex items-center justify-center bg-orange-400 text-white shadow-xl lg:hover:bg-orange-300 lg:disabled:hover:bg-orange-400 lg:disabled:hover:bg-opacity-50 disabled:bg-opacity-50 lg:disabled:cursor-not-allowed w-2/3 py-2 rounded-md"
                disabled={isDisabled}
              >
                {!isPending ? (
                  'Register'
                ) : (
                  <>
                    <svg className="animate-spin rounded-full border-4 border-white border-t-gray-500 h-5 w-5 mr-3" viewBox="0 0 24 24" />
                    PROCESSING...
                  </>
                )}
              </button>
            </form>
            <p className="mt-5">or...</p>
            <button
              className="text-md mt-2 border-2 py-3 px-5 flex items-center justify-center gap-3 bg-white lg:hover:bg-gray-200"
              onClick={() => signIn('google')}
            >
              Sign in with Google
              <Image src={Google} width={30} height={30} alt="Google" />
            </button>
            <p className="text-sm mt-2">
              already have an account?{' '}
              <Link href="/signin">
                <a className="text-blue-600 hover:text-blue-400">Sign in!</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
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
