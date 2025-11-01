"use server"; // This marks all functions in this file as Server Actions

import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the SDK safely on the server
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}
const genAI = new GoogleGenerativeAI(apiKey);
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

const systemInstruction = `You are an expert Physiotherapist Matcher AI... (Your full system instruction here)`;

// 3. Create the Server Action function
export async function getAiRecommendation(condition, painLevel, expertise) {
  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const userPrompt = `Patient Condition: "${condition}". Pain Level (1-10): ${painLevel}. Preferred Expertise: "${expertise}".`;

    const result = await model.generateContent(userPrompt);
    const response = result.response;
    
    // Parse the JSON text from the model's response part
    const data = JSON.parse(response.candidates[0].content.parts[0].text);

    return { data };
  } catch (e) {
    console.error("Gemini API Error:", e);
    return { error: "Failed to get recommendation. Please try again." };
  }
}