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
        {/* Test video player placeholder */}
        <button 
          onClick={() => {
            // Here you would toggle video play/pause
            console.log('Toggle video playback');
          }}
          className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Play className="text-gray-400" size={48} />
        </button>

        {/* Checks */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Video className="text-gray-600" />
                <div>
                  <span className="font-medium">VR Display Check</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Confirm you can see the test video clearly in VR
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChecks(prev => ({ ...prev, video: !prev.video }))}
                className="text-teal-600"
              >
                {checks.video ? <CheckCircle /> : <XCircle />}
              </button>
            </div>
            <button className="text-sm text-teal-600 hover:underline flex items-center gap-1">
              <HelpCircle size={14} />
              Video display issues?
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Volume2 className="text-gray-600" />
                <div>
                  <span className="font-medium">Sound Check</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Confirm you can hear the test video audio clearly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChecks(prev => ({ ...prev, sound: !prev.sound }))}
                className="text-teal-600"
              >
                {checks.sound ? <CheckCircle /> : <XCircle />}
              </button>
            </div>
            <button className="text-sm text-teal-600 hover:underline flex items-center gap-1">
              <HelpCircle size={14} />
              Audio not working?
            </button>
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
