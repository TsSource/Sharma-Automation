import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import AICoachLanding from './AICoachLanding';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Analytics />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ai-coach" element={<AICoachLanding />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  </BrowserRouter>
);