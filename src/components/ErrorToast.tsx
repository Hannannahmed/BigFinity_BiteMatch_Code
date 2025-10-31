import React from 'react';

interface ErrorToastProps {
    message: string;
    onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 7000); // Auto-dismiss after 7 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div 
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 rounded-xl shadow-lg bg-red-500 text-white animate-fade-in-down"
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-grow">
                    <p className="font-bold">An error occurred</p>
                    <p className="text-sm">{message}</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="ml-4 p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                    aria-label="Close error message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ErrorToast;