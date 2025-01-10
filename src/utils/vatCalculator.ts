import type { VATMetrics, VATResult } from '@/types/vat';

export function calculateVATScore(metrics: VATMetrics): VATResult {
  const { sudPre, sudPost, lengthRatio, awarenessRatio } = metrics;
  
  // VAT_score = (2 * (SUD_post - SUD_pre) / (Length_ratio + Awareness_ratio) + SUD_post) / 2
  const vatScore = (2 * (sudPost - sudPre) / (lengthRatio + awarenessRatio) + sudPost) / 2;

  let recommendation: 'proceed' | 'repeat' | 'previous';
  
  if (vatScore <= 30) {
    recommendation = 'proceed';
  } else if (vatScore <= 40) {
    recommendation = 'repeat';
  } else {
    recommendation = 'previous';
  }

  return {
    score: vatScore,
    recommendation
  };
}
