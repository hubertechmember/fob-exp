'use client';

import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { lsasQuestions } from '@/data/lsasQuestions';

interface ReviewStepProps {
  answers: { [key: number]: { fear: number; avoidance: number } };
  onModifyAnswer: (index: number, answer: { fear: number; avoidance: number }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const ReviewStep = ({ answers, onModifyAnswer, onSubmit, onBack }: ReviewStepProps) => {

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
              <div className="space-y-6">
                {/* Fear rating */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Level of fear or anxiety:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((value) => (
                      <button
                        key={value}
                        onClick={() => onModifyAnswer(index, {
                          ...answers[index],
                          fear: value
                        })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          answers[index]?.fear === value
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
                        onClick={() => onModifyAnswer(index, {
                          ...answers[index],
                          avoidance: value
                        })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          answers[index]?.avoidance === value
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
              <div className="space-y-6">
                {/* Fear rating */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Level of fear or anxiety:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((value) => (
                      <button
                        key={value}
                        onClick={() => onModifyAnswer(index + 12, {
                          ...answers[index + 12],
                          fear: value
                        })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          answers[index + 12]?.fear === value
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
                        onClick={() => onModifyAnswer(index + 12, {
                          ...answers[index + 12],
                          avoidance: value
                        })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          answers[index + 12]?.avoidance === value
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
