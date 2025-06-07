  import React, { useEffect, useState } from 'react';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import LandingPage from './pages/LandingPage';
  import AuthPage from './pages/AuthPage';
  import Dashboard from './pages/Dashboard';
  import PersonalizationSurvey from './components/PersonalizationSurvey';
  import CustomCursor from './components/CustomCursor';

  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSurvey, setShowSurvey] = useState(false);

    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      const hasCompletedSurvey = localStorage.getItem('surveyCompleted');
      
      if (user) {
        setIsAuthenticated(true);
        // Show survey only for first-time users
        if (!hasCompletedSurvey) {
          setShowSurvey(true);
        }
      } else {
        setIsAuthenticated(false);
        setShowSurvey(false);
      }
    };

    useEffect(() => {
      checkAuthStatus();
      setIsLoading(false);

      // Listen for storage changes (when user logs in/out)
      const handleStorageChange = () => {
        checkAuthStatus();
      };

      window.addEventListener('storage', handleStorageChange);
      
      // Also listen for manual storage updates
      const interval = setInterval(checkAuthStatus, 1000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }, []);

    const handleSurveyComplete = (surveyData: any) => {
      // Save survey data and mark as completed
      localStorage.setItem('userProfile', JSON.stringify(surveyData));
      localStorage.setItem('surveyCompleted', 'true');
      
      // Update user data with survey info
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...user,
        ...surveyData,
        displayName: surveyData.nickname
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setShowSurvey(false);
    };

    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1C2541] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#5BC0BE]/20 border-t-[#5BC0BE] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading Mirror Me...</p>
          </div>
        </div>
      );
    }

    if (showSurvey && isAuthenticated) {
      return (
        <>
          <CustomCursor />
          <PersonalizationSurvey onComplete={handleSurveyComplete} />
        </>
      );
    }

    return (
      <>
        <CustomCursor />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route 
              path="/dashboard/*" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </Router>
      </>
    );
  }

  export default App;