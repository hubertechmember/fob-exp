import React from 'react';

const InitialAssessmentSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full max-w-4xl mx-auto">
      {/* Navigation Bar */}
      <rect width="800" height="60" fill="#ffffff" stroke="#e2e8f0"/>
      <circle cx="40" cy="30" r="20" fill="#0d9488"/>
      <text x="70" y="35" fontFamily="Arial" fontSize="16" fill="#1e293b">FOBOS</text>
      
      {/* Progress Steps */}
      <g transform="translate(100, 100)">
        <circle cx="100" cy="30" r="25" fill="#0d9488"/>
        <text x="95" y="35" fontFamily="Arial" fontSize="14" fill="white">1</text>
        <line x1="125" y1="30" x2="225" y2="30" stroke="#e2e8f0" strokeWidth="2"/>
        
        <circle cx="250" cy="30" r="25" fill="#e2e8f0"/>
        <text x="245" y="35" fontFamily="Arial" fontSize="14" fill="#64748b">2</text>
        <line x1="275" y1="30" x2="375" y2="30" stroke="#e2e8f0" strokeWidth="2"/>
        
        <circle cx="400" cy="30" r="25" fill="#e2e8f0"/>
        <text x="395" y="35" fontFamily="Arial" fontSize="14" fill="#64748b">3</text>
        <line x1="425" y1="30" x2="525" y2="30" stroke="#e2e8f0" strokeWidth="2"/>
        
        <circle cx="550" cy="30" r="25" fill="#e2e8f0"/>
        <text x="545" y="35" fontFamily="Arial" fontSize="14" fill="#64748b">4</text>
      </g>
      
      {/* Main Content Area */}
      <rect x="100" y="180" width="600" height="380" fill="white" stroke="#e2e8f0" rx="8"/>
      
      {/* Content Header */}
      <text x="140" y="220" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#1e293b">
        Initial Assessment (LSAS)
      </text>
      
      {/* Benefits Section */}
      <g transform="translate(140, 250)">
        <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#0d9488">
          Why this matters:
        </text>
        <rect x="0" y="20" width="520" height="100" fill="#f0fdfa" stroke="#5eead4" rx="4"/>
        <text x="20" y="45" fontFamily="Arial" fontSize="14" fill="#134e4a">
          • Helps personalize your therapy plan
        </text>
        <text x="20" y="70" fontFamily="Arial" fontSize="14" fill="#134e4a">
          • Enables more accurate progress tracking
        </text>
        <text x="20" y="95" fontFamily="Arial" fontSize="14" fill="#134e4a">
          • Allows for better session recommendations
        </text>
      </g>
      
      {/* Assessment Info */}
      <g transform="translate(140, 370)">
        <text fontFamily="Arial" fontSize="14" fill="#1e293b">
          • 24 situations to evaluate
        </text>
        <text x="0" y="25" fontFamily="Arial" fontSize="14" fill="#1e293b">
          • Takes approximately 10-15 minutes
        </text>
        <text x="0" y="50" fontFamily="Arial" fontSize="14" fill="#1e293b">
          • Can be completed later if needed
        </text>
      </g>
      
      {/* Action Buttons */}
      <g transform="translate(140, 480)">
        {/* Primary Button */}
        <rect width="200" height="50" fill="#0d9488" rx="8"/>
        <text x="45" y="30" fontFamily="Arial" fontSize="16" fill="white">
          Start Assessment
        </text>
        
        {/* Skip Button */}
        <g transform="translate(220, 0)">
          <rect x="0" y="0" width="150" height="50" fill="white" stroke="#cbd5e1" rx="8"/>
          <text x="55" y="30" fontFamily="Arial" fontSize="16" fill="#64748b">
            Skip
          </text>
        </g>
      </g>
      
      {/* Skip Warning */}
      <g transform="translate(390, 480)">
        <text fontFamily="Arial" fontSize="12" fill="#94a3b8">
          You can skip this step, but it's highly recommended
        </text>
        <text x="0" y="20" fontFamily="Arial" fontSize="12" fill="#94a3b8">
          to complete it for optimal therapy results
        </text>
      </g>
    </svg>
  );
};

export default InitialAssessmentSVG; 
