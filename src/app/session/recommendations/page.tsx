'use client';

import { useSearchParams } from 'next/navigation';
import VATRecommendations from '@/components/session/VATRecommendations';

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const vatScore = parseFloat(searchParams.get('vatScore') || '0');
  const recommendation = searchParams.get('recommendation') as 'proceed' | 'repeat' | 'previous';

  return (
    <VATRecommendations 
      vatScore={vatScore}
      recommendation={recommendation}
    />
  );
}
