'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { lsasQuestions } from '@/data/lsasQuestions';
import LSASFinalStep from './LSASFinalStep';

type Answer = {
  fear: number;
  avoidance: number;
};

type Answers = {
  [key: number]: Answer;
};

const scaleDescriptions = {
  fear: {
    0: "None",
    1: "Mild",
    2: "Moderate",
    3: "Severe"
  },
  avoidance: {
    0: "Never (0%)",
    1: "Occasionally (1-33%)",
    2: "Often (34-66%)",
    3: "Always (67-100%)"
  }
} as const;

const LSASAssessment = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswer = (type: 'fear' | 'avoidance', value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [type]: value
      }
    }));
  };

  const handleSaveAndExit = () => {
    localStorage.setItem('lsas_answers', JSON.stringify(answers));
    router.push('/dashboard');
  };

  const handleComplete = (fearValue: number, avoidanceValue: number) => {
    const finalAnswers = {
      ...answers,
      [lsasQuestions.length - 1]: {
        fear: fearValue,
        avoidance: avoidanceValue
      }
    };

    const totalScore = Object.values(finalAnswers).reduce((acc, curr) => {
      return acc + (curr.fear || 0) + (curr.avoidance || 0);
    }, 0);
    
    localStorage.setItem('lsas_score', totalScore.toString());
    localStorage.setItem('lsas_answers', JSON.stringify(finalAnswers));
    router.push('/assessment/results');
  };

  const canProceed = answers[currentStep]?.fear !== undefined && 
                    answers[currentStep]?.avoidance !== undefined;

  if (currentStep === lsasQuestions.length - 1) {
    const previousAnswers = {
      completed: Object.keys(answers).length,
      missingResponses: 0,
      currentTotal: Object.values(answers).reduce((acc, curr) => 
        acc + (curr.fear || 0) + (curr.avoidance || 0), 0)
    };

    return (
      <LSASFinalStep
        onPrevious={() => setCurrentStep(prev => prev - 1)}
        onComplete={handleComplete}
        onSaveAndExit={handleSaveAndExit}
        previousAnswers={previousAnswers}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Situation {currentStep + 1} of {lsasQuestions.length}</span>
          <span>{Math.round((currentStep / (lsasQuestions.length - 1)) * 100)}% completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (lsasQuestions.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {lsasQuestions[currentStep].situation}
          </h2>
          <p className="text-gray-600 text-sm">
            {lsasQuestions[currentStep].examples}
          </p>
        </div>

        {/* Rating sections */}
        {['fear', 'avoidance'].map((type) => (
          <div key={type} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">
                {type === 'fear' ? 'Level of fear or anxiety:' : 'Frequency of avoidance:'}
              </h3>
              <div className="relative group">
                <button className="text-teal-600 hover:text-teal-700">
                  <HelpCircle size={20} />
                </button>
                <div className="absolute right-0 w-64 p-3 mt-2 text-sm bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  {type === 'fear' 
                    ? "If you're unsure about rating your fear level, consider discussing specific situations with your therapist to better understand your anxiety patterns."
                    : "If you're uncertain about how often you avoid situations, your therapist can help analyze your behavioral patterns and provide guidance on assessment."
                  }
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(scaleDescriptions[type as keyof typeof scaleDescriptions]).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(type as 'fear' | 'avoidance', parseInt(value))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    answers[currentStep]?.[type as keyof Answer] === parseInt(value)
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-200'
                  }`}
                >
                  <div className="text-lg font-bold text-center">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50"
        >
          <ArrowLeft size={20} />
          Previous
        </button>

        <button
          onClick={handleSaveAndExit}
          className="flex items-center gap-2 px-4 py-2 text-teal-600"
        >
          <Save size={20} />
          Save and exit
        </button>

        <button
          onClick={() => {
            if (currentStep < lsasQuestions.length - 1) {
              setCurrentStep(prev => prev + 1);
            }
          }}
          disabled={!canProceed}
          className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === lsasQuestions.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LSASAssessment; 
