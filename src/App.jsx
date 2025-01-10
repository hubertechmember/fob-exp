import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InitialAssessment from './components/onboarding/InitialAssessment';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/assessment" replace />} />
        <Route path="/onboarding/assessment" element={<InitialAssessment />} />
        {/* Inne ścieżki */}
      </Routes>
    </Router>
  );
};

export default App; 