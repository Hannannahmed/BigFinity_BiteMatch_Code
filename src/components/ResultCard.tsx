import React from 'react';
import { Lightbulb, HelpCircle } from 'lucide-react';
import LoadingIcon from './LoadingIcon';

interface ResultCardProps {
  isLoading: boolean;
  result: string | null;
  costSavingsInfo: string | null;
  canFollowUp: boolean;
  isFollowUpLoading: boolean;
  canUseFollowUp: boolean;
  onFollowUp: (type: 'another-idea' | 'why') => void;
  onUpgradeClick: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  isLoading,
  result,
  costSavingsInfo,
  canFollowUp,
  isFollowUpLoading,
  canUseFollowUp,
  onFollowUp,
  onUpgradeClick
}) => {
  if (!isLoading && !result) {
    return (
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
        <p className="text-lg text-gray-600">
          Your guide to the perfect bite will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
          <LoadingIcon />
          <span className="ml-3 text-gray-600">Analyzing your food...</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none" role="main">
            <div className="whitespace-pre-wrap text-gray-800">
              {result}
            </div>
          </div>
          
          {costSavingsInfo && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {costSavingsInfo}
              </div>
            </div>
          )}
          
          {canFollowUp && !isFollowUpLoading && (
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => onFollowUp('another-idea')}
                disabled={!canUseFollowUp}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Get another recommendation idea"
              >
                <Lightbulb className="h-4 w-4" />
                Another idea
                {!canUseFollowUp && <span className="text-xs">(Premium)</span>}
              </button>
              <button
                type="button"
                onClick={() => onFollowUp('why')}
                disabled={!canUseFollowUp}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Learn why this recommendation works"
              >
                <HelpCircle className="h-4 w-4" />
                Why this works
                {!canUseFollowUp && <span className="text-xs">(Premium)</span>}
              </button>
              
              {!canUseFollowUp && (
                <button
                  type="button"
                  onClick={onUpgradeClick}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium ml-auto"
                >
                  ✨ Upgrade for unlimited follow-ups
                </button>
              )}
            </div>
          )}
          
          {isFollowUpLoading && (
            <div className="flex items-center justify-center py-4" role="status" aria-live="polite">
              <LoadingIcon />
              <span className="ml-3 text-gray-600">Getting more insights...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;