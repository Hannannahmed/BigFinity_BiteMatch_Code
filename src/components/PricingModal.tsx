import React from 'react';
import { X, Check, Zap, Crown, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

import { subscriptionService } from '../services/subscriptionService';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trialStatus: {
    type: 'trial' | 'premium' | 'free';
    daysLeft?: number;
  };
  onUpgrade: (tier: 'premium' | 'pro') => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, trialStatus, onUpgrade }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const [error, setError] = useState<string>('');

  // const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  // const selectPlan = async (planType: 'monthly' | 'annual') => {
  //   setIsProcessing(true);
  //   setError('');
    
  //   try {
  //     const success = await subscriptionService.selectPlan(
  //       planType === 'annual' ? 'yearly' : 'monthly'
  //     );
      
  //     if (success) {
  //       alert(`🎉 Thanks for subscribing to BiteMatch ${planType}!`);
  //       onUpgrade(planType === 'annual' ? 'pro' : 'premium');
  //       onClose();
  //     } else {
  //       setError('Purchase failed or was cancelled. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Purchase error:', error);
  //     setError('Payment failed. Please try again.');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const getHeaderText = () => {
    if (trialStatus.type === 'trial') {
      return {
        title: `Continue Your Premium Experience`,
        subtitle: `You have ${trialStatus.daysLeft} days left in your trial. Upgrade now to keep all features!`
      };
    }
    if (trialStatus.type === 'free') {
      return {
        title: 'Upgrade to Premium',
        subtitle: 'Your trial has ended. Upgrade to get unlimited access back!'
      };
    }
    return {
      title: 'Choose Your Plan',
      subtitle: 'Select the plan that works best for you'
    };
  };

  const headerText = getHeaderText();

  const selectPlan = async (planType: 'monthly' | 'annual' | 'pro') => {
    setIsProcessing(true);
    setError('');
    
    try {
      const success = await subscriptionService.selectPlan(
        planType === 'annual' ? 'yearly' : 'monthly'
      );
      
      if (success) {
        alert(`🎉 Thanks for subscribing to BiteMatch ${planType}!`);
        onUpgrade(planType === 'annual' ? 'pro' : 'premium');
        onClose();
      } else {
        setError('Purchase failed or was cancelled. Please try again.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 AI recommendations per day',
        'Basic meal vibe options',
        'Last 5 recommendations saved',
        '1 follow-up question per recommendation',
        'Basic waste reduction tips',
        'Preview of waste tracker dashboard'
      ],
      current: trialStatus.type === 'free',
      tier: 'free' as const
    },
    {
      name: 'Premium',
      price: '$1.99',
      period: 'month',
      features: [
        'Unlimited AI recommendations',
        '💰 Full Waste Tracker Dashboard',
        'Real-time money savings tracking',
        'Food waste prevention analytics',
        'ROI analysis & break-even calculator',
        'Environmental impact tracking',
        'Achievement badges & milestones',
        'Full history and analytics',
        'Unlimited follow-up questions',
        'Recipe export feature',
        'Custom meal vibes',
        'Priority customer support',
        'Early access to new features'
      ],
      recommended: true,
      tier: 'premium' as const
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{headerText.title}</h2>
              <p className="text-gray-600 mt-1">
                {headerText.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border-2 p-6 ${
                  tier.recommended
                    ? 'border-orange-500 bg-orange-50'
                    : tier.current
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                {tier.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    {tier.name === 'Free' && <Sparkles className="h-6 w-6 text-gray-500 mr-2" />}
                    {tier.name === 'Premium' && <Zap className="h-6 w-6 text-orange-500 mr-2" />}
                    {tier.name === 'Pro' && <Crown className="h-6 w-6 text-purple-500 mr-2" />}
                    <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  </div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 ml-1">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => tier.tier !== 'free' ? selectPlan(
                    // tier.tier === 'pro'
                    true
                     ? 'annual' : 'monthly') : undefined}
                  disabled={tier.current || isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    tier.current
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : tier.recommended
                      ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {tier.current ? 'Current Plan' : isProcessing ? 'Processing...' : `Upgrade to ${tier.name}`}
                </button>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              All plans include our core AI-powered recommendations and customer support.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Cancel anytime. No hidden fees. 7-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;