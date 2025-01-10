import InitialAssessment from '@/components/onboarding/InitialAssessment';
import Disclaimer from '@/components/Disclaimer';
import ProgressSteps from '@/components/ProgressSteps';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-4">
        <div className="container mx-auto h-16 flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full"></div>
            <span className="text-slate-800 font-semibold text-lg">FOBOS</span>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <ProgressSteps currentStep={1} totalSteps={4} />
        <div className="max-w-3xl mx-auto bg-white rounded-lg border border-slate-200 p-8">
          <Disclaimer />
          <InitialAssessment />
        </div>
      </main>
    </div>
  );
}
