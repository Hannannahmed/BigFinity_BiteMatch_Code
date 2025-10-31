import React, { useState } from 'react';
import { Download, Lock, Check } from 'lucide-react';

interface RecipeExportProps {
  foodItems: string[];
  prompt: string;
  result: string;
  canExport: boolean;
  onUpgradeClick: () => void;
}

const RecipeExport: React.FC<RecipeExportProps> = ({
  foodItems,
  prompt,
  result,
  canExport,
  onUpgradeClick
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    if (!canExport) {
      onUpgradeClick();
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recipe = {
      title: `Perfect ${foodItems.join(' & ')} Combination`,
      ingredients: foodItems,
      instructions: [
        result,
        'Adjust portions to taste',
        'Enjoy your perfectly balanced meal!'
      ],
      servings: 2,
      createdAt: new Date().toISOString()
    };

    // Create and download file
    const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitematch-recipe-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${canExport ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Download className={`h-5 w-5 ${canExport ? 'text-blue-600' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Export as Recipe</h3>
            <p className="text-sm text-gray-600">Save this recommendation as a recipe file</p>
          </div>
        </div>
        
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            canExport
              ? exported
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-700'
          }`}
        >
          {!canExport && <Lock className="h-4 w-4" />}
          {isExporting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>}
          {exported && <Check className="h-4 w-4" />}
          
          {exported ? 'Exported!' : isExporting ? 'Exporting...' : canExport ? 'Export Recipe' : 'Premium Feature'}
        </button>
      </div>
      
      {!canExport && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Export your favorite recommendations as recipe files with Premium
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeExport;