import React, { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function DeleteUser() {
  const [isDisabled, setDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleDeleteAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPending(true);

    const token = await getSession().then((session) => session?.user.id);

    const res = await fetch('/api/deleteAccount', {
      body: JSON.stringify({
        token: token,
      }),
      method: 'DELETE',
    });

    if (res.status === 200) {
      setIsPending(false);
      await router.push('/');
      await signOut();
    } else {
      setIsPending(false);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="w-full min-h-full h-auto flex items-center justify-start flex-col lg:animate-appearing-short">
      <h1 className="text-5xl text-center">Delete your account</h1>
      <form className="flex items-center justify-center flex-col py-44 xs:py-16 lg:py-44" onSubmit={handleDeleteAccount}>
        <span className="flex items-center">
          <input type="checkbox" id="agreement-delete" className="peer w-6 h-6" onClick={() => setDisabled((prevState) => !prevState)} />
          <label htmlFor="agreement-delete" className="pr-5 ml-4 opacity-50 lg:hover:opacity-75 peer-checked:opacity-100 text-lg cursor-pointer">
            I know that this action is <i className="text-red-700">permanent </i>!
          </label>
        </span>
        {message ? <p className="text-red-700 text-xl mt-5 text-center">{message}</p> : null}
        <button
          className="px-10 py-5 mt-5 bg-orange-400 disabled:text-opacity-50 text-white text-xl xs:text-2xl shadow-xl lg:hover:bg-orange-300 lg:disabled:hover:bg-orange-400 lg:disabled:hover:bg-opacity-50 disabled:bg-opacity-50 lg:disabled:cursor-not-allowed rounded-md"
          disabled={isDisabled}
        >
          {!isPending ? (
            'DELETE YOUR ACCOUNT'
          ) : (
            <>
              <svg className="animate-spin rounded-full border-4 border-white border-t-gray-500 h-5 w-5 mr-3" viewBox="0 0 24 24" />
              PROCESSING...
            </>
          )}
        </button>
      </form>
    </div>
  );
}
