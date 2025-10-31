import React from 'react';

const LoadingIcon: React.FC = () => {
  return (
    <div 
      className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingIcon;