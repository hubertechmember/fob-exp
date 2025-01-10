export interface VATMetrics {
  sudPre: number;
  sudPost: number;
  lengthRatio: number;
  awarenessRatio: number;
}

export interface VATResult {
  score: number;
  recommendation: 'proceed' | 'repeat' | 'previous';
}

export interface SceneSession {
  sceneId: string;
  startTime: Date;
  endTime?: Date;
  vatMetrics?: VATMetrics;
  vatResult?: VATResult;
}
