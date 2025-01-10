'use client';

import React, { useState, useEffect } from 'react';
import { Video, Mic, Volume2, CheckCircle, XCircle } from 'lucide-react';

interface AudioVideoCheckProps {
  onComplete: () => void;
}

const AudioVideoCheck: React.FC<AudioVideoCheckProps> = ({ onComplete }) => {
  const [checks, setChecks] = useState({
    video: false,
    audio: false,
    sound: false
  });

  const allChecksComplete = Object.values(checks).every(check => check);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-800">
        System Check
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Video className="text-gray-600" />
            <span className="font-medium">Camera</span>
          </div>
          <button
            onClick={() => setChecks(prev => ({ ...prev, video: !prev.video }))}
            className="text-teal-600"
          >
            {checks.video ? <CheckCircle /> : <XCircle />}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Mic className="text-gray-600" />
            <span className="font-medium">Microphone</span>
          </div>
          <button
            onClick={() => setChecks(prev => ({ ...prev, audio: !prev.audio }))}
            className="text-teal-600"
          >
            {checks.audio ? <CheckCircle /> : <XCircle />}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Volume2 className="text-gray-600" />
            <span className="font-medium">Sound</span>
          </div>
          <button
            onClick={() => setChecks(prev => ({ ...prev, sound: !prev.sound }))}
            className="text-teal-600"
          >
            {checks.sound ? <CheckCircle /> : <XCircle />}
          </button>
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
