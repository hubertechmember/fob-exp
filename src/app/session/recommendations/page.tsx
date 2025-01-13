'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VATRecommendations from '@/components/session/VATRecommendations';

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const vatScore = parseFloat(searchParams.get('vatScore') || '0');
  const recommendation = searchParams.get('recommendation') as 'proceed' | 'repeat' | 'previous';
  const categoryId = parseInt(searchParams.get('category') || '1');
  const scenarioId = searchParams.get('scenario') || '';
  const completedLevels = searchParams.get('completedLevels')?.split(',') || [];

  return (
    <VATRecommendations 
      vatScore={vatScore}
      recommendation={recommendation}
      categoryId={categoryId}
      scenarioId={scenarioId}
      completedLevels={completedLevels}
    />
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendationsContent />
    </Suspense>
  );
}
