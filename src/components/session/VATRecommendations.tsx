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
    // Fetch scenes based on category and recommendation
    const fetchScenes = async () => {
      try {
        // In real app, this would be an API call
        const categoryScenes = {
          1: [ // Public Speaking
            {
              id: "scene1",
              title: "Pre-Speech Waiting",
              duration: "5 min",
              difficulty: "Basic",
              categoryId: 1,
              description: "Waiting for your speech to begin",
              minLSASScore: 0,
              maxLSASScore: 54,
              benefits: ["Minimal stress", "Guided experience"],
              locked: false
            },
            {
              id: "scene2",
              title: "Audience Expectations",
              duration: "10 min",
              difficulty: "Medium",
              categoryId: 1,
              description: "Audience expressing expectations",
              minLSASScore: 55,
              maxLSASScore: 144,
              benefits: ["Real-life simulation", "Confidence building"],
              locked: false
            },
            {
              id: "scene3",
              title: "Maximum Anxiety Triggers",
              duration: "15 min",
              difficulty: "Extreme",
              categoryId: 1,
              description: "Maximum pre-speech anxiety triggers",
              minLSASScore: 81,
              maxLSASScore: 144,
              benefits: ["Full immersion", "Multiple interactions"],
              locked: false
            }
          ],
          2: [ // Public Places
            {
              id: "scene4",
              title: "Corner Observer",
              duration: "5 min",
              difficulty: "Basic",
              categoryId: 2,
              description: "Minimal reactions in public space",
              minLSASScore: 0,
              maxLSASScore: 54,
              benefits: ["Low intensity", "Observation practice"],
              locked: false
            },
            {
              id: "scene5",
              title: "Moderate Attention",
              duration: "10 min",
              difficulty: "Medium",
              categoryId: 2,
              description: "Moderate attention in public space",
              minLSASScore: 55,
              maxLSASScore: 144,
              benefits: ["Social awareness", "Confidence building"],
              locked: false
            },
            {
              id: "scene6",
              title: "Maximum Social Pressure",
              duration: "15 min",
              difficulty: "Extreme",
              categoryId: 2,
              description: "Maximum social pressure scenario",
              minLSASScore: 81,
              maxLSASScore: 144,
              benefits: ["Full immersion", "Stress management"],
              locked: false
            }
          ]
          // Add other categories...
        };

        setScenes(categoryScenes[categoryId] || []);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchScenes();
  }, [categoryId]);

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
