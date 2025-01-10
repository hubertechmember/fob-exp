import React from 'react';

const Disclaimer = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Ważne:</strong> Ten produkt jest przeznaczony do użytku pod nadzorem wykwalifikowanego terapeuty. 
            Samodzielne korzystanie z aplikacji odbywa się na własną odpowiedzialność i może nie przynieść 
            oczekiwanych rezultatów terapeutycznych.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
