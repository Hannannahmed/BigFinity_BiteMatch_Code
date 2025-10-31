import React from 'react';

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-primary-medium" viewBox="0 0 100 100" aria-label="BiteMatch Logo">
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

const Header: React.FC = () => {
    return (
        <header className="text-center w-full mb-6" role="banner">
            <div className="flex justify-center items-center gap-3 mb-3">
                <LogoIcon />
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary-medium brand-title">
                    BiteMatch
                </h1>
            </div>
            <p className="text-lg max-w-2xl mx-auto text-primary-medium brand-tagline">
                Because the last bite should be as good as the first.
            </p>
        </header>
    );
};

export default Header;