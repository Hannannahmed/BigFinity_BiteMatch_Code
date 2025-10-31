import React from 'react';
import { X, DollarSign, TrendingUp, Crown, Zap, Award } from 'lucide-react';

interface TrialEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalSaved: number;
  totalRecommendations: number;
  wastePreventedOz: number;
  onSelectPlan: (plan: 'monthly' | 'annual') => void;
}

const TrialEndModal: React.FC<TrialEndModalProps> = ({
  isOpen,
  onClose,
  totalSaved,
  totalRecommendations,
  wastePreventedOz,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  const formatWeight = (oz: number) => oz >= 16 ? `${(oz / 16).toFixed(1)} lbs` : `${oz.toFixed(1)} oz`;
  const monthlyProjection = (totalSaved / 14) * 30; // Project to monthly savings

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-medium to-primary-dark text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Amazing Results!</h2>
                <p className="text-blue-100">Your 14-day trial is ending</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Savings Summary */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-sm text-green-600 font-medium mb-2">
              🎉 You're in the top 15% of users for savings!
            </div>
            <div className="text-4xl font-bold text-primary-medium mb-2">
              ${totalSaved.toFixed(2)}
            </div>
            <p className="text-gray-600">
              You've saved this much money in just 14 days!
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalRecommendations}</div>
              <div className="text-sm text-blue-700">Perfect Portions</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{formatWeight(wastePreventedOz)}</div>
              <div className="text-sm text-green-700">Waste Prevented</div>
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="bg-gradient-to-r from-yellow-50 to-primary-light rounded-xl p-4 mb-6 border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-primary-medium" />
              <h3 className="font-semibold text-gray-900">Your Savings Trajectory</h3>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Based on your usage, you're on track to save <strong>${monthlyProjection.toFixed(2)} every month</strong>
            </p>
            <p className="text-primary-dark text-sm font-medium">
              That's ${(monthlyProjection - 1.99).toFixed(2)} in your pocket after Premium cost!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {/* Annual Option (Recommended) */}
            <button
              onClick={() => onSelectPlan('annual')}
              className="w-full bg-gradient-to-r from-primary-medium to-primary-dark text-white py-4 px-6 rounded-xl text-lg font-bold hover:from-primary-dark hover:to-primary-dark transition-all shadow-lg hover:shadow-xl relative"
            >
              <div className="absolute -top-2 right-4">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Save 58%
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Crown className="h-6 w-6" />
                <div>
                  <div>Continue My Savings Journey</div>
                  <div className="text-sm font-normal opacity-90">$19.99/year (just $1.67/month)</div>
                </div>
                <Zap className="h-6 w-6" />
              </div>
            </button>
            
            {/* Monthly Option */}
            <button
              onClick={() => onSelectPlan('monthly')}
              className="w-full bg-white border-2 border-primary-medium text-primary-medium py-3 px-6 rounded-xl text-base font-semibold hover:bg-primary-light transition-all"
            >
              Monthly Plan - $1.99/month
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Cancel anytime • 7-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrialEndModal;