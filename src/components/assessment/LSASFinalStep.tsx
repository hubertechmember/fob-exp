'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Save } from 'lucide-react';

interface LSASFinalStepProps {
  onPrevious: () => void;
  onComplete: (fearValue: number, avoidanceValue: number) => void;
  onSaveAndExit: () => void;
  previousAnswers: {
    completed: number;
    missingResponses: number;
    currentTotal: number;
  };
}

const LSASFinalStep = ({ onPrevious, onComplete, onSaveAndExit, previousAnswers }: LSASFinalStepProps) => {
  const [answers, setAnswers] = useState<{
    fear: number | null;
    avoidance: number | null;
  }>({
    fear: null,
    avoidance: null
  });

  const handleComplete = () => {
    if (answers.fear !== null && answers.avoidance !== null) {
      onComplete(answers.fear, answers.avoidance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Final situation (24 of 24)</span>
          <span>96% completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: '96%' }}
          />
        </div>
      </div>

      {/* Quick summary card */}
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
        <div className="flex items-center gap-2 text-teal-800">
          <CheckCircle size={20} />
          <span className="font-medium">Almost done! You've answered 23 out of 24 situations.</span>
        </div>
      </div>

      {/* Current situation */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Resisting a pushy salesperson
          </h2>
          <p className="text-gray-600 text-sm">
            E.g., refusing to buy, assertively setting boundaries
          </p>
        </div>

        {/* Fear rating */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Level of fear or anxiety:</h3>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((value) => (
              <button
                key={value}
                onClick={() => setAnswers(prev => ({ ...prev, fear: value }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  answers.fear === value
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-200'
                }`}
              >
                <div className="text-lg font-bold text-center">{value}</div>
                <div className="text-sm text-gray-600">
                  {value === 0 && "None"}
                  {value === 1 && "Mild"}
                  {value === 2 && "Moderate"}
                  {value === 3 && "Severe"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Avoidance rating */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Frequency of avoidance:</h3>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((value) => (
              <button
                key={value}
                onClick={() => setAnswers(prev => ({ ...prev, avoidance: value }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  answers.avoidance === value
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-200'
                }`}
              >
                <div className="text-lg font-bold text-center">{value}</div>
                <div className="text-sm text-gray-600">
                  {value === 0 && "Never (0%)"}
                  {value === 1 && "Occasionally (1-33%)"}
                  {value === 2 && "Often (34-66%)"}
                  {value === 3 && "Always (67-100%)"}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review notice */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-1" size={20} />
          <div className="space-y-1">
            <p className="text-blue-800 font-medium">
              Before finishing you can:
            </p>
            <ul className="text-sm text-blue-700 list-disc list-inside">
              <li>Review your previous answers using the "Previous" button</li>
              <li>Save your progress and return later</li>
              <li>Complete the test and see your results</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-4 py-2 text-gray-600"
        >
          <ArrowLeft size={20} />
          Previous
        </button>

        <button
          onClick={onSaveAndExit}
          className="flex items-center gap-2 px-4 py-2 text-teal-600"
        >
          <Save size={20} />
          Save and exit
        </button>

        <button
          onClick={handleComplete}
          disabled={!answers.fear || !answers.avoidance}
          className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finish and see results
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LSASFinalStep; 
