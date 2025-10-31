import React from 'react';
import { Clock, Crown, Zap } from 'lucide-react';

interface TrialBannerProps {
  trialStatus: {
    type: 'trial' | 'premium' | 'free';
    daysLeft?: number;
    endsAt?: string | null;
  };
  onUpgradeClick: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialStatus, onUpgradeClick }) => {
  if (trialStatus.type === 'premium') return null;

  if (trialStatus.type === 'trial') {
    const isLastDays = (trialStatus.daysLeft || 0) <= 3;
    
    return (
      <div className={`rounded-xl p-4 mb-6 ${
        isLastDays 
          ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${
              isLastDays ? 'bg-orange-100' : 'bg-blue-100'
            }`}>
              {isLastDays ? (
                <Clock className="h-5 w-5 text-orange-600" />
              ) : (
                <Crown className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <p className={`font-medium ${
                isLastDays ? 'text-orange-800' : 'text-blue-800'
              }`}>
                {isLastDays 
                  ? `⏰ Trial ending in ${trialStatus.daysLeft} day${trialStatus.daysLeft !== 1 ? 's' : ''}!`
                  : `🎉 Premium Trial Active - ${trialStatus.daysLeft} days left`
                }
              </p>
              <p className={`text-sm ${
                isLastDays ? 'text-orange-600' : 'text-blue-600'
              }`}>
                {isLastDays 
                  ? 'Upgrade now to keep unlimited access to all premium features'
                  : 'Enjoying unlimited recommendations, waste tracking, and all premium features'
                }
              </p>
            </div>
          </div>
          <button
            onClick={onUpgradeClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isLastDays 
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Zap className="h-4 w-4" />
            {isLastDays ? 'Upgrade Now' : 'Upgrade Early'}
          </button>
        </div>
        
        {isLastDays && (
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-700">After trial: 3 recommendations/day</span>
              <span className="text-orange-700">Premium: Unlimited everything</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Free tier (post-trial)
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-gray-200 rounded-full mr-3">
            <Clock className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">
              Trial ended - Now on Free Plan
            </p>
            <p className="text-sm text-gray-600">
              3 recommendations per day • Limited features
            </p>
          </div>
        </div>
        <button
          onClick={onUpgradeClick}
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium"
        >
          <Crown className="h-4 w-4" />
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default TrialBanner;