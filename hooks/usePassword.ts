import React, { useEffect, useState } from 'react';

type Props = {
  current: string;
  new?: string;
  repeated: string;
};

const validationInitialState = {
  characters: false,
  digit: false,
  capital: false,
};

const usePassword = (passwordsInitialState: Props) => {
  const [passwords, setPasswords] = useState(passwordsInitialState);
  const [validationStatus, setValidationStatus] = useState(validationInitialState);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    //password security validation
    const checkPassword = (password: string = '') => {
      let characters = false;
      let digit = false;
      let capital = false;

      if (password.length >= 8) characters = true;
      if (/[A-Z]/.test(password)) capital = true;
      if (/\d/.test(password)) digit = true;

      setValidationStatus({
        characters,
        digit,
        capital,
      });

      return characters && digit && capital;
    };

    if (passwords.hasOwnProperty('new')) {
      checkPassword(passwords.new) && passwords.new === passwords.repeated ? setDisabled(false) : setDisabled(true);
    } else {
      checkPassword(passwords.current) && passwords.current === passwords.repeated ? setDisabled(false) : setDisabled(true);
    }
  }, [passwords]);

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setPasswords({
      ...passwords,
      [target.name]: target.value,
    });
  };

  return {
    passwords,
    validationStatus,
    isDisabled,
    handlePasswordInputChange,
  };
};

export default usePassword;
