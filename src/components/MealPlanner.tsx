import React, { useState } from 'react';
import { Calendar, Lock, Plus, ShoppingCart } from 'lucide-react';
import type { MealPlan, HistoryItem } from '../types';

interface MealPlannerProps {
  canUseMealPlanning: boolean;
  onUpgradeClick: () => void;
}

const MealPlanner: React.FC<MealPlannerProps> = ({
  canUseMealPlanning,
  onUpgradeClick
}) => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!canUseMealPlanning) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <div className="text-center">
          <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Meal Planning</h3>
          <p className="text-gray-600 mb-4">
            Plan your perfect meals for the week with AI-powered recommendations and automatic shopping lists.
          </p>
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Weekly meal planning with BiteMatch recommendations
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Automatic shopping list generation
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Batch cooking calculations and scaling
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Nutritional planning and balance
            </div>
          </div>
          <button
            onClick={onUpgradeClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Lock className="h-4 w-4" />
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          Meal Planner
        </h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Meal
        </button>
      </div>

      <div className="grid md:grid-cols-7 gap-4 mb-6">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 text-xs">
                <div className="text-gray-500">Breakfast</div>
                <div className="text-gray-400">+ Add meal</div>
              </div>
              <div className="bg-white rounded p-2 text-xs">
                <div className="text-gray-500">Lunch</div>
                <div className="text-gray-400">+ Add meal</div>
              </div>
              <div className="bg-white rounded p-2 text-xs">
                <div className="text-gray-500">Dinner</div>
                <div className="text-gray-400">+ Add meal</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-green-600" />
          <div>
            <h4 className="font-medium text-gray-900">Shopping List</h4>
            <p className="text-sm text-gray-600">Auto-generated from your meal plan</p>
          </div>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Generate List
        </button>
      </div>
    </div>
  );
};

export default MealPlanner;