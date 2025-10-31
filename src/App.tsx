import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { getBiteRecommendationStream, getFollowUpStream } from './services/geminiService';
import type { HistoryItem } from './types';
import { useFreemiumLimits } from './hooks/useFreemiumLimits';
import Header from './components/Header';
import TrialBanner from './components/TrialBanner';
import WelcomeScreen from './components/WelcomeScreen';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import LoadingIcon from './components/LoadingIcon';
import HistoryList from './components/HistoryList';
import ErrorToast from './components/ErrorToast';
import UsageLimitBanner from './components/UsageLimitBanner';
import PricingModal from './components/PricingModal';
import PaymentModal from './components/PaymentModal';
import Footer from './components/Footer';
import CostSavingsInsights from './components/CostSavingsInsights';
import RecipeExport from './components/RecipeExport';
import CustomVibes from './components/CustomVibes';
import MealPlanner from './components/MealPlanner';
import WasteTrackerDashboard from './components/WasteTrackerDashboard';
import TrialEndModal from './components/TrialEndModal';
import { subscriptionService } from './services/subscriptionService';

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

interface FollowUpContext {
    foodItems: string[];
    prompt: string;
    result: string;
    vibe?: string;
}

const VIBES = ["Classic Comfort", "Healthy & Light", "Quick & Easy", "Adventurous"];

