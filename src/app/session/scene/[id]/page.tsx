'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, Pause, Play, StopCircle } from 'lucide-react';
import SUDLevelsSetup from '@/components/session/SUDLevelsSetup';
import type { SceneConfig } from '@/types/scenes';
import type { SceneSession, VATMetrics, VATResult } from '@/types/vat';
import { calculateVATScore } from '@/utils/vatCalculator';
import { scenarios, Scenario } from '@/data/scenarios';

export default function ScenePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scene, setScene] = useState<SceneConfig | null>(null);
  const [session, setSession] = useState<SceneSession>({
    sceneId: params.id as string,
    startTime: new Date(),
    lengthRatio: 0
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Basic' | 'Medium' | 'Extreme'>('Basic');
  const [watScore, setWatScore] = useState<number | null>(null);
  const [scenarioDetails, setScenarioDetails] = useState<Scenario[]>([
    {
      id: "123405",
      title: "Pre-Speech Waiting",
      duration: "5 min",
      description: "User as observer waiting for their speech to begin",
      minLSASScore: 0,
      maxLSASScore: 54,
      benefits: ["Minimal stress", "Guided experience"],
      videoUrl: '/videos/public-speaking/basic/pre-speech.mp4',
      difficulty: 'Basic',
      category: 'Conference'
    },
    {
      id: "124222",
      title: "Pre-Speech Waiting",
      description: "Audience expressing expectations",
      duration: "10 min",
      minLSASScore: 55,
      maxLSASScore: 144,
      benefits: ["Real-life simulation", "Confidence building"],
      videoUrl: '/videos/public-speaking/medium/pre-speech.mp4',
      difficulty: 'Medium',
      category: 'Conference'
    },
    {
      id: "125915",
      title: "Pre-Speech Waiting",
      description: "Maximum pre-speech anxiety triggers",
      duration: "15 min",
      minLSASScore: 81,
      maxLSASScore: 144,
      benefits: ["Full immersion", "Multiple interactions"],
      videoUrl: '/videos/public-speaking/extreme/pre-speech.mp4',
      difficulty: 'Extreme',
      category: 'Conference'
    }
  ]);
  const [currentScenario, setCurrentScenario] = useState<number>(0);
  const [showSUDPrompt, setShowSUDPrompt] = useState(false);
  const [vatMetrics, setVatMetrics] = useState<VATMetrics | null>(null);
  const [vatResult, setVatResult] = useState<VATResult | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const initialSUD = parseInt(searchParams.get('initialSUD') || '0');
  const categoryId = parseInt(searchParams.get('category') || '1');

  const getScenarioDetails = (categoryId: number) => {
    const category = scenarios[categoryId as keyof typeof scenarios];
    if (!category) return [];
    
    return [
      ...category.levels.Basic.map(s => ({ ...s, difficulty: 'Basic' })),
      ...category.levels.Medium.map(s => ({ ...s, difficulty: 'Medium' })),
      ...category.levels.Extreme.map(s => ({ ...s, difficulty: 'Extreme' }))
    ];
  };

  const handleDifficultyChange = (difficulty: 'Basic' | 'Medium' | 'Extreme') => {
    setSelectedDifficulty(difficulty);
    setCurrentScenario(getScenarioDetails(categoryId)
      .findIndex(s => s.difficulty === difficulty));
  };

  const getNextScenario = () => {
    const scenarios = getScenarioDetails(categoryId);
    if (watScore !== null) {
      if (watScore <= 30) {
        // Progress to next difficulty
        const nextIndex = currentScenario + 1;
        if (nextIndex < scenarios.length) {
          setCurrentScenario(nextIndex);
          setSelectedDifficulty(scenarios[nextIndex].difficulty as 'Basic' | 'Medium' | 'Extreme');
        }
      } else if (watScore > 40) {
        // Return to previous difficulty
        const prevIndex = currentScenario - 1;
        if (prevIndex >= 0) {
          setCurrentScenario(prevIndex);
          setSelectedDifficulty(scenarios[prevIndex].difficulty as 'Basic' | 'Medium' | 'Extreme');
        }
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && countdown === 0) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, countdown]);

  useEffect(() => {
    // Set initial scene
    if (scenarioDetails.length > 0) {
      setScene(scenarioDetails[0]);
    }
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      setShowSUDPrompt(true);
      setIsPlaying(false);
    } else {
      setCountdown(5);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    const videoLength = 300; // 5 minutes in seconds
    const lengthRatio = Math.min(elapsedTime / videoLength, 1);
    setSession(prev => ({
      ...prev,
      lengthRatio: lengthRatio
    }));
    setShowSUDPrompt(true);
  };

  const handleSUDComplete = (sudPost: number) => {
    const endTime = new Date();
    const totalDuration = 300; // 5 minutes in seconds
    const actualDuration = (endTime.getTime() - session.startTime.getTime()) / 1000;
    
    const metrics: VATMetrics = {
      sudPre: initialSUD,
      sudPost,
      lengthRatio: session.lengthRatio || Math.min(actualDuration / totalDuration, 1),
      awarenessRatio: 1 // This would come from actual awareness checks
    };

    const result = calculateVATScore(metrics);
    
    setVatMetrics(metrics);
    setVatResult(result);
    setShowSUDPrompt(false);

    // Only end session if stopped, not paused
    if (!isPlaying) {
      const updatedSession: SceneSession = {
        ...session,
        endTime,
        vatMetrics: metrics,
        vatResult: result
      };

      // In real app, save session data to backend
      setSession(updatedSession);
      
      // Let user analyze the VAT score and metrics
      // They can use browser back button or dashboard link when ready
    }
  };

  if (!scene) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">Loading scenario...</p>
        </div>
      </div>
    );
  }

  if (showSUDPrompt) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <SUDLevelsSetup 
            onComplete={handleSUDComplete} 
            mode={isPlaying ? 'paused' : 'stopped'} 
            initialSUD={initialSUD}
            lengthRatio={session.lengthRatio || 1}
            awarenessRatio={1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {scenarioDetails[currentScenario]?.title} - {selectedDifficulty}
            </h1>
            <p className="text-sm text-gray-600">
              {scenarioDetails[currentScenario]?.description}
            </p>
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

          {/* Difficulty Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Select Difficulty Level</h3>
            <div className="grid grid-cols-3 gap-4">
              {getScenarioDetails(categoryId).map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => handleDifficultyChange(scenario.difficulty as 'Basic' | 'Medium' | 'Extreme')}
                  disabled={index > currentScenario}
                  className={`p-4 rounded-lg ${
                    selectedDifficulty === scenario.difficulty
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {scenario.difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="mb-8">
            {scenarioDetails.length > 0 && (
              <video 
                key={scenarioDetails[currentScenario].id}
                controls
                className="w-full rounded-lg"
              >
                <source 
                  src={scenarioDetails[currentScenario].videoUrl} 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Progress</h3>
            <div className="flex gap-2">
              {getScenarioDetails(categoryId).map((scenario, index) => (
                <div
                  key={scenario.id}
                  className={`h-2 flex-1 rounded-full ${
                    index === currentScenario
                      ? 'bg-teal-600'
                      : index < currentScenario
                      ? 'bg-teal-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scene details and VAT metrics */}
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {countdown > 0 ? (
                `Starting in ${countdown}...`
              ) : isPlaying ? (
                "Scene in progress..."
              ) : (
                "Scene paused"
              )}
            </div>
            <div className="text-2xl font-mono text-gray-600 mb-4">
              {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:
              {String(elapsedTime % 60).padStart(2, '0')}
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                Initial anxiety level: {initialSUD}
              </p>
              {vatMetrics && vatResult && (
                <div className="space-y-4 mt-4 text-left max-w-md mx-auto">
                  <h3 className="font-medium text-gray-800">Session Metrics:</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">SUD Levels</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Pre-exposure: {vatMetrics.sudPre}</li>
                        <li>Post-exposure: {vatMetrics.sudPost}</li>
                        <li className="text-xs text-gray-500 mt-1">
                          Change: {vatMetrics.sudPost - vatMetrics.sudPre} points
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Exposure Quality</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Length Ratio: {(vatMetrics.lengthRatio * 100).toFixed(1)}%</li>
                        <li>Awareness Ratio: {(vatMetrics.awarenessRatio * 100).toFixed(1)}%</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">VAT Calculation</h4>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Formula: (2 × (SUD_post - SUD_pre) / (Length_ratio + Awareness_ratio) + SUD_post) / 2</p>
                        <p>= (2 × ({vatMetrics.sudPost} - {vatMetrics.sudPre}) / ({vatMetrics.lengthRatio.toFixed(2)} + {vatMetrics.awarenessRatio.toFixed(2)}) + {vatMetrics.sudPost}) / 2</p>
                        <p className="text-sm font-medium text-teal-600 mt-2">
                          Final VAT Score: {vatResult.score.toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      vatResult.recommendation === 'proceed' ? 'bg-green-50 text-green-700' :
                      vatResult.recommendation === 'repeat' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      <h4 className="text-sm font-medium mb-1">Recommendation</h4>
                      <p className="text-sm capitalize">{vatResult.recommendation} with therapy plan</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Proceed button when VAT score is available */}
          {vatResult && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => router.push(`/session/recommendations?vatScore=${vatResult.score}&recommendation=${vatResult.recommendation}`)}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                Proceed to Recommendations
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
