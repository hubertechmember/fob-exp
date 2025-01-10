'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import InitialAssessmentSVG from './InitialAssessmentSVG';

const InitialAssessment = () => {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Initial Assessment (LSAS)
            </h2>
            <p className="text-gray-600">
              Before we begin, we would like to better understand your experiences with social anxiety.
            </p>
          </div>
          <div className="w-32">
            <InitialAssessmentSVG />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">
            Why this matters:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-600">
              • Helps personalize your therapy plan
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              • Enables more accurate progress tracking
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              • Allows for better session recommendations
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>• 24 situations to evaluate</span>
            <span>• Takes approximately 10-15 minutes</span>
            <span>• Can be completed later if needed</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button 
            onClick={() => router.push('/assessment/lsas')}
            className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Start Assessment
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialAssessment; 
