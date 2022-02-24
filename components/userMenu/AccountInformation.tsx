import React, { useState } from 'react';
import FormField from '../FormField';
import useForm from '../../hooks/useForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AccountInformation() {
  const { data: session } = useSession();
  const [initialState] = useState({
    name: session?.user.name?.split(' ')[0] || '',
    surname: session?.user.name?.split(' ')[1] || '',
    email: session?.user.email || '',
  });
  const { formValues, handleInputChange } = useForm(initialState);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChangePersonalData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPending(true);

    const res = await fetch('/api/changeData', {
      body: JSON.stringify({
        token: session?.user.id,
        name: formValues.name?.trim() + ' ' + formValues.surname?.trim(),
        email: formValues.email.trim(),
      }),
      method: 'PATCH',
    });

    if (res.status === 200) {
      setIsPending(false);
      setMessage('');

      fetch('/api/auth/session?update', {
        method: 'GET',
        credentials: 'include',
      }).then(() => router.reload());
    } else {
      setIsPending(false);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="w-full h-auto min-h-full flex flex-col items-center justify-start lg:animate-appearing-short">
      <h1 className="text-5xl text-center">Change your account information</h1>
      <div className="mt-16 grid grid-cols-2 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h4 className="border-b-[1px] border-black dark:border-white pb-2 px-3 mb-5">Change personal data</h4>
          <form className="flex flex-col items-center w-1/2 text-xl" onSubmit={handleChangePersonalData}>
            <FormField id="name" type="text" value={formValues.name || ''} maxLength={40} onChange={handleInputChange} />
            <FormField id="surname" type="text" value={formValues.surname || ''} maxLength={40} onChange={handleInputChange} />
            <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
            {message ? <p className="text-red-700 text-lg mb-5 text-center">{message}</p> : null}
            <button className="flex items-center justify-center bg-orange-400 text-white text-lg shadow-xl lg:hover:bg-orange-300 lg:disabled:hover:bg-orange-400 lg:disabled:hover:bg-opacity-50 disabled:bg-opacity-50 lg:disabled:cursor-not-allowed w-5/6 py-3 rounded-md">
              {!isPending ? (
                'Save changes'
              ) : (
                <>
                  <svg className="animate-spin rounded-full border-4 border-white border-t-gray-500 h-5 w-5 mr-3" viewBox="0 0 24 24" />
                  PROCESSING...
                </>
              )}
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4>Change password</h4>
        </div>
      </div>
    </div>
  );
}
