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
  recommendation 
}) => {
  const router = useRouter();
  const [scenes, setScenes] = useState<SceneConfig[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Admin mode key sequence detection
  useEffect(() => {
    const keys: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > ADMIN_KONAMI.length) {
        keys.shift();
      }
      if (keys.join('') === ADMIN_KONAMI) {
        setIsAdminMode(true);
        setScenes(prev => enableAdminMode(prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    // In real app, fetch from API
    setScenes([
      {
        id: "scene1",
        title: "Quiet Observation",
        duration: "5 min",
        difficulty: "Gentle",
        category: "Conference",
        description: "A calm environment for initial exposure",
        minLSASScore: 0,
        maxLSASScore: 54,
        benefits: ["Minimal stress", "Guided experience"],
        locked: false
      },
      {
        id: "scene2",
        title: "Active Participation",
        duration: "10 min",
        difficulty: "Moderate",
        category: "Conference",
        description: "More engaging scenario",
        minLSASScore: 55,
        maxLSASScore: 144,
        benefits: ["Real-life simulation", "Confidence building"],
        locked: false
      },
      {
        id: "scene3",
        title: "Advanced Interaction",
        duration: "15 min",
        difficulty: "Challenging",
        category: "Conference",
        description: "Complex social interactions",
        minLSASScore: 81,
        maxLSASScore: 144,
        benefits: ["Full immersion", "Multiple interactions"],
        locked: false
      }
    ]);
  }, []);

  // Determine which difficulty levels are available based on VAT score
  const getAvailableLevels = () => {
    const allLevels = ['Basic', 'Medium', 'Extreme'];
    
    // If all levels completed, show all for next scenario
    if (completedLevels.length === 3) {
      return allLevels;
    }

    // Based on VAT recommendation
    if (recommendation === 'previous') {
      return completedLevels.length > 0 
        ? [completedLevels[0]] 
        : ['Basic'];
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

          {/* Recommendation header */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Scenes
            </h1>
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
            {scenes
              .filter(scene => scene.categoryId === categoryId)
              .map((scene) => {
                const isAvailable = availableLevels.includes(scene.difficulty);
                const isCompleted = completedLevels.includes(scene.difficulty);
              
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
                          scene.difficulty === "Gentle" ? "text-green-600" :
                          scene.difficulty === "Moderate" ? "text-orange-600" :
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
                      <div className="text-xs text-purple-600 mb-2 flex items-center gap-1">
                        <Unlock size={12} />
                        Admin Mode
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
