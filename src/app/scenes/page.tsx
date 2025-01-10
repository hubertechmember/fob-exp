'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Unlock, AlertCircle } from 'lucide-react';
import type { SceneConfig } from '@/types/scenes';

export default function ScenesPage() {
  const router = useRouter();
  const [scenes, setScenes] = useState<SceneConfig[]>([]);
  const [showAdminUnlock, setShowAdminUnlock] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  
  useEffect(() => {
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
        difficulty: "Challenging",
        category: "Conference",
        description: "More engaging scenario",
        minLSASScore: 55,
        maxLSASScore: 144,
        benefits: ["Real-life simulation", "Confidence building"],
        locked: true
      }
    ]);
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

  const handleUnlock = () => {
    if (unlockCode === 'unlock' && selectedScene) {
      setScenes(scenes.map(scene => 
        scene.id === selectedScene ? { ...scene, locked: false } : scene
      ));
      setShowAdminUnlock(false);
      setUnlockCode('');
      setSelectedScene(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Available Scenes
          </h1>

          <div className="grid gap-6">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className="bg-white p-6 rounded-lg border border-slate-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {scene.title}
                    </h2>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span>{scene.duration}</span>
                      <span>{scene.difficulty}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{scene.description}</p>
                  </div>
                  {scene.locked ? (
                    <button
                      onClick={() => {
                        setSelectedScene(scene.id);
                        setShowAdminUnlock(true);
                      }}
                      className="text-gray-400"
                    >
                      <Lock size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push(`/session/setup?sceneId=${scene.id}`)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      Start Scene
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Admin Unlock Modal */}
          {showAdminUnlock && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Admin Unlock
                </h2>
                <input
                  type="text"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value)}
                  placeholder="Enter unlock code"
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowAdminUnlock(false);
                      setUnlockCode('');
                      setSelectedScene(null);
                    }}
                    className="px-4 py-2 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnlock}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
