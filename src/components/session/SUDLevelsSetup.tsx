'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface SUDLevelsSetupProps {
  mode: 'initial' | 'during' | 'final' | 'paused' | 'stopped';
  onComplete: (level: number) => void;
  initialSUD?: number;
  lengthRatio?: number;
  awarenessRatio?: number;
}

const getAnxietyDescription = (level: number): string => {
  if (level <= 10) return "Completely relaxed, no anxiety at all";
  if (level <= 20) return "Very slight anxiety, barely noticeable";
  if (level <= 30) return "Mild anxiety, but still comfortable";
  if (level <= 40) return "Noticeable but manageable anxiety";
  if (level <= 50) return "Moderate anxiety, starting to feel uncomfortable";
  if (level <= 60) return "Distinctly uncomfortable anxiety";
  if (level <= 70) return "Strong anxiety, difficult to concentrate";
  if (level <= 80) return "Very intense anxiety, hard to think clearly";
  if (level <= 90) return "Severe anxiety, almost at panic level";
  return "Extreme anxiety, maximum distress";
};

const SUDLevelsSetup: React.FC<SUDLevelsSetupProps> = ({ 
  mode, 
  onComplete, 
  initialSUD, 
  lengthRatio = 1, 
  awarenessRatio = 1 
}) => {
  const [sudLevel, setSudLevel] = useState<number>(50);
  const [vatScore, setVatScore] = useState<number | null>(null);

  useEffect(() => {
    if (mode === 'final' && initialSUD !== undefined) {
      const score = (2 * (sudLevel - initialSUD) / (lengthRatio + awarenessRatio) + sudLevel) / 2;
      setVatScore(score);
    }
  }, [sudLevel, initialSUD, lengthRatio, awarenessRatio, mode]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {mode === 'initial' && 'Initial Anxiety Level Setup'}
          {mode === 'during' && 'Current Anxiety Level'}
          {mode === 'final' && 'Final Anxiety Assessment'}
        </h2>
        <p className="text-gray-600">
          {mode === 'initial' && 'Please indicate your current anxiety level on a scale from 0 to 100:'}
          {mode === 'during' && 'While the scene is paused, please rate your current anxiety level:'}
          {mode === 'final' && "Now that you've ended the session, please rate your final anxiety level:"}
        </p>
        {mode === 'final' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                This will help us evaluate your progress and determine the next steps in your therapy journey.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>No anxiety (0)</span>
          <span>Extreme anxiety (100)</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={sudLevel}
          onChange={(e) => setSudLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="text-center space-y-2">
          <span className="text-2xl font-bold text-teal-600">{sudLevel}</span>
          <p className="text-sm text-gray-600">{getAnxietyDescription(sudLevel)}</p>
          {mode === 'final' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              {vatScore !== null ? (
                <>
                  <p className="text-sm font-medium text-gray-700">Projected VAT Score</p>
                  <p className="text-2xl font-bold text-teal-600">{vatScore.toFixed(1)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on initial SUD: {initialSUD}, length ratio: {(lengthRatio * 100).toFixed(0)}%, 
                    awareness ratio: {(awarenessRatio * 100).toFixed(0)}%
                  </p>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-600">Unable to calculate VAT score</p>
                  <ul className="text-xs text-red-500 list-disc list-inside">
                    {!initialSUD && <li>Initial SUD level missing</li>}
                    {!lengthRatio && <li>Length ratio not recorded</li>}
                    {!awarenessRatio && <li>Awareness ratio not available</li>}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            This will help us track your progress during the session. You can always adjust this later.
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete(sudLevel)}
        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default SUDLevelsSetup;

