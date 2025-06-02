// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MeepEarth from './MeepEarth';
import SharePage from './SharePage';
import TermsPage from './TermsPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<MeepEarth />} />
        
        {/* Share page for App Clip */}
        <Route path="/share" element={<SharePage />} />
        
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        
        {/* Your main app routes -- comment out for now if MainApp doesn't exist */}
        {/* <Route path="/app/*" element={<MainApp />} /> */}
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;