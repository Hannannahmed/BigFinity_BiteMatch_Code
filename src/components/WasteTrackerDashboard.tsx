import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Leaf, Award, Calendar, Target, ArrowUp, ArrowDown } from 'lucide-react';

interface WasteData {
  totalSaved: number;
  wastePreventedOz: number;
  perfectPortions: number;
  streakDays: number;
  monthlyTrend: number;
  avgSavingsPerMeal: number;
  co2Prevented: number; // lbs of CO2
  goalProgress: number; // percentage toward monthly goal
}

interface WasteTrackerDashboardProps {
  totalRecommendations: number;
  isPremium: boolean;
  onUpgradeClick: () => void;
}

const WasteTrackerDashboard: React.FC<WasteTrackerDashboardProps> = ({
  totalRecommendations,
  isPremium,
  onUpgradeClick
}) => {
  const [wasteData, setWasteData] = useState<WasteData>({
    totalSaved: 0,
    wastePreventedOz: 0,
    perfectPortions: 0,
    streakDays: 0,
    monthlyTrend: 0,
    avgSavingsPerMeal: 0.75,
    co2Prevented: 0,
    goalProgress: 0
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (isPremium) {
      // Calculate waste tracking data based on recommendations
      const avgSavingsPerMeal = 0.75;
      const avgWastePreventedPerMeal = 0.8; // oz
      const co2PerOz = 0.05; // lbs CO2 per oz of food waste prevented
      
      setWasteData({
        totalSaved: totalRecommendations * avgSavingsPerMeal,
        wastePreventedOz: totalRecommendations * avgWastePreventedPerMeal,
        perfectPortions: totalRecommendations,
        streakDays: Math.min(totalRecommendations, 30), // Max 30 day streak for demo
        monthlyTrend: totalRecommendations > 10 ? 15 : -5, // Positive trend if active user
        avgSavingsPerMeal,
        co2Prevented: totalRecommendations * avgWastePreventedPerMeal * co2PerOz,
        goalProgress: Math.min((totalRecommendations / 30) * 100, 100) // Goal of 30 perfect portions per month
      });
    }
  }, [totalRecommendations, isPremium]);

  if (!isPremium) {
    return (
      <div className="bg-gradient-to-br from-primary-light to-blue-50 rounded-2xl border border-primary-medium p-8">
        <div className="text-center">
          <div className="p-4 bg-primary-light rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <TrendingUp className="h-10 w-10 text-primary-medium" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waste Tracker Dashboard</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            See exactly how much money you're saving and waste you're preventing with detailed analytics and insights.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-primary-medium">$0.75</div>
              <div className="text-sm text-gray-500">Avg. Saved Per Meal</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-secondary-dark">0.8oz</div>
              <div className="text-sm text-gray-500">Waste Prevented Per Meal</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Premium Features Include:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-medium rounded-full"></div>
                Real-time savings tracking & cumulative totals
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Food waste prevention analytics (oz, lbs, environmental impact)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-dark rounded-full"></div>
                Monthly goals & streak tracking
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                Trend analysis & ROI calculations
              </div>
            </div>
          </div>
          
          <button
            onClick={onUpgradeClick}
            className="bg-primary-medium text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center gap-2 mx-auto"
          >
            <Award className="h-5 w-5" />
            Upgrade to Track Your Savings
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatWeight = (oz: number) => oz >= 16 ? `${(oz / 16).toFixed(1)} lbs` : `${oz.toFixed(1)} oz`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-primary-medium" />
            Waste Tracker Dashboard
          </h2>
          <p className="text-gray-600 mt-1">Your food waste prevention & savings analytics</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary-medium to-primary-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 opacity-80" />
            <div className="flex items-center text-blue-100">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+{wasteData.monthlyTrend}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{formatCurrency(wasteData.totalSaved)}</div>
          <div className="text-blue-100 text-sm">Total Money Saved</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="h-8 w-8 opacity-80" />
            <div className="text-orange-100 text-sm">
              {formatWeight(wasteData.wastePreventedOz)}
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{wasteData.perfectPortions}</div>
          <div className="text-orange-100 text-sm">Perfect Portions</div>
        </div>

        <div className="bg-gradient-to-br from-secondary-dark to-secondary-medium rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 opacity-80" />
            <div className="text-yellow-200 text-sm">{wasteData.streakDays} days</div>
          </div>
          <div className="text-3xl font-bold mb-1">{wasteData.goalProgress.toFixed(0)}%</div>
          <div className="text-yellow-200 text-sm">Monthly Goal</div>
        </div>

        <div className="bg-gradient-to-br from-primary-dark to-gray-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 opacity-80" />
            <div className="text-blue-100 text-sm">Environmental Impact</div>
          </div>
          <div className="text-3xl font-bold mb-1">{wasteData.co2Prevented.toFixed(1)}</div>
          <div className="text-blue-100 text-sm">lbs CO₂ Prevented</div>
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary-medium" />
          Return on Investment Analysis
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-medium mb-1">
              {formatCurrency(wasteData.avgSavingsPerMeal)}
            </div>
            <div className="text-sm text-gray-600">Average Saved Per Meal</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.round((wasteData.totalSaved / 4.99) * 100)}%
            </div>
            <div className="text-sm text-gray-600">ROI vs Premium Cost</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-dark mb-1">
              {Math.ceil(4.99 / wasteData.avgSavingsPerMeal)}
            </div>
            <div className="text-sm text-gray-600">Meals to Break Even</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary-light rounded-lg">
          <p className="text-sm text-primary-dark text-center">
            <strong>You've saved {formatCurrency(wasteData.totalSaved - 4.99)} more than your Premium subscription cost!</strong>
            {wasteData.totalSaved < 4.99 && " You're on track to break even soon."}
          </p>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary-medium" />
          Environmental Impact
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary-light rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-medium/20 rounded-full">
                <Leaf className="h-5 w-5 text-primary-medium" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Food Waste Prevented</div>
                <div className="text-2xl font-bold text-primary-medium">{formatWeight(wasteData.wastePreventedOz)}</div>
              </div>
            </div>
            <p className="text-sm text-primary-dark">
              Equivalent to preventing {Math.round(wasteData.wastePreventedOz / 16 * 2.5)} meals from going to waste!
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-light rounded-full">
                <Target className="h-5 w-5 text-primary-medium" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Carbon Footprint</div>
                <div className="text-2xl font-bold text-primary-medium">{wasteData.co2Prevented.toFixed(1)} lbs</div>
              </div>
            </div>
            <p className="text-sm text-orange-700">
              CO₂ emissions prevented by reducing food waste through perfect portioning.
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-secondary-dark" />
          Achievements & Milestones
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg text-center ${wasteData.totalSaved >= 5 ? 'bg-secondary-medium/20 border-2 border-secondary-medium' : 'bg-gray-50 border-2 border-gray-200'}`}>
            <div className="text-2xl mb-2">💰</div>
            <div className="font-medium text-sm">First $5 Saved</div>
            <div className={`text-xs ${wasteData.totalSaved >= 5 ? 'text-secondary-dark' : 'text-gray-500'}`}>
              {wasteData.totalSaved >= 5 ? 'Unlocked!' : `$${(5 - wasteData.totalSaved).toFixed(2)} to go`}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg text-center ${wasteData.perfectPortions >= 10 ? 'bg-primary-light border-2 border-primary-medium' : 'bg-gray-50 border-2 border-gray-200'}`}>
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium text-sm">Perfect 10</div>
            <div className={`text-xs ${wasteData.perfectPortions >= 10 ? 'text-primary-medium' : 'text-gray-500'}`}>
              {wasteData.perfectPortions >= 10 ? 'Unlocked!' : `${10 - wasteData.perfectPortions} to go`}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg text-center ${wasteData.streakDays >= 7 ? 'bg-secondary-medium/20 border-2 border-secondary-dark' : 'bg-gray-50 border-2 border-gray-200'}`}>
            <div className="text-2xl mb-2">🔥</div>
            <div className="font-medium text-sm">Week Streak</div>
            <div className={`text-xs ${wasteData.streakDays >= 7 ? 'text-secondary-dark' : 'text-gray-500'}`}>
              {wasteData.streakDays >= 7 ? 'Unlocked!' : `${7 - wasteData.streakDays} days to go`}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg text-center ${wasteData.co2Prevented >= 1 ? 'bg-primary-light border-2 border-primary-medium' : 'bg-gray-50 border-2 border-gray-200'}`}>
            <div className="text-2xl mb-2">🌱</div>
            <div className="font-medium text-sm">Eco Warrior</div>
            <div className={`text-xs ${wasteData.co2Prevented >= 1 ? 'text-primary-medium' : 'text-gray-500'}`}>
              {wasteData.co2Prevented >= 1 ? 'Unlocked!' : `${(1 - wasteData.co2Prevented).toFixed(1)} lbs to go`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTrackerDashboard;