'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AudioVideoCheck from '@/components/session/AudioVideoCheck';
import SUDLevelsSetup from '@/components/session/SUDLevelsSetup';
import ScenePreparation from '@/components/session/ScenePreparation';

enum SetupStep {
  CATEGORY_SELECTION,
  AUDIO_VIDEO_CHECK,
  SUD_LEVELS,
  SCENE_PREPARATION
}

const categories = [
  { id: 1, name: 'Public Speaking', icon: '🎤' },
  { id: 2, name: 'Public Places', icon: '🏢' },
  { id: 3, name: 'Shopping', icon: '🛍️' },
  { id: 4, name: 'Cinema Queue', icon: '🎬' },
  { id: 5, name: 'Restaurant', icon: '🍽️' },
  { id: 6, name: 'Bus/Coach', icon: '🚌' }
];

export default function SetupContent() {
  const [currentStep, setCurrentStep] = useState<SetupStep>(SetupStep.CATEGORY_SELECTION);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [initialSUD, setInitialSUD] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const sceneId = searchParams.get('sceneId');
  
  // In a real app, you'd fetch the scene config based on the ID
  const mockScene = {
    id: sceneId || '',
    title: 'Sample Scene',
    duration: '5 minutes',
    difficulty: 'Gentle' as const,
    category: 'Conference' as const,
    description: 'Sample description',
    minLSASScore: 0,
    maxLSASScore: 144,
    benefits: ['Sample benefit']
  };

  const handleAudioVideoComplete = () => {
    setCurrentStep(SetupStep.SUD_LEVELS);
  };

  const handleSUDComplete = (sudLevel: number) => {
    setInitialSUD(sudLevel);
    setCurrentStep(SetupStep.SCENE_PREPARATION);
  };

  const handleSceneStart = () => {
    // Navigate to the actual scene with the initial SUD level
    router.push(`/session/scene/${sceneId}?initialSUD=${initialSUD}&category=${selectedCategory}`);
  };

  return (
    <>
      {currentStep === SetupStep.CATEGORY_SELECTION && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Select a Scenario Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentStep(SetupStep.AUDIO_VIDEO_CHECK);
                }}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-lg font-medium text-gray-800">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === SetupStep.AUDIO_VIDEO_CHECK && (
        <AudioVideoCheck onComplete={handleAudioVideoComplete} />
      )}
      
      {currentStep === SetupStep.SUD_LEVELS && (
        <SUDLevelsSetup onComplete={handleSUDComplete} mode="initial" />
      )}
      
      {currentStep === SetupStep.SCENE_PREPARATION && (
        <ScenePreparation 
          scene={mockScene}
          onStart={handleSceneStart}
          categoryId={selectedCategory}
        />
      )}
    </>
  );
}
