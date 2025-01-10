'use client';

import React, { useState } from 'react';
import { Video, Volume2, CheckCircle, XCircle, HelpCircle, Play } from 'lucide-react';

interface AudioVideoCheckProps {
  onComplete: () => void;
}

const AudioVideoCheck: React.FC<AudioVideoCheckProps> = ({ onComplete }) => {
  const [checks, setChecks] = useState({
    video: false,
    sound: false
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const allChecksComplete = Object.values(checks).every(check => check);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          VR System Check
        </h2>
        <p className="text-gray-600">
          Let's make sure everything works properly before we start.
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Test video player */}
        <div className="relative">
          <div className={`w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            {isPlaying ? (
              <div className="text-white text-center space-y-2">
                <div className="text-lg font-medium">Test Video Playing</div>
                <div className="text-sm opacity-75">Look around in VR to verify display</div>
              </div>
            ) : (
              <div className="text-gray-400 text-center space-y-2">
                <Play size={48} />
                <div className="text-sm">Click to play test video</div>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label={isPlaying ? "Pause test video" : "Play test video"}
          />
          {isPlaying && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
              Playing test content - Please check both video and audio
            </div>
          )}
        </div>

        {/* Checks */}
        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => setChecks(prev => ({ ...prev, video: !prev.video }))}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Video className="text-gray-600" />
                <div className="text-left">
                  <span className="font-medium">VR Display Check</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Confirm you can see the test video clearly in VR
                  </p>
                </div>
              </div>
              <div className="text-teal-600">
                {checks.video ? <CheckCircle /> : <XCircle />}
              </div>
            </button>
            <div className="space-y-2">
              <button 
                onClick={() => setVideoError(videoError ? null : "Try adjusting your VR headset position and ensure it's properly connected.")}
                className="text-sm text-teal-600 hover:underline flex items-center gap-1"
              >
                <HelpCircle size={14} />
                Video display issues?
              </button>
              {videoError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {videoError}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setChecks(prev => ({ ...prev, sound: !prev.sound }))}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Volume2 className="text-gray-600" />
                <div className="text-left">
                  <span className="font-medium">Sound Check</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Confirm you can hear the test video audio clearly
                  </p>
                </div>
              </div>
              <div className="text-teal-600">
                {checks.sound ? <CheckCircle /> : <XCircle />}
              </div>
            </button>
            <div className="space-y-2">
              <button 
                onClick={() => setAudioError(audioError ? null : "Check your headset's audio settings and volume level.")}
                className="text-sm text-teal-600 hover:underline flex items-center gap-1"
              >
                <HelpCircle size={14} />
                Audio not working?
              </button>
              {audioError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {audioError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        disabled={!allChecksComplete}
        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default AudioVideoCheck;
