import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import NewsletterFormField from './NewsletterFromField';
import useForm, { InitialStateTypes } from '../hooks/useForm';

const initialState: InitialStateTypes = {
  name: '',
  surname: '',
  email: '',
};

export default function Newsletter() {
  const { formValues, setFormValues, handleInputChange } = useForm(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const registerUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsPending(true);

    const res = await fetch('/api/newsletter', {
      body: JSON.stringify({
        name: formValues.name?.trim(),
        surname: formValues.surname?.trim(),
        email: formValues.email.trim(),
      }),
      method: 'POST',
    });

    const result = await res.json();

    if (result.status === 200) {
      setIsOpen(true);
    }

    setIsPending(false);
    setFormValues(initialState);
  };

  return (
    <>
      <form
        aria-label="form"
        className="w-full md:w-2/3 md:w-1/2 flex items-center justify-center flex-col text-['Outfit'] p-2 2xl:px-32"
        onSubmit={registerUser}
      >
        <NewsletterFormField id="name" type="text" value={formValues.name || ''} maxLength={20} onChange={handleInputChange} />
        <NewsletterFormField id="surname" type="text" value={formValues.surname || ''} maxLength={30} onChange={handleInputChange} />
        <NewsletterFormField id="email" type="email" value={formValues.email} maxLength={40} onChange={handleInputChange} />
        <button
          className="bg-orange-400 w-full md:w-1/2 p-4 flex items-center justify-center shadow rounded-lg text-white lg:hover:bg-orange-300 mt-5"
          type="submit"
        >
          {!isPending ? (
            'SUBSCRIBE NEWSLETTER'
          ) : (
            <>
              <svg className="animate-spin rounded-full border-4 border-white border-t-gray-500 h-5 w-5 mr-3" viewBox="0 0 24 24" />
              PROCESSING...
            </>
          )}
        </button>
      </form>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 bg-white dark:bg-[rgba(55,55,55,0.8)] bg-opacity-80"
          onClose={() => setIsOpen((prevState) => !prevState)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-4 border-2 border-[rgba(55,55,55,1)] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Success!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Your request has been successfully submitted.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-400 rounded-md lg:hover:bg-orange-300 shadow-lg"
                    onClick={() => setIsOpen((prevState) => !prevState)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
