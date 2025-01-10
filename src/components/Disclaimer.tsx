import React from 'react';

const Disclaimer = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Important:</strong> This product is intended for use under the supervision of a qualified therapist. 
            Using the application independently is at your own risk and may not achieve the expected therapeutic results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
