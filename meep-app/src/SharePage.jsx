// SharePage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './sharePage.css'; // or import styles however you handle CSS

const SharePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Someone');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Parse URL parameters
    const userNameParam = searchParams.get('userName') || 'Someone';
    const requestID = searchParams.get('requestID');
    const userId = searchParams.get('userId');
    
    setUserName(userNameParam);
    
    // Check if on iOS
    const checkIsIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(checkIsIOS);
    
    if (checkIsIOS) {
      // On iOS, the App Clip card should appear automatically
      setTimeout(() => {
        // Try to open in the app
        const appUrl = `meep://share?requestID=${requestID}&userName=${encodeURIComponent(userNameParam)}&userId=${userId}`;
        window.location.href = appUrl;
        
        // Set error after another delay if still on page
        setTimeout(() => {
          setIsLoading(false);
          setError('Unable to open the app. Please make sure you have Meep installed.');
        }, 2000);
      }, 2000);
    } else {
      setIsLoading(false);
      setError('This feature is only available on iPhone. Please open this link on your iPhone.');
    }
  }, [searchParams]);

  return (
    <div className="share-page">
      <div className="share-container">
        <div className="share-card">
          <div className="logo">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#667eea"/>
            </svg>
          </div>
          
          <h1>Location Request</h1>
          <p className="subtitle">Someone wants to meet up with you!</p>
          
          <div className="user-info">
            <p><span className="user-name">{userName}</span> wants to find a convenient place to meet.</p>
          </div>
          
          <p className="subtitle">Share your location using the Meep app to find the perfect meeting spot.</p>
          
          {isLoading && isIOS && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Opening Meep...</p>
            </div>
          )}
          
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          
          <div className="actions">
            <button 
              onClick={() => navigate('/')}
              className="secondary-button"
            >
              Learn More About Meep
            </button>
            
            {/* Replace YOUR_APP_ID with your actual App Store ID */}
            <a 
              href="https://apps.apple.com/app/idYOUR_APP_ID" 
              className="app-store-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;