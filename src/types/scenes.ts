export interface SceneConfig {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Gentle' | 'Moderate' | 'Challenging';
  category: 'Conference' | 'WaitingRoom';
  description: string;
  minLSASScore: number;
  maxLSASScore: number;
  benefits: string[];
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
