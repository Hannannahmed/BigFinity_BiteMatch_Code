import React, { useState, useEffect } from 'react';

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary-medium animate-spin-gentle" viewBox="0 0 100 100" aria-label="BiteMatch Logo">
    <path 
      d="M 30 15 v 70 C 60 85, 60 65, 45 55 C 60 45, 75 35, 75 15 v 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 3 seconds, or user can click to continue
    const timer = setTimeout(() => {
      handleContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300); // Wait for fade out animation
  };

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-[#e7f3fb] flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 pointer-events-none">
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-[#e7f3fb] flex items-center justify-center z-50 cursor-pointer transition-opacity duration-300"
      onClick={handleContinue}
    >
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <LogoIcon />
        </div>
        
        {/* Brand Name */}
        <h1 className="text-5xl font-extrabold tracking-tight text-primary-medium mb-4 brand-title">
          BiteMatch
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-primary-medium brand-tagline max-w-md mx-auto">
          Because the last bite should be as good as the first.
        </p>
        
        {/* Subtle continue hint */}
        <div className="mt-12 animate-pulse">
          <p className="text-sm text-primary-medium opacity-70">
            Click anywhere to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;