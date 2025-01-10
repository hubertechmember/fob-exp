'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import type { SceneConfig } from '@/types/scenes';

interface ScenePreparationProps {
  scene: SceneConfig;
  onStart: () => void;
}

const ScenePreparation: React.FC<ScenePreparationProps> = ({ scene, onStart }) => {
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
          Before We Begin
        </h2>
        <p className="text-gray-600">
          Please take a moment to review these important points:
        </p>
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
