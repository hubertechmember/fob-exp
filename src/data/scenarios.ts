export const scenarios = {
  1: { // Public Speaking
    id: 1,
    name: 'Public Speaking',
    icon: '🎤',
    description: 'Practice public speaking in various conference settings',
    color: 'bg-teal-100',
    levels: {
      Basic: [
        {
          id: "123405",
          title: "Pre-Speech Waiting",
          duration: "5 min",
          description: "User as observer waiting for their speech to begin",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Minimal stress", "Guided experience"],
          videoUrl: '/videos/public-speaking/basic/pre-speech.mp4'
        }
      ],
      Medium: [
        {
          id: "124222",
          title: "Pre-Speech Waiting",
          duration: "10 min",
          description: "Audience expressing expectations",
          minLSASScore: 55,
          maxLSASScore: 144,
          benefits: ["Real-life simulation", "Confidence building"],
          videoUrl: '/videos/public-speaking/medium/pre-speech.mp4'
        }
      ],
      Extreme: [
        {
          id: "125915",
          title: "Pre-Speech Waiting",
          duration: "15 min",
          description: "Maximum pre-speech anxiety triggers",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["Full immersion", "Multiple interactions"],
          videoUrl: '/videos/public-speaking/extreme/pre-speech.mp4'
        }
      ]
    }
  },
  2: { // Public Places
    id: 2,
    name: 'Public Places',
    icon: '🏢',
    description: 'Experience different public space scenarios',
    color: 'bg-blue-100',
    levels: {
      Basic: [
        {
          id: "130448",
          title: "Corner Observer",
          duration: "5 min",
          description: "Minimal reactions in public space",
          minLSASScore: 0,
          maxLSASScore: 54,
          benefits: ["Low intensity", "Observation practice"],
          videoUrl: '/videos/public-places/basic/corner-observer.mp4'
        }
      ],
      Medium: [
        {
          id: "131256",
          title: "Corner Observer",
          duration: "10 min",
          description: "Moderate attention in public space",
          minLSASScore: 55,
          maxLSASScore: 144,
          benefits: ["Social awareness", "Confidence building"],
          videoUrl: '/videos/public-places/medium/corner-observer.mp4'
        }
      ],
      Extreme: [
        {
          id: "132613",
          title: "Corner Observer",
          duration: "15 min",
          description: "Maximum social pressure",
          minLSASScore: 81,
          maxLSASScore: 144,
          benefits: ["Full immersion", "Stress management"],
          videoUrl: '/videos/public-places/extreme/corner-observer.mp4'
        }
      ]
    }
  }
  // Add other categories...
};

export type Scenario = typeof scenarios[1]['levels']['Basic'][0] & {
  difficulty: 'Basic' | 'Medium' | 'Extreme';
  category: 'Conference' | 'WaitingRoom';
};
export type Category = keyof typeof scenarios;
