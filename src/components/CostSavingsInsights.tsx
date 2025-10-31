import React from 'react';
import { DollarSign, Lock, TrendingDown, Leaf } from 'lucide-react';

interface CostSavingsInsightsProps {
  costSavingsInfo: string | null;
  canUseAdvanced: boolean;
  onUpgradeClick: () => void;
  totalRecommendations?: number;
}

const CostSavingsInsights: React.FC<CostSavingsInsightsProps> = ({
  costSavingsInfo,
  canUseAdvanced,
  onUpgradeClick,
  totalRecommendations = 0
}) => {
  if (!costSavingsInfo && !canUseAdvanced) return null;

  // Calculate estimated lifetime savings for premium users
  const estimatedPerMealSavings = 0.75; // Average savings per meal
  const lifetimeSavings = totalRecommendations * estimatedPerMealSavings;

  return (
    <div className="bg-white rounded-lg border-l-4 border-green-500">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-900">Cost Savings & Waste Reduction</h3>
          </div>
          {!canUseAdvanced && (
            <button
              onClick={onUpgradeClick}
              className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              <Lock className="h-3 w-3" />
              Premium
            </button>
          )}
        </div>
        
        {canUseAdvanced ? (
          <div className="space-y-3">
            {costSavingsInfo && (
              <div className="text-sm text-gray-700">
                {costSavingsInfo}
              </div>
            )}
            
            {/* Advanced savings breakdown for premium users */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">${estimatedPerMealSavings.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Per Meal Saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">${lifetimeSavings.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Total Saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-600">{Math.round(totalRecommendations * 0.3)}oz</div>
                <div className="text-xs text-gray-500">Waste Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">{totalRecommendations}</div>
                <div className="text-xs text-gray-500">Perfect Portions</div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Leaf className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-xs text-green-700 font-medium mb-1">
                    🌱 Environmental Impact
                  </p>
                  <p className="text-xs text-green-600">
                    By following BiteMatch recommendations, you've prevented food waste equivalent to {Math.round(totalRecommendations * 0.1)} lbs of food from ending up in landfills!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <TrendingDown className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-700 font-medium mb-1">
                    💡 Waste Reduction Tips
                  </p>
                  <p className="text-xs text-blue-600">
                    Perfect portioning means no leftover sauce going bad in your fridge. You're saving money and reducing waste with every meal!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <DollarSign className="h-8 w-8 text-gray-400" />
              <TrendingDown className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Track your food waste savings and see how much money you're saving with Premium
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600">
                Premium users save an average of <strong>$0.75 per meal</strong> by preventing food waste!
              </p>
            </div>
            <button
              onClick={onUpgradeClick}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
            >
              Upgrade to See Your Savings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostSavingsInsights;