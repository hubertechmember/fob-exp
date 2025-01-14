export interface SceneConfig {
  id: string;
  title: string;
  duration: string;
  description: string;
  minLSASScore: number;
  maxLSASScore: number;
  benefits: string[];
  videoUrl: string;
  difficulty: 'Basic' | 'Medium' | 'Extreme';
  category: 'Conference' | 'WaitingRoom';
  locked?: boolean;
}

export interface VATScore {
  sudPre: number;
  sudPost: number;
  lengthRatio: number;
  awarenessRatio: number;
}

export interface SceneProgress {
  sceneId: string;
  completed: boolean;
  vatScore?: number;
}
