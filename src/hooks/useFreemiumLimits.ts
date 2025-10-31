import { useState, useEffect } from 'react';

interface UsageLimits {
  dailyRecommendations: number;
  usedToday: number;
  isPremium: boolean;
  isProTier: boolean;
  isInTrial: boolean;
  trialEndsAt: string | null;
  daysLeftInTrial: number;
  resetTime: string;
  historyLimit: number;
  followUpLimit: number;
  customVibes: string[];
}

const TRIAL_DURATION_DAYS = 14;
const POST_TRIAL_DAILY_LIMIT = 3; // After trial ends
const FREE_HISTORY_LIMIT = 5; // After trial ends
const FREE_FOLLOWUP_LIMIT = 1; // After trial ends

export const useFreemiumLimits = () => {
  const [limits, setLimits] = useState<UsageLimits>({
    dailyRecommendations: Infinity, // Unlimited during trial
    usedToday: 0,
    isPremium: false,
    isProTier: false,
    isInTrial: true,
    trialEndsAt: null,
    daysLeftInTrial: TRIAL_DURATION_DAYS,
    resetTime: getNextMidnight(),
    historyLimit: Infinity, // Unlimited during trial
    followUpLimit: Infinity, // Unlimited during trial
    customVibes: []
  });
  
  const [showTrialEndModal, setShowTrialEndModal] = useState(false);

  useEffect(() => {
    // Load usage from localStorage
    const savedUsage = localStorage.getItem('biteMatchUsage');
    const now = new Date();
    
    if (savedUsage) {
      try {
        const parsed = JSON.parse(savedUsage);
        const resetTime = new Date(parsed.resetTime);
        
        // Reset daily usage if past midnight
        if (now > resetTime) {
          parsed.usedToday = 0;
          parsed.resetTime = getNextMidnight();
        }
        
        // Check if trial has ended
        if (parsed.trialEndsAt) {
          const trialEndDate = new Date(parsed.trialEndsAt);
          const isTrialActive = now < trialEndDate;
          const daysLeft = Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
          
          // Show trial end modal if trial just ended and user hasn't seen it
          if (!isTrialActive && !parsed.hasSeenTrialEndModal && !parsed.isPremium && !parsed.isProTier) {
            setShowTrialEndModal(true);
          }
          
          const updatedLimits = {
            ...parsed,
            isInTrial: isTrialActive,
            daysLeftInTrial: daysLeft,
            dailyRecommendations: isTrialActive || parsed.isPremium || parsed.isProTier ? Infinity : POST_TRIAL_DAILY_LIMIT,
            historyLimit: isTrialActive || parsed.isPremium || parsed.isProTier ? Infinity : FREE_HISTORY_LIMIT,
            followUpLimit: isTrialActive || parsed.isPremium || parsed.isProTier ? Infinity : FREE_FOLLOWUP_LIMIT
          };
          
          setLimits(updatedLimits);
          localStorage.setItem('biteMatchUsage', JSON.stringify(updatedLimits));
        } else {
          setLimits(parsed);
        }
      } catch (e) {
        console.error('Error parsing usage data:', e);
        initializeNewUser();
      }
    } else {
      // New user - start trial
      initializeNewUser();
    }
  }, []);

  const initializeNewUser = () => {
    const now = new Date();
    const trialEnd = new Date(now.getTime() + (TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000));
    
    const newLimits = {
      dailyRecommendations: Infinity,
      usedToday: 0,
      isPremium: false,
      isProTier: false,
      isInTrial: true,
      trialEndsAt: trialEnd.toISOString(),
      daysLeftInTrial: TRIAL_DURATION_DAYS,
      resetTime: getNextMidnight(),
      historyLimit: Infinity,
      followUpLimit: Infinity,
      customVibes: []
    };
    
    setLimits(newLimits);
    localStorage.setItem('biteMatchUsage', JSON.stringify(newLimits));
  };

  const incrementUsage = () => {
    if (limits.isInTrial || limits.isPremium || limits.isProTier) return true; // No limits during trial or premium
    
    if (limits.usedToday >= limits.dailyRecommendations) {
      return false; // At limit
    }

    const newLimits = {
      ...limits,
      usedToday: limits.usedToday + 1
    };
    
    setLimits(newLimits);
    localStorage.setItem('biteMatchUsage', JSON.stringify(newLimits));
    return true;
  };

  const canMakeRequest = () => {
    return limits.isInTrial || limits.isPremium || limits.isProTier || limits.usedToday < limits.dailyRecommendations;
  };

  const getRemainingRequests = () => {
    if (limits.isInTrial || limits.isPremium || limits.isProTier) return Infinity;
    return Math.max(0, limits.dailyRecommendations - limits.usedToday);
  };

  const upgradeToPremium = (tier: 'premium' | 'pro' = 'premium') => {
    const newLimits = {
      ...limits,
      isPremium: tier === 'premium' || tier === 'pro',
      isProTier: tier === 'pro',
      isInTrial: false, // End trial when they upgrade
      dailyRecommendations: Infinity,
      historyLimit: Infinity,
      followUpLimit: Infinity
    };
    setLimits(newLimits);
    localStorage.setItem('biteMatchUsage', JSON.stringify(newLimits));
  };

  const canUseCostSavings = () => {
    return limits.isInTrial || limits.isPremium || limits.isProTier;
  };

  const canExportRecipes = () => {
    return limits.isInTrial || limits.isPremium || limits.isProTier;
  };

  const canUseMealPlanning = () => {
    return limits.isInTrial || limits.isProTier;
  };

  const canUseCustomVibes = () => {
    return limits.isInTrial || limits.isPremium || limits.isProTier;
  };

  const getHistoryLimit = () => {
    return limits.isInTrial || limits.isPremium || limits.isProTier ? Infinity : limits.historyLimit;
  };

  const canUseFollowUp = (currentFollowUps: number) => {
    if (limits.isInTrial || limits.isPremium || limits.isProTier) return true;
    return currentFollowUps < limits.followUpLimit;
  };

  const getTrialStatus = () => {
    if (limits.isPremium || limits.isProTier) {
      return { type: 'premium' as const };
    }
    
    if (limits.isInTrial) {
      return { 
        type: 'trial' as const, 
        daysLeft: limits.daysLeftInTrial,
        endsAt: limits.trialEndsAt 
      };
    }
    
    return { type: 'free' as const };
  };

  const calculateTrialSavings = () => {
    // Calculate savings based on usage during trial
    const avgSavingsPerMeal = 0.75;
    const avgWastePreventedPerMeal = 0.8; // oz
    
    // Get history from localStorage to calculate trial usage
    const savedHistory = localStorage.getItem('biteMatchHistory');
    let totalRecommendations = 0;
    
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        totalRecommendations = history.length;
      } catch (e) {
        totalRecommendations = 5; // Default estimate
      }
    }
    
    return {
      totalSaved: totalRecommendations * avgSavingsPerMeal,
      wastePreventedOz: totalRecommendations * avgWastePreventedPerMeal,
      totalRecommendations
    };
  };

  const handleTrialEndModalClose = () => {
    setShowTrialEndModal(false);
    // Mark that user has seen the modal
    const updatedLimits = { ...limits, hasSeenTrialEndModal: true };
    setLimits(updatedLimits);
    localStorage.setItem('biteMatchUsage', JSON.stringify(updatedLimits));
  };

  const handleTrialEndSubscribe = () => {
    // This is now handled in the main App component
    console.log('Trial end subscribe triggered');
  };

  return {
    limits,
    showTrialEndModal,
    incrementUsage,
    canMakeRequest,
    getRemainingRequests,
    upgradeToPremium,
    canUseCostSavings,
    canExportRecipes,
    canUseMealPlanning,
    canUseCustomVibes,
    getHistoryLimit,
    canUseFollowUp,
    getTrialStatus,
    handleTrialEndModalClose,
    handleTrialEndSubscribe,
    calculateTrialSavings,

    setShowTrialEndModal
  };
};

function getNextMidnight(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}