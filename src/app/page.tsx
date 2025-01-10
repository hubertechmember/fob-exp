import InitialAssessment from '@/components/onboarding/InitialAssessment';
import Disclaimer from '@/components/Disclaimer';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Disclaimer />
      <InitialAssessment />
    </div>
  );
}
