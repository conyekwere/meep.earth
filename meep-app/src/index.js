
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Changed from MeepEarth to App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Changed from MeepEarth to App */}
  </React.StrictMode>
);