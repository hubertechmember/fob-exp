'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, Pause, Play, StopCircle } from 'lucide-react';
import SUDLevelsSetup from '@/components/session/SUDLevelsSetup';
import type { SceneConfig } from '@/types/scenes';
import type { SceneSession } from '@/types/vat';

export default function ScenePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scene, setScene] = useState<SceneConfig | null>(null);
  const [session, setSession] = useState<SceneSession>({
    sceneId: params.id as string,
    startTime: new Date(),
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSUDPrompt, setShowSUDPrompt] = useState(false);
  const initialSUD = parseInt(searchParams.get('initialSUD') || '0');

  useEffect(() => {
    // In real app, fetch scene details from API
    setScene({
      id: params.id as string,
      title: 'Sample Scene',
      duration: '5 minutes',
      difficulty: 'Gentle',
      category: 'Conference',
      description: 'Sample description',
      minLSASScore: 0,
      maxLSASScore: 144,
      benefits: ['Sample benefit']
    });
  }, [params.id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowSUDPrompt(true);
  };

  const handleSUDComplete = (sudPost: number) => {
    const endTime = new Date();
    const totalDuration = 300; // 5 minutes in seconds
    const actualDuration = (endTime.getTime() - session.startTime.getTime()) / 1000;
    
    const updatedSession: SceneSession = {
      ...session,
      endTime,
      vatMetrics: {
        sudPre: initialSUD,
        sudPost,
        lengthRatio: Math.min(actualDuration / totalDuration, 1),
        awarenessRatio: 1, // This would come from actual awareness checks
      }
    };

    // In real app, save session data to backend
    console.log('Session completed:', updatedSession);
    
    router.push('/dashboard');
  };

  if (!scene) {
    return <div>Loading...</div>;
  }

  if (showSUDPrompt) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <SUDLevelsSetup onComplete={handleSUDComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{scene.title}</h1>
            <p className="text-sm text-gray-600">Duration: {scene.duration}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={handleStop}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <StopCircle size={24} />
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Therapist notice */}
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium">
                  Your therapist is monitoring this session
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  They are available to help if you need support during the exposure.
                  You can stop or pause the session at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Scene placeholder - in MVP we just show duration */}
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {isPlaying ? "Scene in progress..." : "Scene paused"}
            </div>
            <p className="text-gray-600">
              Initial anxiety level: {initialSUD}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
