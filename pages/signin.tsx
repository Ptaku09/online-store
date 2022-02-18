import { GetServerSideProps } from 'next';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import FormField from '../components/FormField';
import useForm, { InitialStateTypes } from '../hooks/useForm';

interface Provider {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}

const initialState: InitialStateTypes = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
};

export default function SignIn({ providers }: { providers: Provider }) {
  const { data: session } = useSession();
  const { formValues, setFormValues, handleInputChange } = useForm(initialState);

  return (
    <div className="w-screen h-mobile-screen lg:h-screen flex items-center justify-center px-32 py-20">
      <div className="grid grid-cols-[4fr_5fr] w-4/5 h-full bg-white rounded-lg shadow-2xl dark:shadow-dark">
        <div className="bg-[url('../public/images/signin.jpg')] bg-cover rounded-l-lg" />
        <div className="relative flex items-center justify-center flex-col p-5 font-['Outfit'] text-black">
          <p className="text-4xl absolute top-8 mx-auto border-b-2 border-b-black px-7 pb-4">Sign up!</p>
          <form className="flex flex-col">
            <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
            <FormField id="password" type="password" value={formValues.password || ''} maxLength={40} onChange={handleInputChange} />
            <button
              onClick={async (e) => {
                e.preventDefault();
                await signIn('credentials', {
                  redirect: false,
                  email: formValues.email,
                  password: formValues.password,
                });
              }}
            >
              Login
            </button>
          </form>
          {/*<button*/}
          {/*  onClick={async () => {*/}
          {/*    const res = await fetch('/api/signin', {*/}
          {/*      body: JSON.stringify({*/}
          {/*        email: 'test@gmail.com',*/}
          {/*        password: '12345678',*/}
          {/*        name: 'Olgierd',*/}
          {/*        surname: 'Johnson',*/}
          {/*      }),*/}
          {/*      method: 'POST',*/}
          {/*    });*/}
          {/*  }}*/}
          {/*>*/}
          {/*  click*/}
          {/*</button>*/}
          {!session ? (
            Object.values(providers).map(({ id, name }: { id: string; name: string }) => (
              <button
                key={name}
                className="text-xl border-2 py-3 px-5 flex items-center justify-center gap-3 lg:hover:bg-gray-200"
                onClick={() => signIn(id)}
              >
                Sign in with {name}
                {/*<Image src={Google} width={20} height={20} alt="Google" />*/}
              </button>
            ))
          ) : (
            <button onClick={() => signOut()}>Sign out</button>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
