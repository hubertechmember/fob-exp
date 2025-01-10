'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AudioVideoCheck from '@/components/session/AudioVideoCheck';
import SUDLevelsSetup from '@/components/session/SUDLevelsSetup';
import ScenePreparation from '@/components/session/ScenePreparation';

enum SetupStep {
  AUDIO_VIDEO_CHECK,
  SUD_LEVELS,
  SCENE_PREPARATION
}

export default function SessionSetup() {
  const [currentStep, setCurrentStep] = useState<SetupStep>(SetupStep.AUDIO_VIDEO_CHECK);
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
    router.push(`/session/scene/${sceneId}?initialSUD=${initialSUD}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {currentStep === SetupStep.AUDIO_VIDEO_CHECK && (
            <AudioVideoCheck onComplete={handleAudioVideoComplete} />
          )}
          
          {currentStep === SetupStep.SUD_LEVELS && (
            <SUDLevelsSetup onComplete={handleSUDComplete} />
          )}
          
          {currentStep === SetupStep.SCENE_PREPARATION && (
            <ScenePreparation 
              scene={mockScene}
              onStart={handleSceneStart}
            />
          )}
        </div>
      </main>
    </div>
  );
}
