import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY"; 
const ai = new GoogleGenAI({ apiKey });
// The recommended model for fast, general-purpose tasks is gemini-2.5-flash
const MODEL_NAME = "gemini-2.5-flash"; 

function AIMatcher() {
  const [condition, setCondition] = useState("");
  const [painLevel, setPainLevel] = useState(5);
  const [expertise, setExpertise] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  // Add state for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatch = async () => {
    // Clear previous states
    setRecommendation(null);
    setError(null);

    // 3. START: Set loading state
    setIsLoading(true);

    // 4. Define the SYSTEM INSTRUCTION and the USER PROMPT
    const systemInstruction = `You are an expert Physiotherapist Matcher AI. Your task is to analyze a patient's condition, pain level (1-10), and desired expertise to recommend the single best type of physiotherapist.

    You MUST respond with a single, valid JSON object that adheres strictly to this TypeScript interface:
    {
        "type": string; // The recommended physiotherapist specialty (e.g., "Orthopedic Physiotherapist", "Sports Physiotherapist", "Neuro-Physiotherapist", "Geriatric Physiotherapist", "General Physiotherapist").
        "rationale": string; // A concise explanation (2-3 sentences) for the recommendation based on the provided inputs.
    }
    
    Do not include any introductory text, Markdown formatting (like \`\`\`json), or any other text outside of the JSON object.
    
    GUIDELINES:
    1. Orthopedic/Musculoskeletal: Best for high pain (7+), acute injuries, or spinal issues (back/neck).
    2. Sports: Best for conditions mentioning 'sports', 'athletic', 'performance', or specific sports injuries.
    3. Neuro: Best for conditions mentioning 'stroke', 'Parkinson's', 'MS', 'head injury', or 'balance issues'.
    4. Geriatric: Best for conditions mentioning 'elderly', 'fall prevention', 'mobility in seniors', or 'age-related'.
    5. General: Use as a default for low to moderate pain and simple conditions.
    `;

    const userPrompt = `Patient Condition: "${condition}". Pain Level (1-10): ${painLevel}. Preferred Expertise: "${expertise}".`;

    try {
      // 5. Call the Gemini API with structured output configuration
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
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
          },
        },
      });

      // 6. Parse and set the recommendation
      const jsonResponse = JSON.parse(response.text.trim());
      setRecommendation(jsonResponse);
    } catch (e) {
      // 7. Handle API errors
      console.error("Gemini API Error:", e);
      setError("Failed to get recommendation. Please check your API key or model name.");
    } finally {
      // 8. END: Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-teal-700">
            ✨ AI Physio Matcher
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Answer a few questions and our AI will recommend the best type of
            physiotherapist for your needs.
          </p>

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Describe your condition
          </label>
          <textarea
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="e.g., severe back pain or difficulty walking..."
            className="w-full p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-teal-500 focus:ring-teal-500 focus:ring-1 outline-none mb-4"
            rows="3"
          />

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Pain Level: {painLevel}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(e.target.value)}
            className="w-full mb-6 accent-teal-600"
          />

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Preferred Expertise (optional)
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., Sports injuries, geriatrics"
            className="w-full p-3 rounded-lg bg-gray-50
            text-gray-900 border border-gray-300 focus:border-teal-500 focus:ring-teal-500 focus:ring-1 outline-none mb-6"
          />

          <button
            onClick={handleMatch}
            disabled={isLoading || !condition} // Disable button when loading or no condition is entered
            className={`w-full text-white py-3 rounded-lg font-semibold transition ${
              isLoading || !condition
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "Matching..." : "Save and Get Matched"}
          </button>

          <button className="w-full bg-white hover:bg-gray-100 text-teal-600 py-3 rounded-lg mt-3 border border-teal-500 font-semibold transition">
            Go to My Dashboard
          </button>
        </div>

        {/* Right Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-teal-700">
            📋 AI Recommendation
          </h2>

          {/* Display Loading State */}
          {isLoading && (
            <div className="mt-4 flex items-center text-teal-600">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing your condition...</span>
            </div>
          )}

          {/* Display Error State */}
          {error && (
            <p className="text-red-500 mt-4 font-medium">
              ❌ Error: {error}
            </p>
          )}

          {/* Display Initial/No Recommendation State */}
          {!recommendation && !isLoading && !error ? (
            <p className="text-gray-600 mt-4">
              Your AI recommendation will appear here after you submit your
              condition.
            </p>
          ) : null}

          {/* Display Recommendation State */}
          {recommendation && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-teal-700 mb-1">
                Recommended Physio Type
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                {recommendation.type}
              </p>
              <h4 className="text-gray-800 font-medium mb-2">Rationale</h4>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {recommendation.rationale}
              </p>
              <Link to='/book'>
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                Book a Recommended Therapist
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIMatcher;