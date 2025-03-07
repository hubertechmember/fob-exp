'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, Play, AlertCircle, Unlock } from 'lucide-react';
import { enableAdminMode, ADMIN_KONAMI } from '@/utils/adminMode';
import type { SceneConfig } from '@/types/scenes';

interface VATRecommendationsProps {
  vatScore: number;
  recommendation: 'proceed' | 'repeat' | 'previous';
  categoryId: number;
  scenarioId: string;
  completedLevels: string[];
}

const VATRecommendations: React.FC<VATRecommendationsProps> = ({ 
  vatScore, 
  recommendation,
  categoryId,
  scenarioId,
  completedLevels 
}) => {
  const router = useRouter();
  const [scenes, setScenes] = useState<SceneConfig[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [adminInput, setAdminInput] = useState('');
  
  // Admin mode detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setAdminInput(prev => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setAdminInput(prev => (prev + e.key).toLowerCase());
      }
      
      if (adminInput.endsWith('admin')) {
        setIsAdminMode(prev => !prev);
        setAdminInput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adminInput]);

  React.useEffect(() => {
    const parseScenes = () => {
      const allScenes: SceneConfig[] = [
        // Public Speaking
        {
          id: "123405",
          title: "Pre-Speech Waiting - Basic",
          duration: "5 min",
          difficulty: "Basic",
          category: "Conference",
          description: "User as observer waiting for their speech to begin",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Minimal stress", "Guided experience"],
          videoUrl: '/videos/conference/basic/pre-speech.mp4',
          locked: false
        },
        {
          id: "124222",
          title: "Pre-Speech Waiting - Medium",
          duration: "10 min",
          difficulty: "Medium",
          category: "Conference",
          description: "Louder environment with audience expectations",
          minLSASScore: 55,
          maxLSASScore: 144,
          benefits: ["Real-life simulation", "Confidence building"],
          videoUrl: '/videos/conference/medium/pre-speech.mp4',
          locked: false
        },
        {
          id: "125915",
          title: "Pre-Speech Waiting - Extreme",
          duration: "15 min",
          difficulty: "Extreme",
          category: "Conference",
          description: "Maximum pre-speech anxiety triggers",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["Full immersion", "Multiple interactions"],
          videoUrl: '/videos/conference/extreme/pre-speech.mp4',
          locked: false
        },
        // Add other scenarios from categories-videos.md...
      ];

      // Filter scenes based on category and eligibility
      const filteredScenes = allScenes.filter(scene => 
        scene.category === (categoryId === 1 ? 'Conference' : 'WaitingRoom') &&
        (isAdminMode || 
          (vatScore >= scene.minLSASScore && vatScore <= scene.maxLSASScore))
      );

      setScenes(filteredScenes);
    };

    parseScenes();
  }, [categoryId, vatScore, isAdminMode]);

  // Determine which difficulty levels are available based on VAT score
  const getAvailableLevels = () => {
    const allLevels = ['Basic', 'Medium', 'Extreme'];
    
    // If all levels completed, show all for next scenario
    if (completedLevels.length === 3) {
      return allLevels;
    }

    // Based on VAT recommendation
    if (recommendation === 'previous') {
      // Always show at least Basic level
      return ['Basic'];
    }
    if (recommendation === 'repeat') {
      return completedLevels.length > 1
        ? completedLevels.slice(0, 2)
        : ['Basic', 'Medium'];
    }
    
    // For 'proceed', show next level if available
    const nextLevel = allLevels[completedLevels.length];
    return nextLevel 
      ? [...completedLevels, nextLevel]
      : allLevels;
  };

  const availableLevels = getAvailableLevels();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with back button and progress */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Completed Levels:</span>
              <div className="flex gap-1">
                {['Basic', 'Medium', 'Extreme'].map(level => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded-full ${
                      completedLevels.includes(level)
                        ? 'bg-teal-600'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* VAT Calculation Details */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">VAT Calculation Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">VAT Score</h3>
                  <div className="text-2xl font-bold text-teal-600">
                    {vatScore.toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    (Validated Anxiety Treatment Score)
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recommendation</h3>
                  <div className={`text-lg font-medium ${
                    recommendation === 'proceed' ? 'text-green-600' :
                    recommendation === 'repeat' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {recommendation}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Calculation Formula</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>VAT = (2 × (SUD_post - SUD_pre) / (Length_ratio + Awareness_ratio) + SUD_post) / 2</p>
                  <p className="text-xs text-gray-500">
                    Where:
                    <br/>- SUD = Subjective Units of Distress
                    <br/>- Length_ratio = Actual duration / Planned duration
                    <br/>- Awareness_ratio = Focus level during exposure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Scenes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended Scenes
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">
                    Based on your VAT score: {vatScore.toFixed(1)}
                  </p>
                  <p className="text-blue-700 text-sm mt-1">
                    {recommendation === 'proceed' && "You can proceed with scenes of any difficulty level"}
                    {recommendation === 'repeat' && "We recommend staying with Gentle to Moderate difficulty scenes"}
                    {recommendation === 'previous' && "We suggest focusing on Gentle difficulty scenes"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scene grid */}
          <div className="grid gap-6">
            {scenes.map((scene) => {
              const isAvailable = availableLevels.includes(scene.difficulty);
              const isCompleted = completedLevels.includes(scene.difficulty);
              const isEligible = vatScore >= scene.minLSASScore && vatScore <= scene.maxLSASScore;
              
              return (
                <div
                  key={scene.id}
                  className={`bg-white p-6 rounded-lg border ${
                    isAvailable ? 'border-slate-200' : 'border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {scene.title}
                      </h2>
                      <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <span>{scene.duration}</span>
                        <span className={
                          scene.difficulty === "Basic" ? "text-green-600" :
                          scene.difficulty === "Medium" ? "text-orange-600" :
                          "text-red-600"
                        }>
                          {scene.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{scene.description}</p>
                      
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {scene.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {isAdminMode && (
                      <div className="text-xs mb-2 flex flex-col gap-1">
                        <div className="text-purple-600 flex items-center gap-1">
                          <Unlock size={12} />
                          Admin Mode
                        </div>
                        <div className={`text-xs ${
                          isEligible ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isEligible ? 'Eligible' : 'Not Eligible'} for Patient
                        </div>
                        <div className="text-xs text-gray-600">
                          LSAS Range: {scene.minLSASScore}-{scene.maxLSASScore}
                        </div>
                      </div>
                    )}
                    {isAvailable || isAdminMode ? (
                      <button
                        onClick={() => router.push(
                          `/session/setup?sceneId=${scene.id}` +
                          `&category=${categoryId}` +
                          `&completedLevels=${completedLevels.join(',')}`
                        )}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
                      >
                        <Play size={16} />
                        Start Scene
                      </button>
                    ) : (
                      <div className="text-gray-400">
                        <Lock size={20} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VATRecommendations;
