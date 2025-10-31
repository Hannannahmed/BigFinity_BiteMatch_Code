export enum CalculationType {
  Condiment = 'condiment',
  Portion = 'portion',
}

export interface HistoryItem {
  id: number;
  imagePreview: string | null;
  foodItems: { id: number; name: string }[];
  prompt: string;
  result: string;
  useCount: number;
  vibe?: string;
}

export interface BiteRecommendationParams {
  image: File | null;
  foodItems: string[];
  prompt: string;
  vibe: string;
  signal: AbortSignal;
  onStream: (chunk: string) => void;
  onError: (error: string) => void;
}

export interface FollowUpParams {
  context: {
    foodItems: string[];
    prompt: string;
    result: string;
    vibe?: string;
  };
  followUpType: 'another-idea' | 'why';
  signal: AbortSignal;
  onStream: (chunk: string) => void;
  onError: (error: string) => void;
}

export interface UserLimits {
  dailyRecommendations: number;
  usedToday: number;
  isPremium: boolean;
  isProTier: boolean;
  resetTime: string;
  historyLimit: number;
  followUpLimit: number;
  customVibes: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  tier: 'free' | 'premium' | 'pro';
}

export interface CostSavings {
  estimatedSavings: number;
  wasteReduced: string;
  insights: string[];
  totalLifetimeSavings?: number;
  wastePreventionTips?: string[];
}

export interface RecipeExport {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  prepTime?: number;
  costSavings?: CostSavings;
  createdAt: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast?: HistoryItem;
    lunch?: HistoryItem;
    dinner?: HistoryItem;
    snacks?: HistoryItem[];
  };
  shoppingList?: string[];
}