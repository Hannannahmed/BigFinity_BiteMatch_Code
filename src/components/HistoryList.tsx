import React from 'react';
import { Clock, RotateCcw, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onRestore: (id: number) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onRestore, onClear }) => {

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Calculations
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">No bites yet!</h4>
          <p className="text-gray-500">
            Your past recommendations will appear here once you get your first BiteMatch.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {item.imagePreview && (
                      <img
                        src={item.imagePreview}
                        alt="Food"
                        className="w-8 h-8 rounded object-cover"
                      />
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.foodItems.map((food, index) => (
                        <span
                          key={food.id}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                        >
                          {food.name}
                        </span>
                      ))}
                    </div>
                    {item.vibe && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {item.vibe}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {item.prompt}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Used {item.useCount} time{item.useCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => onRestore(item.id)}
                  className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;