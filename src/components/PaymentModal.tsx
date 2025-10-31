import React, { useState } from 'react';
import { X, CreditCard, Shield, Check, AlertCircle } from 'lucide-react';
import { subscriptionService } from '../services/subscriptionService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    type: 'monthly' | 'annual';
    price: string;
    savings?: string;
  };
  onPaymentSuccess: (plan: 'monthly' | 'annual') => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  onPaymentSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      const success = await subscriptionService.selectPlan(
        selectedPlan.type === 'annual' ? 'yearly' : 'monthly'
      );
      
      if (success) {
        onPaymentSuccess(selectedPlan.type === 'annual' ? 'annual' : 'monthly');
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

  const handleRestorePurchases = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      const restored = await subscriptionService.restorePurchases();
      if (restored) {
        onPaymentSuccess('monthly'); // Default to monthly for restored
        onClose();
      } else {
        setError('No previous purchases found to restore.');
      }
    } catch (error) {
      setError('Failed to restore purchases.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-medium to-primary-dark text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Complete Your Purchase</h2>
              <p className="text-blue-100 text-sm">
                {selectedPlan.type === 'annual' ? 'Annual Plan' : 'Monthly Plan'} - {selectedPlan.price}
                {selectedPlan.savings && (
                  <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {selectedPlan.savings}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">What You Get:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Unlimited AI recommendations
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Full waste tracker dashboard
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Recipe export & meal planning
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Custom meal vibes
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Priority customer support
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Secure Payment</span>
            </div>
            <p className="text-xs text-gray-600">
              Payment processed securely through the App Store. Cancel anytime in your iOS Settings.
            </p>
          </div>

          {/* Purchase Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all ${
                isProcessing
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-medium to-primary-dark text-white hover:from-primary-dark hover:to-primary-dark shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  Subscribe - {selectedPlan.price}
                </div>
              )}
            </button>
            
            <button
              onClick={handleRestorePurchases}
              disabled={isProcessing}
              className="w-full py-2 px-4 text-primary-medium hover:text-primary-dark transition-colors text-sm"
            >
              Restore Previous Purchases
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            By subscribing, you agree to our{' '}
            <a href="/terms-of-service" className="text-primary-medium hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" className="text-primary-medium hover:underline">
              Privacy Policy
            </a>
            . Cancel anytime in iOS Settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;