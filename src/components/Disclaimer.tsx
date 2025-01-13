import React from 'react';

const Disclaimer = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            For best results, we recommend using this application in collaboration with a mental health professional. 
            While the tools provided can be helpful for self-guided practice, working with a therapist can help ensure 
            you get the most benefit from the program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
