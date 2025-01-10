'use client';

import React, { useState, useEffect } from 'react';
import { Play, Clock, AlertCircle, CheckCircle, Info, Star, Lock, Unlock } from 'lucide-react';
import type { SceneConfig } from '@/types/scenes';

const SessionQuickStart = () => {
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
    if (score <= 54) {
      return [
        {
          id: "123405",
          title: "Pre-presentation Waiting (Gentle)",
          duration: "5 min",
          difficulty: "Gentle",
          category: "Conference",
          description: "A calm, quiet atmosphere with minimal distractions. Perfect for your first exposure to presentation situations.",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Calm environment", "Minimal distractions", "Therapist-guided"],
          locked: false
        },
        {
          id: "130448",
          title: "Corner Observer (Gentle)",
          duration: "5 min",
          difficulty: "Gentle",
          category: "WaitingRoom",
          description: "Practice being in a quiet waiting room with minimal phone interactions.",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Quiet environment", "Comfortable position", "Low pressure"],
          locked: false
        }
      ];
    } else if (score <= 80) {
      return [
        {
          id: "124222",
          title: "Pre-presentation Waiting (Moderate)",
          duration: "5 min",
          difficulty: "Moderate",
          category: "Conference",
          description: "Experience a more active environment with some audience expectations.",
          minLSASScore: 55,
          maxLSASScore: 80,
          benefits: ["Realistic setting", "Moderate challenge", "Guided exposure"],
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
          benefits: ["Natural setting", "Moderate attention", "Controlled exposure"],
          locked: false
        }
      ];
    } else {
      return [
        {
          id: "125915",
          title: "Pre-presentation Waiting (Challenging)",
          duration: "5 min",
          difficulty: "Challenging",
          category: "Conference",
          description: "Navigate a more dynamic environment with various distractions.",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["Complex environment", "Multiple distractions", "Professional support"],
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
          benefits: ["High engagement", "Multiple interactions", "Intensive support"],
          locked: true
        }
      ];
    }
  };

  const recommendedScenarios = getRecommendedScenarios(lsasScore);

  // Lista kontrolna gotowości
  const readinessChecklist = [
    { id: 1, text: "Mam około 20-30 minut spokojnego czasu", essential: true },
    { id: 2, text: "Jestem w cichym, prywatnym miejscu", essential: true },
    { id: 3, text: "Mam na sobie wygodne słuchawki (opcjonalnie)", essential: false },
    { id: 4, text: "Czuję się względnie wypoczęty/a", essential: true }
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
              Scenariusze dopasowane do Twojego poziomu lęku społecznego (umiarkowany)
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Wybraliśmy dla Ciebie scenariusze o niższym poziomie trudności, 
              które pozwolą na bezpieczne i stopniowe oswajanie się z sytuacjami społecznymi.
            </p>
          </div>
        </div>
      </div>

      {/* Rekomendowane scenariusze */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Wybierz scenariusz do rozpoczęcia:
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
                      <Star size={16} />
                      {scenario.difficulty}
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
            Rozpocznij teraz
          </h2>
          
          {!isReadinessChecked ? (
            <button
              onClick={() => setIsReadinessChecked(true)}
              disabled={!selectedScenario}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={20} />
              Rozpocznij wybrany scenariusz
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 mb-3">
                Potwierdź, że jesteś gotowy/a:
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
                disabled={!canStartSession}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={20} />
                Rozpocznij sesję
              </button>
            </div>
          )}
        </div>

        {/* Safety Info z informacją o terapeucie */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-orange-800 font-medium">
                Ważne przypomnienie:
              </p>
              <ul className="mt-2 space-y-2 text-sm text-orange-700 list-disc list-inside">
                <li>Upewnij się, że masz wsparcie swojego terapeuty podczas realizacji sesji</li>
                <li>Możesz przerwać sesję w dowolnym momencie</li>
                <li>Całkowicie kontrolujesz tempo ekspozycji</li>
                <li>Pierwszy scenariusz jest maksymalnie bezpieczny</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionQuickStart;
