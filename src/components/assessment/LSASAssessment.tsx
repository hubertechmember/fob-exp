'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, HelpCircle, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { lsasQuestions } from '@/data/lsasQuestions';
import LSASFinalStep from './LSASFinalStep';
import ReviewStep from './ReviewStep';

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
  const [showAdminCheat, setShowAdminCheat] = useState(false);
  
  // Admin cheat key sequence detection
  useEffect(() => {
    const keys: string[] = [];
    const konami = 'admin';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > konami.length) {
        keys.shift();
      }
      if (keys.join('') === konami) {
        setShowAdminCheat(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const score = parseInt(formData.get('score') as string);
    if (score >= 0 && score <= 144) {
      localStorage.setItem('lsas_score', score.toString());
      router.push('/assessment/results');
    }
  };

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

  if (currentStep === lsasQuestions.length) {
    return (
      <ReviewStep
        answers={answers}
        onModifyAnswer={(index, answer) => {
          setAnswers(prev => ({
            ...prev,
            [index]: answer
          }));
        }}
        onSubmit={() => {
          const totalScore = Object.values(answers).reduce((acc, curr) => {
            return acc + (curr.fear || 0) + (curr.avoidance || 0);
          }, 0);
          
          localStorage.setItem('lsas_score', totalScore.toString());
          localStorage.setItem('lsas_answers', JSON.stringify(answers));
          router.push('/assessment/results');
        }}
        onBack={() => setCurrentStep(lsasQuestions.length - 1)}
      />
    );
  }

  if (currentStep === lsasQuestions.length - 1) {
    return (
      <LSASFinalStep
        onPrevious={() => setCurrentStep(prev => prev - 1)}
        onComplete={(fear, avoidance) => {
          setAnswers(prev => ({
            ...prev,
            [currentStep]: { fear, avoidance }
          }));
          setCurrentStep(lsasQuestions.length); // Go to review step
        }}
        onSaveAndExit={handleSaveAndExit}
        previousAnswers={{
          completed: Object.keys(answers).length,
          missingResponses: lsasQuestions.length - Object.keys(answers).length,
          currentTotal: Object.values(answers).reduce((acc, curr) => 
            acc + (curr.fear || 0) + (curr.avoidance || 0), 0)
        }}
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white p-6 rounded-lg shadow-sm space-y-6"
        >
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
                <div 
                  className="absolute right-0 w-64 p-3 mt-2 text-sm bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10"
                  dangerouslySetInnerHTML={{
                    __html: type === 'fear' 
                      ? "When assessing your <b>level of fear</b>, consider how intensely you experience anxiety in these situations. Your therapist can help you better understand and measure your anxiety patterns during this session."
                      : "When evaluating your <b>avoidance patterns</b>, think about how consistently you steer clear of these scenarios. Your therapist can help analyze your behaviors and provide guidance on managing them effectively."
                  }}
                />
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
        </motion.div>
      </AnimatePresence>

      {/* Admin Cheat Panel */}
      {showAdminCheat && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex items-center gap-2 mb-3 text-gray-700">
            <Keyboard size={20} />
            <span className="font-medium">Admin Quick Score</span>
          </div>
          <form onSubmit={handleAdminSubmit} className="space-y-3">
            <input
              type="number"
              name="score"
              min="0"
              max="144"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter LSAS score (0-144)"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Skip to Results
            </button>
          </form>
        </div>
      )}

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
