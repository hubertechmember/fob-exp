'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import type { SceneConfig } from '@/types/scenes';

interface ScenePreparationProps {
  scene: SceneConfig;
  onStart: () => void;
  categoryId: number | null;
}

interface CategoryDescription {
  title: string;
  tips: string[];
}

const categoryDescriptions: { [key: number]: CategoryDescription } = {
  1: {
    title: 'Public Speaking Preparation',
    tips: [
      'Practice deep breathing exercises before starting',
      'Visualize yourself succeeding in the scenario',
      'Remember it\'s okay to pause and collect your thoughts'
    ]
  },
  2: {
    title: 'Public Places Preparation',
    tips: [
      'Focus on your breathing to stay calm',
      'Remember most people are focused on themselves',
      'Use grounding techniques if feeling overwhelmed'
    ]
  },
  3: {
    title: 'Shopping Preparation',
    tips: [
      'Have a clear goal for your shopping trip',
      'Practice polite but firm communication',
      'Remember you can always step away if needed'
    ]
  },
  4: {
    title: 'Cinema Queue Preparation',
    tips: [
      'Prepare your payment method in advance',
      'Practice patience and mindfulness',
      'Remember queues are a normal part of life'
    ]
  },
  5: {
    title: 'Restaurant Preparation',
    tips: [
      'Review the menu beforehand if possible',
      'Practice ordering in your mind',
      'Remember staff are there to help you'
    ]
  },
  6: {
    title: 'Bus/Coach Preparation',
    tips: [
      'Have your ticket/payment ready',
      'Choose a seat that feels comfortable',
      'Use headphones if you need personal space'
    ]
  }
};

const ScenePreparation: React.FC<ScenePreparationProps> = ({ scene, onStart, categoryId }) => {
  const [countdown, setCountdown] = useState(5);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowStartButton(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {categoryDescriptions[categoryId || 1].title}
        </h2>
        <p className="text-gray-600">
          Here are some tips to help you prepare:
        </p>
      </div>

      <div className="space-y-4">
        {categoryDescriptions[categoryId || 1].tips.map((tip, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 flex gap-3">
            <ShieldCheck className="text-teal-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">{tip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex gap-3">
          <Clock className="text-teal-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-800">Duration</h3>
            <p className="text-sm text-gray-600">
              This scene typically takes {scene.duration} to complete
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 flex gap-3">
          <ShieldCheck className="text-teal-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-800">Safety First</h3>
            <p className="text-sm text-gray-600">
              You can pause or end the session at any time if you feel uncomfortable
            </p>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg flex gap-3">
          <AlertCircle className="text-orange-600 flex-shrink-0" />
          <div className="text-sm text-orange-700">
            Remember to share your experience with your therapist during your next session
          </div>
        </div>
      </div>

      {!showStartButton ? (
        <div className="text-center">
          <div className="inline-block w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <span className="text-2xl font-bold">{countdown}</span>
          </div>
        </div>
      ) : (
        <button
          onClick={onStart}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Start Scene
        </button>
      )}
    </div>
  );
};

export default ScenePreparation;
