import React from 'react';

interface Props {
  characters: boolean;
  capital: boolean;
  digit: boolean;
}

type ValidationStatus = {
  validationStatus: Props;
};

export default function PasswordSecurityStatus({ validationStatus }: ValidationStatus) {
  return (
    <ol className="text-sm flex flex-row gap-6 mb-6 mt-2 list-disc">
      {validationStatus.characters ? <li className="text-green-600">8 characters</li> : <li className="text-red-700">8 characters</li>}
      {validationStatus.capital ? <li className="text-green-600">capital letter</li> : <li className="text-red-700">capital letter</li>}
      {validationStatus.digit ? <li className="text-green-600">digit</li> : <li className="text-red-700">digit</li>}
    </ol>
  );
}
