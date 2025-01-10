import React from 'react';

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<StepProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center relative">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span className="text-lg font-semibold">{index + 1}</span>
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  index + 1 < currentStep ? 'bg-teal-600' : 'bg-slate-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
