import React from 'react';
import { Home, Camera, History, TrendingUp, User } from 'lucide-react';

interface MobileTabBarProps {
  activeTab: 'home' | 'camera' | 'history' | 'tracker' | 'profile';
  onTabChange: (tab: 'home' | 'camera' | 'history' | 'tracker' | 'profile') => void;
}

const MobileTabBar: React.FC<MobileTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'camera' as const, icon: Camera, label: 'Scan' },
    { id: 'history' as const, icon: History, label: 'History' },
    { id: 'tracker' as const, icon: TrendingUp, label: 'Tracker' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-2 py-1 flex justify-around items-center shadow-lg">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
            activeTab === id
              ? 'text-primary-medium bg-primary-light'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileTabBar;