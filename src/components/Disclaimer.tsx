import React from 'react';

const Disclaimer = () => {
  return (
    <div className="bg-slate-50 border-l-4 border-slate-300 p-4 my-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-slate-600">
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