const PRESET_QUESTIONS = [
  "How much should I use?",
  "What's the perfect ratio?",
  "How do I make this taste better?",
  "What goes well with this?",
];

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true); // Always show for preview
  const [foodItems, setFoodItems] = useState<{ id: number; name: string }[]>([{ id: Date.now(), name: '' }]);
  const [prompt, setPrompt] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageProcessing, setIsImageProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [costSavingsInfo, setCostSavingsInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [followUpContext, setFollowUpContext] = useState<FollowUpContext | null>(null);
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{
    type: 'monthly' | 'annual';
    price: string;
    savings?: string;
  } | null>(null);
  const [followUpCount, setFollowUpCount] = useState<number>(0);
  const [showMealPlanner, setShowMealPlanner] = useState<boolean>(false);
  const [showWasteTracker, setShowWasteTracker] = useState<boolean>(false);
  
  // Demo mode for screenshots - set to true when capturing screenshots
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  
  const { 
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
    calculateTrialSavings,
    setShowTrialEndModal
  } = useFreemiumLimits();

  const abortControllerRef = useRef<AbortController | null>(null);
  const resultRef = useRef<string>('');

  useEffect(() => {
    // Force welcome screen to show for preview - comment out for production
    setShowWelcome(true);
    
    // Uncomment for production:
    // const hasSeenWelcome = localStorage.getItem('biteMatchWelcomeSeen');
    // if (!hasSeenWelcome) {
    //   setShowWelcome(true);
    // }

    try {
      const storedHistory = localStorage.getItem('biteMatchHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        const historyWithCounts = parsedHistory.map((item: any) => ({
            ...item,
            useCount: item.useCount || 1,
        }));
        setHistory(historyWithCounts);
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      setHistory([]);
    }
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageProcessing(true);
      setError(null);
      setResult(null);
      setCostSavingsInfo(null);
      setFollowUpContext(null);

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }

        setImageFile(compressedFile);
        const previewUrl = URL.createObjectURL(compressedFile);
        setImagePreview(previewUrl);

      } catch (compressionError) {
        console.error("Image compression error:", compressionError);
        setError("There was an issue processing your photo. Please try another one.");
        handleImageRemove();
      } finally {
        setIsImageProcessing(false);
      }
    }
  };

  const handleImageRemove = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setIsImageProcessing(false);
  };

  const handleFoodItemChange = (id: number, value: string) => {
    setFoodItems(items => items.map(item => item.id === id ? { ...item, name: value } : item));
  };

  const addFoodItem = () => {
    setFoodItems(items => [...items, { id: Date.now(), name: '' }]);
  };

  const removeFoodItem = (id: number) => {
    setFoodItems(items => items.filter(item => item.id !== id));
  };

  const parseAndSetFinalResult = (fullResult: string) => {
    const savingsRegex = /\[SAVINGS_START\](.*?)\[SAVINGS_END\]/s;
    const savingsMatch = fullResult.match(savingsRegex);

    if (savingsMatch) {
      const mainResult = fullResult.replace(savingsRegex, '').trim();
      setResult(mainResult);
      setCostSavingsInfo(savingsMatch[1].trim());
      return mainResult;
    } else {
      setResult(fullResult);
      setCostSavingsInfo(null);
      return fullResult;
    }
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check usage limits
    if (!canMakeRequest()) {
      setShowPricingModal(true);
      return;
    }
    
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const namedFoodItems = foodItems.map(i => i.name.trim()).filter(name => name !== '');
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCostSavingsInfo(null);
    setFollowUpContext(null);
    resultRef.current = '';

    await getBiteRecommendationStream({
      image: imageFile,
      foodItems: namedFoodItems,
      prompt,
      vibe,
      signal: controller.signal,
      onStream: (chunk) => {
        resultRef.current += chunk;
        setResult(prev => (prev ?? '') + chunk); 
      },
      onError: (errorMsg) => {
        if (!controller.signal.aborted) {
          setError(errorMsg);
          setIsLoading(false);
        }
      }
    });
    
    if (!controller.signal.aborted) {
      setIsLoading(false);
      
      // Increment usage count on successful request
      incrementUsage();
      
      const finalFullResult = resultRef.current;
      if (finalFullResult) {
        const finalMainResult = parseAndSetFinalResult(finalFullResult);
        setFollowUpContext({ foodItems: namedFoodItems, prompt, result: finalMainResult, vibe });
        
        const saveToHistory = async () => {
          let imageForHistory: string | null = null;
          if (imageFile) {
            imageForHistory = await imageCompression.getDataUrlFromFile(imageFile);
          }
          const newHistoryItem: HistoryItem = {
            id: Date.now(),
            imagePreview: imageForHistory,
            foodItems: foodItems.filter(item => item.name.trim() !== ''),
            prompt: prompt,
            result: finalMainResult,
            useCount: 1,
            vibe: vibe,
          };
          setHistory(prev => {
            const updatedHistory = [newHistoryItem, ...prev].slice(0, 10);
            localStorage.setItem('biteMatchHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
          });
        };
        saveToHistory();
      }
    }
  }, [imageFile, foodItems, prompt, vibe, canMakeRequest, incrementUsage]);

  const handleFollowUp = async (type: 'another-idea' | 'why') => {
    if (!followUpContext || isLoading || isFollowUpLoading || !canUseFollowUp(followUpCount)) {
      if (!canUseFollowUp(followUpCount)) {
        setShowPricingModal(true);
      }
      return;
    }
    
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsFollowUpLoading(true);
    setFollowUpContext(null);
    setCostSavingsInfo(null);
    setFollowUpCount(prev => prev + 1);

    const separator = type === 'another-idea' ? "\n\n—\n\n**Here's another idea:**\n" : "\n\n—\n\n**Here's why that works:**\n";
    setResult(prev => (prev ?? '') + separator);
    resultRef.current += separator;

    await getFollowUpStream({
        context: followUpContext,
        followUpType: type,
        signal: controller.signal,
        onStream: (chunk) => {
            resultRef.current += chunk;
            setResult(prev => (prev ?? '') + chunk);
        },
        onError: (errorMsg) => {
            if (!controller.signal.aborted) {
                setError(errorMsg);
                setIsFollowUpLoading(false);
            }
        },
    });

    if (!controller.signal.aborted) {
        setIsFollowUpLoading(false);
    }
  };

  const handleRestore = async (id: number) => {
    const itemToRestore = history.find(item => item.id === id);
    if (!itemToRestore) return;
    
    const updatedHistory = history.map(item => 
      item.id === id ? { ...item, useCount: (item.useCount || 1) + 1 } : item
    );
    setHistory(updatedHistory);
    localStorage.setItem('biteMatchHistory', JSON.stringify(updatedHistory));

    setError(null);
    setResult(null);
    setCostSavingsInfo(null);
    setFollowUpContext(null);

    setPrompt(itemToRestore.prompt);
    setVibe(itemToRestore.vibe || '');
    setFoodItems(itemToRestore.foodItems.length > 0 ? itemToRestore.foodItems : [{ id: Date.now(), name: '' }]);

    if (itemToRestore.imagePreview) {
      try {
        const file = await imageCompression.getFilefromDataUrl(itemToRestore.imagePreview, `restored-${Date.now()}.jpg`);
        setImageFile(file);
        setImagePreview(itemToRestore.imagePreview);
      } catch (e) {
        console.error("Could not restore image from history", e);
        setError("Could not restore the image, please select it again.");
        handleImageRemove();
      }
    } else {
      handleImageRemove();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    setFollowUpContext(null);
    setCostSavingsInfo(null);
    setFollowUpCount(0);
    localStorage.removeItem('biteMatchHistory');
  };

  const isFormIncomplete = useMemo(() => {
    const hasAtLeastOneItem = foodItems.some(item => item.name.trim() !== '');
    return !prompt.trim() || (!hasAtLeastOneItem && !imageFile);
  }, [foodItems, prompt, imageFile]);
  
  const sortedHistory = useMemo(() => {
    const historyLimit = getHistoryLimit();
    const limitedHistory = historyLimit === Infinity ? history : history.slice(0, historyLimit);
    return [...limitedHistory].sort((a, b) => (b.useCount || 1) - (a.useCount || 1));
  }, [history]);

  const handleAddCustomVibe = (vibe: string) => {
    // In a real app, this would save to user preferences
    console.log('Adding custom vibe:', vibe);
  };

  const handleRemoveCustomVibe = (vibe: string) => {
    // In a real app, this would remove from user preferences
    console.log('Removing custom vibe:', vibe);
  };

  const handleUpgrade = (tier: 'premium' | 'pro') => {
    // For now, we'll default to monthly premium when upgrading from pricing modal
    setSelectedPaymentPlan({
      type: 'monthly',
      price: '$1.99/month'
    });
    setShowPricingModal(false);
    setShowPaymentModal(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // For demo mode, don't save to localStorage so welcome always shows
    if (!isDemoMode) {
      localStorage.setItem('biteMatchWelcomeSeen', 'true');
    }
  };

  const handleTrialEndSelectPlan = (plan: 'monthly' | 'annual') => {
    setSelectedPaymentPlan({
      type: plan,
      price: plan === 'annual' ? '$14.99/year' : '$1.99/month',
      savings: plan === 'annual' ? 'Save 37%' : undefined
    });
    setShowTrialEndModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (plan: 'monthly' | 'annual') => {
    upgradeToPremium('premium');
    setShowPaymentModal(false);
    setSelectedPaymentPlan(null);
    alert(`Successfully subscribed to ${plan} plan! Welcome to Premium BiteMatch! 🎉`);
  };

  // Demo data for screenshots
  const demoFoodItems = [
    { id: 1, name: 'French Fries' },
    { id: 2, name: 'Ketchup' }
  ];
  
  const demoPrompt = "How much ketchup should I use for these fries?";
  
  const demoResponse = "For those 20 fries, use about 2 tablespoons of ketchup - roughly the size of a ping pong ball. This gives you perfect coverage with a little left over for the last few bites!";

  // Show welcome screen first
  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6" style={{ backgroundColor: '#e7f3fb' }}>
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      <div className="w-full max-w-2xl">
        <Header />
        
        <main className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Demo Mode Toggle - Only show in development */}
            {(
              // import.meta.env.DEV
              true
               || window.location.hostname === 'localhost') && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isDemoMode}
                    onChange={(e) => setIsDemoMode(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-yellow-800">
                    📸 Demo Mode (for screenshots)
                  </span>
                </label>
                {isDemoMode && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-yellow-700 mb-2">Click buttons below to set up each screenshot:</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          // Reset everything for clean welcome screenshot
                          setFoodItems([{ id: Date.now(), name: '' }]);
                          setPrompt('');
                          setVibe('');
                          setResult(null);
                          setCostSavingsInfo(null);
                          setFollowUpContext(null);
                          setFollowUpCount(0);
                          setShowWasteTracker(false);
                          setShowMealPlanner(false);
                          handleImageRemove();
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        🔄 Reset for Welcome
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          // Set up analysis screenshot
                          setFoodItems([
                            { id: 1, name: 'French Fries' },
                            { id: 2, name: 'Ketchup' }
                          ]);
                          setPrompt('How much ketchup should I use for these fries?');
                          setVibe('Classic Comfort');
                          setResult(null);
                          setCostSavingsInfo(null);
                          setFollowUpContext(null);
                          setIsLoading(false);
                          setIsFollowUpLoading(false);
                        }}
                        className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600"
                      >
                        📸 Setup Analysis
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          // Make sure we have the right setup first
                          setFoodItems([
                            { id: 1, name: 'French Fries' },
                            { id: 2, name: 'Ketchup' }
                          ]);
                          setPrompt(demoPrompt);
                          setVibe('Classic Comfort');
                          setIsLoading(false);
                          setIsFollowUpLoading(false);
                          // Set the demo response
                          setResult(demoResponse);
                          setCostSavingsInfo("This portioning prevents sauce waste - you'll save about $0.50 per meal and avoid throwing away leftover sauce that goes bad.");
                          setFollowUpContext({
                            foodItems: ['French Fries', 'Ketchup'],
                            prompt: demoPrompt,
                            result: demoResponse,
                            vibe: 'Classic Comfort'
                          });
                          setFollowUpCount(0);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      >
                        📝 Load AI Response
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowWasteTracker(true);
                          setShowMealPlanner(false);
                        }}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600"
                      >
                        📊 Show Waste Tracker
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowPricingModal(true);
                          setShowWasteTracker(false);
                          setShowMealPlanner(false);
                        }}
                        className="bg-pink-500 text-white px-3 py-1 rounded text-xs hover:bg-pink-600"
                      >
                        💰 Show Pricing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <TrialBanner 
              trialStatus={getTrialStatus()}
              onUpgradeClick={() => setShowPricingModal(true)}
            />
            
            <UsageLimitBanner 
              currentUsage={limits.usedToday}
              dailyLimit={limits.dailyRecommendations}
              isInTrial={limits.isInTrial}
              onUpgradeClick={() => setShowPricingModal(true)}
            />
            
            <ImageUploader 
              imagePreview={imagePreview} 
              onImageChange={handleImageChange} 
              onImageRemove={handleImageRemove}
              isProcessing={isImageProcessing}
            />
            
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                What's on your plate?
                {imageFile && <span className="text-gray-500 font-normal ml-2">(Optional, we'll analyze the photo)</span>}
              </label>
              <div className="space-y-3">
                {foodItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input
                      id={`food-item-${item.id}`}
                      type="text"
                      value={item.name}
                      onChange={(e) => handleFoodItemChange(item.id, e.target.value)}
                      placeholder={index === 0 ? "e.g., French Fries" : "e.g., Ketchup"}
                      className="block w-full bg-gray-100 border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-medium focus:border-primary-medium"
                      aria-label={`Food item ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFoodItem(item.id)}
                      disabled={foodItems.length <= 1}
                      className="p-2 text-gray-500 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors rounded-full hover:bg-gray-100"
                      aria-label={`Remove food item ${index + 1}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFoodItem}
                className="mt-4 font-medium text-primary-medium hover:text-primary-dark transition-colors"
              >
                + Add another item
              </button>
            </div>

            <div>
              <label className="block text-base font-medium text-primary-dark mb-2">
                What kind of meal are you going for? <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {VIBES.map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVibe(currentVibe => currentVibe === v ? '' : v)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      vibe === v 
                        ? 'bg-primary-medium text-white shadow-md' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="prompt" className="block text-base font-medium text-gray-800">What's your question?</label>
              
              <div className="mt-2 mb-3">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(question)}
                      className={`px-4 py-2 text-sm rounded-full font-medium transition-all hover:shadow-md ${
                        prompt === question 
                          ? 'bg-primary-medium text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              <CustomVibes
                customVibes={limits.customVibes}
                canUseCustom={canUseCustomVibes()}
                onAddVibe={handleAddCustomVibe}
                onRemoveVibe={handleRemoveCustomVibe}
                onUpgradeClick={() => setShowPricingModal(true)}
              />
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., How much ketchup should I use for these fries?"
                className="mt-2 block w-full bg-gray-100 border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-medium focus:border-primary-medium"
                rows={2}
                aria-describedby="prompt-help"
              />
              <div id="prompt-help" className="sr-only">
                Enter your cooking question or use one of the preset options above
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isFormIncomplete || isFollowUpLoading}
              className={`w-full flex justify-center items-center font-bold py-3 px-6 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                isLoading || isFormIncomplete || isFollowUpLoading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-primary-medium text-white hover:bg-primary-dark focus:ring-primary-medium'
              }`}
            >
              {isLoading ? <><LoadingIcon /> Thinking...</> : 'Calculate My Bites!'}
            </button>
          </form>

          <ResultCard 
            isLoading={isLoading} 
            result={result}
            costSavingsInfo={costSavingsInfo}
            canFollowUp={!!followUpContext}
            isFollowUpLoading={isFollowUpLoading}
            canUseFollowUp={canUseFollowUp(followUpCount)}
            onFollowUp={handleFollowUp}
            onUpgradeClick={() => setShowPricingModal(true)}
          />
          
          {result && (
            <div className="mt-6 space-y-4">
              <CostSavingsInsights
                costSavingsInfo={costSavingsInfo}
                canUseAdvanced={canUseCostSavings()}
                totalRecommendations={history.length}
                onUpgradeClick={() => setShowPricingModal(true)}
              />
              
              <RecipeExport
                foodItems={foodItems.map(item => item.name).filter(name => name.trim())}
                prompt={prompt}
                result={result}
                canExport={canExportRecipes()}
                onUpgradeClick={() => setShowPricingModal(true)}
              />
            </div>
          )}
          
          <HistoryList history={sortedHistory} onRestore={handleRestore} onClear={handleClearHistory} />
          
          {/* Waste Tracker Dashboard */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">💰 Waste Tracker</h3>
              <button
                onClick={() => setShowWasteTracker(!showWasteTracker)}
                className="text-primary-medium hover:text-primary-dark font-medium"
              >
                {showWasteTracker ? 'Hide' : 'Show'} Dashboard
              </button>
            </div>
            
            {showWasteTracker && (
              <WasteTrackerDashboard
                totalRecommendations={history.length}
                isPremium={limits.isPremium || limits.isProTier}
                onUpgradeClick={() => setShowPricingModal(true)}
              />
            )}
          </div>
          
          {(limits.isPremium || limits.isProTier) && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pro Features</h3>
                <button
                  onClick={() => setShowMealPlanner(!showMealPlanner)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showMealPlanner ? 'Hide' : 'Show'} Meal Planner
                </button>
              </div>
              
              {showMealPlanner && (
                <MealPlanner
                  canUseMealPlanning={canUseMealPlanning()}
                  onUpgradeClick={() => setShowPricingModal(true)}
                />
              )}
            </div>
          )}
        </main>
      </div>
      
      <PricingModal 
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        trialStatus={getTrialStatus()}
        onUpgrade={handleUpgrade}
      />
      
      <TrialEndModal
        isOpen={showTrialEndModal}
        onClose={() => handleTrialEndModalClose()}
        totalSaved={calculateTrialSavings().totalSaved}
        totalRecommendations={calculateTrialSavings().totalRecommendations}
        wastePreventedOz={calculateTrialSavings().wastePreventedOz}
        onSelectPlan={handleTrialEndSelectPlan}
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedPaymentPlan(null);
        }}
        selectedPlan={selectedPaymentPlan || { type: 'monthly', price: '$2.99/month' }}
        onPaymentSuccess={handlePaymentSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default App;