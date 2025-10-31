import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type { BiteRecommendationParams, FollowUpParams } from '../types';

const systemInstruction = `You are a helpful culinary assistant called 'BiteMatch AI'. Your goal is to help users perfectly pair their food items and figure out ideal portioning for maximum enjoyment.

- Analyze the provided user descriptions and image (if available) to give a concise, practical, and friendly recommendation.
- If the user provides an image but does not list any food items, your first step is to identify the main foods in the photo.
- Critically analyze the user's question. If it mentions a specific food item (e.g., 'gravy for the potatoes'), tailor your recommendation to THAT ITEM, using the image for context about its portion size.
- If the user provides a "vibe" (e.g., "Healthy & Light", "Comfort Food"), tailor your recommendation to match that theme.
- When describing sizes or amounts, always use common, relatable objects for comparison (e.g., 'a dollop the size of a golf ball' instead of '2 tablespoons').
- Start your response with a friendly tone and provide only the recommendation text. Do not use Markdown or JSON.

- **Optional Cost Savings Insight:** After providing the main recommendation, you MAY add a brief insight about food waste prevention and potential cost savings *only for the recommended portion*.
- Frame this insight conversationally, focusing on how proper portioning prevents waste and saves money.
- **CRITICAL:** You MUST wrap this optional cost savings insight in special tags: [SAVINGS_START] and [SAVINGS_END]. For example: '...perfect for your pasta! [SAVINGS_START]This portioning prevents sauce waste - you'll save about $0.50 per meal and avoid throwing away leftover sauce that goes bad.[SAVINGS_END]' If you have no insight, do not include the tags.`;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const generatePrompt = (foodItems: string[], userPrompt: string, vibe?: string): string => {
  let promptBase: string;
  if (foodItems.length > 0) {
    const foodList = foodItems.join(', ');
    promptBase = `The user is having a meal with: ${foodList}. Their question is: "${userPrompt}"`;
  } else {
    promptBase = `The user has provided an image of their meal. Please identify the food and answer their question: "${userPrompt}"`;
  }
  
  // Add specific guidance based on question type
  let responseGuidance = '';
  if (userPrompt.toLowerCase().includes('how much')) {
    responseGuidance = ' Focus on specific measurements and portions using relatable comparisons.';
  } else if (userPrompt.toLowerCase().includes('ratio') || userPrompt.toLowerCase().includes('perfect ratio')) {
    responseGuidance = ' Focus on the ideal proportions and balance between ingredients.';
  } else if (userPrompt.toLowerCase().includes('taste better') || userPrompt.toLowerCase().includes('make this taste')) {
    responseGuidance = ' Focus on flavor enhancement techniques, seasoning tips, and preparation methods.';
  } else if (userPrompt.toLowerCase().includes('goes well') || userPrompt.toLowerCase().includes('what goes')) {
    responseGuidance = ' Focus on complementary flavors, pairing suggestions, and additional ingredients that work well together.';
  }
  
  // Add vibe-specific guidance
  let vibeGuidance = '';
  if (vibe) {
    switch (vibe) {
      case 'Classic Comfort':
        vibeGuidance = ' Emphasize traditional, hearty, and satisfying approaches. Focus on generous portions, rich flavors, and time-tested combinations that feel indulgent and comforting.';
        break;
      case 'Healthy & Light':
        vibeGuidance = ' Prioritize lighter portions, fresh ingredients, and nutritious options. Suggest ways to reduce calories while maintaining flavor, and recommend fresh herbs, citrus, and lighter cooking methods.';
        break;
      case 'Quick & Easy':
        vibeGuidance = ' Focus on simple, fast solutions that require minimal prep time. Suggest convenient shortcuts, pre-made ingredients, and efficient techniques that save time without sacrificing taste.';
        break;
      case 'Adventurous':
        vibeGuidance = ' Encourage bold, creative, and unique flavor combinations. Suggest exotic ingredients, fusion approaches, and experimental techniques that push culinary boundaries.';
        break;
    }
  }
  
  if (vibe) {
    return `${promptBase} They are going for a "${vibe}" vibe for this meal.${responseGuidance}${vibeGuidance}`;
  }
  return promptBase + responseGuidance + vibeGuidance;
};

const convertImageToBase64 = async (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      resolve({
        mimeType: file.type,
        data: base64Data
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getBiteRecommendationStream = async ({
  image,
  foodItems,
  prompt,
  vibe,
  signal,
  onStream,
  onError
}: BiteRecommendationParams) => {
  try {
    // Check if API key is available
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = "AIzaSyBuRvdOOXP_qVLiB1mVLkDK3n_Z-3Oed28";
    if (!apiKey) {
      onError('🔑 API key missing! The app needs to be configured with a Gemini API key. Please contact support if this persists.');
      return;
    }
    
    // Additional validation for API key format
    if (!apiKey.startsWith('AIza') || apiKey.length < 35) {
      onError('🔑 Invalid API key format detected. Please contact support to resolve this issue.');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction,
      safetySettings
    });

    // Prepare the content parts
    const textPart = { text: generatePrompt(foodItems, prompt, vibe) };
    const parts = [textPart];

if (image) {
  const imageData = await convertImageToBase64(image);
  parts.unshift({
    inlineData: {
      mimeType: imageData.mimeType,
      data: imageData.data
    }
  } as any);
}
    
    // Generate streaming response
    const result = await model.generateContentStream(parts);

    // Process the stream
    for await (const chunk of result.stream) {
      if (signal.aborted) return;
      
      const chunkText = chunk.text();
      if (chunkText) {
        onStream(chunkText);
      }
    }

  } catch (error) {
    if (!signal.aborted) {
      console.error('Gemini API error:', error);
      if (error instanceof Error) {
        onError(`Sorry, I had trouble analyzing your food: ${error.message}`);
      } else {
        onError('Sorry, I had trouble analyzing your food. Please try again!');
      }
    }
  }
};

export const getFollowUpStream = async ({
  context,
  followUpType,
  signal,
  onStream,
  onError
}: FollowUpParams) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      onError('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction,
      safetySettings
    });

    const { foodItems, prompt, result, vibe } = context;
    const contextPrompt = generatePrompt(foodItems, prompt, vibe);

    let followUpInstruction = '';
    if (followUpType === 'another-idea') {
      followUpInstruction = 'Now, please give me another, different idea for this meal. Do not include nutritional info in this follow-up.';
    } else { // 'why'
      followUpInstruction = 'Now, please briefly explain the culinary reasoning behind why your original recommendation works well. Do not include nutritional info in this follow-up.';
    }

    const fullPrompt = `Here was the original situation:\n${contextPrompt}\n\nHere was your recommendation:\n"${result}"\n\n${followUpInstruction}`;

    // Generate streaming response
    const streamResult = await model.generateContentStream([{ text: fullPrompt }]);

    // Process the stream
    for await (const chunk of streamResult.stream) {
      if (signal.aborted) return;
      
      const chunkText = chunk.text();
      if (chunkText) {
        onStream(chunkText);
      }
    }

  } catch (error) {
    if (!signal.aborted) {
      console.error('Gemini follow-up error:', error);
      if (error instanceof Error) {
        onError(`Sorry, I had trouble getting more insights: ${error.message}`);
      } else {
        onError('Sorry, I had trouble getting more insights. Please try again!');
      }
    }
  }
};