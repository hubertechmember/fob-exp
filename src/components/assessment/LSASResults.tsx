'use client';

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  ChevronRight, 
  FileText, 
  Play,
  ArrowRight,
  Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const LSASResults = () => {
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  // Funkcja określająca wariant wyniku
  const getResultVariant = (score: number) => {
    if (score <= 54) return {
      level: 'No social phobia',
      color: 'green',
      description: 'Your score indicates no clinical social phobia. We can focus on prevention and further development of social skills.',
      nextSteps: [
        'Optional exposure sessions for development',
        'Stress management techniques',
        'Building self-confidence'
      ]
    };
    if (score <= 65) return {
      level: 'Mild social phobia',
      color: 'yellow',
      description: 'You are experiencing mild symptoms of social anxiety. This is a good time to start therapy before symptoms intensify.',
      nextSteps: [
        'Starting with mild exposures',
        'Learning relaxation techniques',
        'Regular therapy sessions'
      ]
    };
    if (score <= 80) return {
      level: 'Moderate social phobia',
      color: 'orange',
      description: 'Your level of social anxiety is moderate. Exposure therapy can significantly improve your quality of life.',
      nextSteps: [
        'Regular exposure sessions',
        'Working with automatic thoughts',
        'Progress from Gentle to Moderate scenes'
      ]
    };
    if (score <= 95) return {
      level: 'Severe social phobia',
      color: 'red',
      description: 'You are experiencing significant social anxiety. We recommend systematic therapeutic work in a safe environment.',
      nextSteps: [
        'Structured exposure sessions',
        'Consistent therapist support',
        'Focus on Gentle difficulty scenes'
      ]
    };
    return {
      level: 'Very severe social phobia',
      color: 'red',
      description: 'Your level of social anxiety is very high. We will start with small, safe steps in a controlled environment.',
      nextSteps: [
        'Sessions at your own pace',
        'Regular therapist support',
        'Starting with Gentle scenes only'
      ]
    };
  };

  useEffect(() => {
    const savedScore = localStorage.getItem('lsas_score');
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  const result = getResultVariant(score);
  const colorVariants = {
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-amber-50 border-amber-200 text-amber-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    red: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          LSAS Assessment Results
        </h1>
        <p className="text-gray-600">
          Thank you for completing the questionnaire. Here are your results and next steps.
        </p>
      </div>

      {/* Score Display */}
      <div className={`p-6 rounded-lg border ${colorVariants[result.color]} space-y-4`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{result.level}</h2>
            <p className="mt-1 text-sm opacity-90">Total score: {score}/144 points</p>
          </div>
          <div className="h-16 w-16 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>
        <p>{result.description}</p>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-800 mb-2">Anxiety Level</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Partial score:</span>
              <span className="font-medium">{Math.round(score/2)}/72</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${(Math.round(score/2)/72)*100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-800 mb-2">Avoidance Level</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Partial score:</span>
              <span className="font-medium">{Math.round(score/2)}/72</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${(Math.round(score/2)/72)*100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="font-medium text-gray-800">Next Steps</h3>
        <div className="space-y-3">
          {result.nextSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <ChevronRight className="text-teal-600" size={20} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => router.push('/dashboard')}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Play size={20} />
          Start first session
        </button>
        <button className="flex items-center justify-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
          <Download size={20} />
          Download PDF report
        </button>
      </div>

      {/* Skip option for specific score ranges */}
      {score <= 54 && (
        <div className="text-center">
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            Skip session planning and continue
          </button>
        </div>
      )}
    </div>
  );
};

export default LSASResults; 
