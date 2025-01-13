import { Suspense } from 'react';
import SetupContent from './SetupContent';

export default function SessionSetup({
  searchParams
}: {
  searchParams: { category: string }
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <SetupContent initialCategory={parseInt(searchParams.category)} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
