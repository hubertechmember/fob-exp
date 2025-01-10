import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressStep = ({ number, isActive }) => (
  <div className="flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
      isActive ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
    }`}>
      {number}
    </div>
    {number < 4 && (
      <div className="w-24 h-0.5 bg-gray-200 mx-2" />
    )}
  </div>
);

const InitialAssessment = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment/lsas');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-8 h-8 rounded-full bg-teal-600" />
          <span className="ml-3 text-gray-800 font-semibold">FOBOS</span>
        </div>
      </nav>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex justify-center">
          {[1, 2, 3, 4].map((step) => (
            <ProgressStep key={step} number={step} isActive={step === 1} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Initial Assessment (LSAS)
          </h1>

          {/* Benefits Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-teal-600">
              Why this matters:
            </h2>
            <div className="mt-2 bg-teal-50 border border-teal-200 rounded-md p-4">
              <ul className="space-y-3 text-teal-900">
                <li>• Helps personalize your therapy plan</li>
                <li>• Enables more accurate progress tracking</li>
                <li>• Allows for better session recommendations</li>
              </ul>
            </div>
          </div>

          {/* Assessment Info */}
          <div className="mt-8">
            <ul className="space-y-2 text-gray-700">
              <li>• 24 situations to evaluate</li>
              <li>• Takes approximately 10-15 minutes</li>
              <li>• Can be completed later if needed</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-12">
            <div className="flex items-start space-x-4">
              <button
                onClick={handleStartAssessment}
                className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Start Assessment
              </button>
              <button
                onClick={handleSkip}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip
              </button>
              <div className="ml-4">
                <p className="text-sm text-gray-400">
                  You can skip this step, but it's highly recommended
                </p>
                <p className="text-sm text-gray-400">
                  to complete it for optimal therapy results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialAssessment; 