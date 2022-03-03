import React, { useState } from 'react';
import FormField from '../FormField';
import useForm from '../../hooks/useForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import usePassword from '../../hooks/usePassword';
import PasswordFormField from '../PasswordFormField';
import PasswordSecurityStatus from '../PasswordSecurityStatus';

const passwordsInitialState = {
  current: '',
  new: '',
  repeated: '',
};

export default function AccountInformation() {
  const { data: session } = useSession();
  const [initialState] = useState({
    name: session?.user.name?.split(' ')[0] || '',
    surname: session?.user.name?.split(' ')[1] || '',
    email: session?.user.email || '',
  });
  const { formValues, handleInputChange } = useForm(initialState);
  const [isPendingData, setIsPendingData] = useState(false);
  const [dataMessage, setDataMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPendingPassword, setIsPendingPassword] = useState(false);
  const { passwords, validationStatus, isDisabled, handlePasswordInputChange } = usePassword(passwordsInitialState);
  const router = useRouter();

  const handleChangePersonalData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPendingData(true);

    const res = await fetch('/api/changeData', {
      body: JSON.stringify({
        token: session?.user.id,
        name: formValues.name?.trim() + ' ' + formValues.surname?.trim(),
        email: formValues.email.trim(),
      }),
      method: 'PATCH',
    });

    if (res.status === 200) {
      setIsPendingData(false);
      setDataMessage('');

      fetch('/api/auth/session?update', {
        method: 'GET',
        credentials: 'include',
      }).then(() => router.reload());
    } else {
      setIsPendingData(false);
      setDataMessage('Something went wrong!');
    }
  };

  const handleChangePassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPendingPassword(true);

    const res = await fetch('/api/changePassword', {
      body: JSON.stringify({
        email: session?.user.email,
        current: passwords.current,
        passwordToSet: passwords.new,
      }),
      method: 'PATCH',
    });

    switch (res.status) {
      case 200:
        setIsPendingPassword(false);
        setPasswordMessage('');

        fetch('/api/auth/session?update', {
          method: 'GET',
          credentials: 'include',
        }).then(() => router.reload());
        break;

      case 409:
        setIsPendingPassword(false);
        setPasswordMessage('Wrong password!');
        break;

      default:
        setIsPendingPassword(false);
        setPasswordMessage('Something went wrong. Try again later.');
        break;
    }
  };

  return (
    <div className="w-full h-auto min-h-full flex flex-col items-center justify-start animate-appearing-short">
      <h1 className="text-4xl xs:text-5xl text-center">Change your account information</h1>
      <div className={`mt-16 ${session?.user.provider === 'credentials' ? 'lg:grid lg:grid-cols-2' : 'flex items-center'} w-full`}>
        <div className="w-full flex flex-col items-center justify-center">
          <h4 className="border-b-[1px] border-black dark:border-white pb-2 px-3 mb-5 text-center">Change personal data</h4>
          <form
            className={`flex flex-col items-center ${
              session?.user.provider === 'credentials' ? 'w-full xs:w-1/2' : 'w-full xs:w-1/2 lg:w-1/3'
            } text-xl h-full`}
            onSubmit={handleChangePersonalData}
          >
            <FormField id="name" type="text" value={formValues.name || ''} maxLength={40} onChange={handleInputChange} />
            <FormField id="surname" type="text" value={formValues.surname || ''} maxLength={40} onChange={handleInputChange} />
            <FormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
            {dataMessage ? <p className="text-red-700 text-lg mb-5 text-center">{dataMessage}</p> : null}
            <button className="flex items-center justify-center bg-orange-400 text-white text-lg shadow-xl lg:hover:bg-orange-300 lg:disabled:hover:bg-orange-400 lg:disabled:hover:bg-opacity-50 disabled:bg-opacity-50 lg:disabled:cursor-not-allowed w-5/6 py-3 rounded-md">
              {!isPendingData ? (
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
        {session?.user.provider === 'credentials' ? (
          <div className="w-full flex flex-col items-center justify-center mt-16 lg:mt-0">
            <h4 className="border-b-[1px] border-black dark:border-white pb-2 px-3 mb-5">Change password</h4>
            <form className="flex flex-col items-center justify-center gap-2 lg:gap-0 w-full xs:w-1/2 text-xl h-full" onSubmit={handleChangePassword}>
              <PasswordFormField label="current password" name="current" value={passwords.current} onChange={handlePasswordInputChange} />
              <PasswordFormField label="new password" name="new" value={passwords.new || ''} onChange={handlePasswordInputChange} />
              <PasswordSecurityStatus validationStatus={validationStatus} />
              <PasswordFormField label="repeat password" name="repeated" value={passwords.repeated} onChange={handlePasswordInputChange} />
              {passwordMessage ? <p className="text-red-700 text-lg mt-2 text-center">{passwordMessage}</p> : null}
              <button
                className="flex items-center justify-center mt-5 bg-orange-400 text-white text-lg shadow-xl lg:hover:bg-orange-300 lg:disabled:hover:bg-orange-400 lg:disabled:hover:bg-opacity-50 disabled:bg-opacity-50 lg:disabled:cursor-not-allowed w-5/6 py-3 rounded-md"
                disabled={isDisabled}
              >
                {!isPendingPassword ? (
                  'Change'
                ) : (
                  <>
                    <svg className="animate-spin rounded-full border-4 border-white border-t-gray-500 h-5 w-5 mr-3" viewBox="0 0 24 24" />
                    PROCESSING...
                  </>
                )}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
