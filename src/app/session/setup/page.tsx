import { Suspense } from 'react';
import SetupContent from './SetupContent';

export default function SessionSetup() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <SetupContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
