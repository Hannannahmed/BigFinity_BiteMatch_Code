import React from 'react';
import { ArrowLeft, Settings, Menu } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
}

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 100 100" aria-label="BiteMatch Logo">
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

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title, 
  showBack = false, 
  onBack, 
  showSettings = false, 
  onSettings 
}) => {
  return (
    <header className="bg-primary-medium text-white px-4 pb-4 flex items-center justify-between shadow-lg mobile-header-safe-area">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <LogoIcon />
        )}
        <h1 className="text-lg font-bold truncate">{title}</h1>
      </div>
      
      {showSettings && (
        <button
          onClick={onSettings}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      )}
    </header>
  );
};

export default MobileHeader;