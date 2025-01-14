'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Clock, AlertCircle, CheckCircle, Info, Star, Lock, Unlock } from 'lucide-react';
import type { SceneConfig } from '@/types/scenes';

const SessionQuickStart = () => {
  const router = useRouter();
  const [isReadinessChecked, setIsReadinessChecked] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<SceneConfig | null>(null);
  const [lsasScore, setLsasScore] = useState<number>(0);
  const [showAdminUnlock, setShowAdminUnlock] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  
  useEffect(() => {
    const savedScore = localStorage.getItem('lsas_score');
    if (savedScore) {
      setLsasScore(parseInt(savedScore));
    }
  }, []);

  // Admin unlock key sequence detection
  useEffect(() => {
    const keys: string[] = [];
    const konami = 'admin';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > konami.length) {
        keys.shift();
      }
      if (keys.join('') === konami) {
        setShowAdminUnlock(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUnlock = (sceneId: string) => {
    if (unlockCode === 'unlock') {
      const updatedScenarios = recommendedScenarios.map(scenario => 
        scenario.id === sceneId ? { ...scenario, locked: false } : scenario
      );
      // In real implementation, you'd want to persist this state
      setUnlockCode('');
      setShowAdminUnlock(false);
    }
  };

  const getRecommendedScenarios = (score: number): SceneConfig[] => {
    if (score >= 80) {
      return [
        {
          id: "123405",
          title: "Quiet Observation (Very Gentle)",
          duration: "5 min",
          difficulty: "Basic",
          category: "Conference",
          description: "A calm, quiet atmosphere with minimal distractions. Perfect for your first exposure to presentation situations.",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Calm environment", "Minimal distractions", "Therapist supported"],
          videoUrl: '/videos/conference/basic/quiet-observation.mp4',
          locked: false
        },
        {
          id: "130448",
          title: "Corner Observer (Gentle)",
          duration: "5 min",
          difficulty: "Basic",
          category: "WaitingRoom",
          description: "Practice being in a quiet waiting room with minimal phone interactions.",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Quiet environment", "Comfortable position", "Therapist supported"],
          videoUrl: '/videos/waiting-room/basic/corner-observer.mp4',
          locked: false
        }
      ];
    } else if (score >= 55) {
      return [
        {
          id: "124222",
          title: "Pre-presentation Waiting (Moderate)",
          duration: "5 min",
          difficulty: "Medium",
          category: "Conference",
          description: "Experience a more active environment with some audience expectations.",
          minLSASScore: 55,
          maxLSASScore: 80,
          benefits: ["Realistic setting", "Moderate challenge", "Therapist supported"],
          videoUrl: '/videos/conference/medium/pre-presentation-waiting.mp4',
          locked: false
        },
        {
          id: "131256",
          title: "Corner Observer (Moderate)",
          duration: "5 min",
          difficulty: "Moderate",
          category: "WaitingRoom",
          description: "Handle phone interactions with some attention from others.",
          minLSASScore: 55,
          maxLSASScore: 80,
          benefits: ["Natural setting", "Moderate attention", "Therapist supported"],
          videoUrl: '/videos/waiting-room/medium/corner-observer.mp4',
          locked: false
        }
      ];
    } else {
      return [
        {
          id: "125915",
          title: "Pre-presentation Waiting (Challenging)",
          duration: "5 min",
          difficulty: "Extreme",
          category: "Conference",
          description: "Navigate a more dynamic environment with various distractions.",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["Complex environment", "Multiple distractions", "Therapist supported"],
          videoUrl: '/videos/conference/extreme/pre-presentation-waiting.mp4',
          locked: true
        },
        {
          id: "132613",
          title: "Corner Observer (Challenging)",
          duration: "5 min",
          difficulty: "Challenging",
          category: "WaitingRoom",
          description: "Manage multiple phone interactions and increased attention.",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["High engagement", "Multiple interactions", "Therapist supported"],
          videoUrl: '/videos/waiting-room/extreme/corner-observer.mp4',
          locked: true
        }
      ];
    }
  };

  const recommendedScenarios = getRecommendedScenarios(lsasScore);

  // Readiness checklist
  const readinessChecklist = [
    { id: 1, text: "I have about 20-30 minutes of quiet time", essential: true },
    { id: 2, text: "I am in a quiet, private place", essential: true },
    { id: 3, text: "I have comfortable headphones on (optional)", essential: false },
    { id: 4, text: "I feel relatively rested", essential: true },
    { id: 5, text: "I have my therapist's support for this session", essential: true }
  ];

  const [checkedItems, setCheckedItems] = useState<{[key: number]: boolean}>({});

  const handleCheckItem = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const canStartSession = Object.entries(checkedItems).filter(([id, checked]) => 
    checked && readinessChecklist.find(item => item.id === parseInt(id))?.essential
  ).length === readinessChecklist.filter(item => item.essential).length && selectedScenario;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Info o dopasowaniu */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex gap-3">
          <Info className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-blue-800 font-medium">
              Scenarios matched to your social anxiety level (moderate)
            </p>
            <p className="text-blue-700 text-sm mt-1">
              We've selected scenarios with a lower difficulty level for you,
              allowing for safe and gradual adaptation to social situations.
            </p>
          </div>
        </div>
      </div>

      {/* Rekomendowane scenariusze */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Choose a scenario to begin:
        </h2>
        <div className="grid gap-4">
          {recommendedScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedScenario?.id === scenario.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800">{scenario.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {scenario.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star 
                        size={16} 
                        className={
                          scenario.difficulty === "Gentle" ? "text-green-500" :
                          scenario.difficulty === "Moderate" ? "text-orange-500" :
                          "text-red-500"
                        }
                        fill={
                          scenario.difficulty === "Gentle" ? "#22c55e" :
                          scenario.difficulty === "Moderate" ? "#f97316" :
                          "#ef4444"
                        }
                      />
                      <span className={
                        scenario.difficulty === "Gentle" ? "text-green-700" :
                        scenario.difficulty === "Moderate" ? "text-orange-700" :
                        "text-red-700"
                      }>
                        {scenario.difficulty}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{scenario.description}</p>
                </div>
                {selectedScenario?.id === scenario.id && (
                  <CheckCircle className="text-teal-600" size={24} />
                )}
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {scenario.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white rounded-full text-xs text-teal-600 border border-teal-200"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opcje rozpoczęcia */}
      <div className="space-y-6">
        {/* Natychmiastowy start */}
        <div className="bg-teal-50 p-6 rounded-lg border-2 border-teal-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Start Now
          </h2>
          
          {!isReadinessChecked ? (
            <button
              onClick={() => setIsReadinessChecked(true)}
              disabled={!selectedScenario}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={20} />
              Start selected scenario
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 mb-3">
                Confirm that you are ready:
              </p>
              <div className="space-y-3">
                {readinessChecklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <button
                      onClick={() => handleCheckItem(item.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        checkedItems[item.id] 
                          ? 'bg-teal-600 border-teal-600' 
                          : 'border-gray-300'
                      }`}
                    >
                      {checkedItems[item.id] && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <span className="text-sm text-gray-700">
                      {item.text}
                      {item.essential && 
                        <span className="text-red-500 ml-1">*</span>
                      }
                    </span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => router.push(`/session/setup?sceneId=${selectedScenario?.id}`)}
                disabled={!canStartSession}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={20} />
                Start session
              </button>
            </div>
          )}
        </div>

        {/* Safety Info with therapist information */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-orange-800 font-medium">
                Important safety reminders:
              </p>
              <ul className="mt-2 space-y-2 text-sm text-orange-700 list-disc list-inside">
                <li>You can pause or stop the session at any time</li>
                <li>You have complete control over the exposure pace</li>
                <li>The first scenario is designed to be maximally safe</li>
                <li>Remember to follow your therapist's guidance during the session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionQuickStart;
