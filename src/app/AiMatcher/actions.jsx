"use server"; // This marks all functions in this file as Server Actions

import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";

// 2. Define the schema and system instruction (moved from your component)
const responseSchema = {
  type: "OBJECT",
  properties: {
    type: {
      type: "STRING",
      description: "The recommended physiotherapist specialty.",
    },
    rationale: {
      type: "STRING",
      description: "A concise explanation (2-3 sentences) for the recommendation.",
    },
  },
  required: ["type", "rationale"],
};

const systemInstruction = `You are an expert Physiotherapist Matcher AI. Your role is to analyze patient conditions, pain levels, and preferences to recommend the most suitable type of physiotherapist specialty. Consider factors like:
- Condition severity and type
- Pain level (1-10 scale)
- Patient preferences for expertise areas
- Best match for optimal recovery outcomes

Provide clear, professional recommendations with concise rationale.`;

// 3. Create the Server Action function
export async function getAiRecommendation(condition, painLevel, expertise) {
  try {
    // Initialize lazily so builds don't crash if env vars aren't set.
    const apiKey =
      process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        error:
          "Missing GOOGLE_AI_API_KEY (preferred) or NEXT_PUBLIC_GEMINI_API_KEY (legacy). Add one in Vercel Project Settings → Environment Variables.",
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const userPrompt = `Patient Condition: "${condition}". Pain Level (1-10): ${painLevel}. Preferred Expertise: "${expertise || 'Not specified'}". Please recommend the best physiotherapist specialty type and provide a clear rationale.`;

    const result = await model.generateContent(userPrompt);
    const response = result.response;
    
    // Parse the JSON text from the model's response part
    const text = response.candidates[0].content.parts[0].text;
    const data = JSON.parse(text);

    return { data };
  } catch (e) {
    console.error("Gemini API Error:", e);
    return { error: e.message || "Failed to get recommendation. Please try again." };
  }
}