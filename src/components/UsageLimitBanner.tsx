import React from 'react';
import { AlertCircle, Zap, Crown } from 'lucide-react';

interface UsageLimitBannerProps {
  currentUsage: number;
  dailyLimit: number;
  isInTrial: boolean;
  onUpgradeClick: () => void;
}

const UsageLimitBanner: React.FC<UsageLimitBannerProps> = ({ 
  currentUsage, 
  dailyLimit, 
  isInTrial,
  onUpgradeClick 
}) => {
  // Don't show usage limits during trial (unlimited)
  if (isInTrial || dailyLimit === Infinity) return null;
  
  const remaining = dailyLimit - currentUsage;
  const isNearLimit = remaining <= 2;
  const isAtLimit = remaining <= 0;

  // Show banner when user has made requests or is near/at limit
  if (currentUsage === 0 && !isNearLimit) return null;

  return (
    <div className={`rounded-xl p-4 mb-6 ${
      isAtLimit 
        ? 'bg-red-50 border border-red-200' 
        : isNearLimit 
        ? 'bg-orange-50 border border-orange-200'
        : currentUsage > 0
        ? 'bg-blue-50 border border-blue-200'
        : 'bg-gray-50 border border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className={`h-5 w-5 mr-3 ${
            isAtLimit ? 'text-red-500' : isNearLimit ? 'text-orange-500' : 'text-blue-500'
          }`} />
          <div>
            <p className={`font-medium ${
              isAtLimit ? 'text-red-800' : isNearLimit ? 'text-orange-800' : 'text-blue-800'
            }`}>
              {isAtLimit 
                ? 'Daily limit reached!' 
                : currentUsage === 0
                ? 'Free tier: 7 recommendations per day'
                : `${remaining} recommendation${remaining !== 1 ? 's' : ''} remaining today`
              }
            </p>
            <p className={`text-sm ${
              isAtLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-blue-600'
            }`}>
              {isAtLimit 
                ? 'Upgrade to Premium for unlimited daily recommendations'
                : currentUsage === 0
                ? 'Get unlimited recommendations with Premium ($4.99/month)'
                : `You've used ${currentUsage} of ${dailyLimit} free recommendations`
              }
            </p>
          </div>
        </div>
        <button
          onClick={onUpgradeClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isAtLimit 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <Zap className="h-4 w-4" />
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default UsageLimitBanner;