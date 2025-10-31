import React, { useState } from 'react';
import { Plus, X, Lock, Sparkles } from 'lucide-react';

interface CustomVibesProps {
  customVibes: string[];
  canUseCustom: boolean;
  onAddVibe: (vibe: string) => void;
  onRemoveVibe: (vibe: string) => void;
  onUpgradeClick: () => void;
}

const CustomVibes: React.FC<CustomVibesProps> = ({
  customVibes,
  canUseCustom,
  onAddVibe,
  onRemoveVibe,
  onUpgradeClick
}) => {
  const [newVibe, setNewVibe] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddVibe = () => {
    if (!canUseCustom) {
      onUpgradeClick();
      return;
    }
    
    if (newVibe.trim() && customVibes.length < 5) {
      onAddVibe(newVibe.trim());
      setNewVibe('');
      setIsAdding(false);
    }
  };

  if (!canUseCustom && customVibes.length === 0) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Custom Meal Vibes</h3>
              <p className="text-sm text-gray-600">Create your own personalized cooking styles</p>
            </div>
          </div>
          <button
            onClick={onUpgradeClick}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Lock className="h-4 w-4" />
            Upgrade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Your Custom Vibes</h3>
        {canUseCustom && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
          >
            <Plus className="h-4 w-4" />
            Add Custom Vibe
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newVibe}
            onChange={(e) => setNewVibe(e.target.value)}
            placeholder="e.g., Spicy & Bold"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            maxLength={20}
          />
          <button
            onClick={handleAddVibe}
            className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewVibe('');
            }}
            className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {customVibes.map((vibe) => (
          <div
            key={vibe}
            className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
          >
            <Sparkles className="h-3 w-3" />
            {vibe}
            {canUseCustom && (
              <button
                onClick={() => onRemoveVibe(vibe)}
                className="hover:text-purple-900"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomVibes;