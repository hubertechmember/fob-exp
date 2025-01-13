'use client';

import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  answers: { [key: number]: { fear: number; avoidance: number } };
  onModifyAnswer: (index: number, answer: { fear: number; avoidance: number }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const ReviewStep = ({ answers, onModifyAnswer, onSubmit, onBack }: ReviewStepProps) => {
  import { lsasQuestions } from '@/data/lsasQuestions';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
        <div className="flex items-center gap-2 text-teal-800">
          <CheckCircle size={20} />
          <span className="font-medium">Review your answers before final submission</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column (1-12) */}
        <div className="space-y-4">
          {lsasQuestions.slice(0, 12).map((question: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">
                {index + 1}. {question.situation}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Fear:</label>
                  <select
                    value={answers[index]?.fear ?? ''}
                    onChange={(e) => onModifyAnswer(index, {
                      ...answers[index],
                      fear: parseInt(e.target.value)
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="0">0 - None</option>
                    <option value="1">1 - Mild</option>
                    <option value="2">2 - Moderate</option>
                    <option value="3">3 - Severe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Avoidance:</label>
                  <select
                    value={answers[index]?.avoidance ?? ''}
                    onChange={(e) => onModifyAnswer(index, {
                      ...answers[index],
                      avoidance: parseInt(e.target.value)
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="0">0 - Never</option>
                    <option value="1">1 - Occasionally</option>
                    <option value="2">2 - Often</option>
                    <option value="3">3 - Always</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (13-24) */}
        <div className="space-y-4">
          {lsasQuestions.slice(12).map((question: any, index: number) => (
            <div key={index + 12} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">
                {index + 13}. {question.situation}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Fear:</label>
                  <select
                    value={answers[index + 12]?.fear ?? ''}
                    onChange={(e) => onModifyAnswer(index + 12, {
                      ...answers[index + 12],
                      fear: parseInt(e.target.value)
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="0">0 - None</option>
                    <option value="1">1 - Mild</option>
                    <option value="2">2 - Moderate</option>
                    <option value="3">3 - Severe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Avoidance:</label>
                  <select
                    value={answers[index + 12]?.avoidance ?? ''}
                    onChange={(e) => onModifyAnswer(index + 12, {
                      ...answers[index + 12],
                      avoidance: parseInt(e.target.value)
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="0">0 - Never</option>
                    <option value="1">1 - Occasionally</option>
                    <option value="2">2 - Often</option>
                    <option value="3">3 - Always</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600"
        >
          <ArrowLeft size={20} />
          Back to last question
        </button>

        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Submit final answers
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
