"use client"; 

import React, { useState } from "react";
import Link from "next/link"; // Changed: Use next/link
import { getAiRecommendation } from "./actions"; // Import the Server Action

function AIMatcher() {
  const [condition, setCondition] = useState("");
  const [painLevel, setPainLevel] = useState(5);
  const [expertise, setExpertise] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function is now much simpler!
  const handleMatch = async () => {
    setRecommendation(null);
    setError(null);
    setIsLoading(true);

    // Call the Server Action
    const result = await getAiRecommendation(condition, painLevel, expertise);

    if (result.error) {
      setError(result.error);
    } else {
      setRecommendation(result.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Card (Form) */}
        <div className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-8">
          <h2 className="text-2xl font-bold mb-2 text-white">
             AI Physio Matcher
          </h2>
          <p className="text-[#94A3B8] mb-6 text-sm">
            Answer a few questions and our AI will recommend the best type of
            physiotherapist for your needs.
          </p>

          <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
            Describe your condition
          </label>
          <textarea
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="e.g., severe back pain or difficulty walking..."
            className="w-full p-3 rounded-2xl bg-[#0D1117] text-white border border-white/10 placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none mb-4"
            rows="3"
          />

          <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
            Pain Level: {painLevel}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(e.target.value)}
            className="w-full mb-6 accent-[#38BDF8]"
          />

          <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
            Preferred Expertise (optional)
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., Sports injuries, geriatrics"
            className="w-full p-3 rounded-2xl bg-[#0D1117] text-white border border-white/10 placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none mb-6"
          />

          <button
            onClick={handleMatch}
            disabled={isLoading || !condition}
            className={`w-full rounded-full py-3 font-semibold transition ${
              isLoading || !condition
                ? "bg-[#1A202C] text-[#94A3B8] cursor-not-allowed border border-white/10"
                : "bg-[#38BDF8] text-[#05070A] shadow-[0_18px_35px_rgba(56,189,248,0.35)] hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Matching..." : "Save and Get Matched"}
          </button>

          <Link href="/dashboard" className="block w-full">
            <button className="w-full rounded-full border border-white/20 bg-transparent text-white py-3 mt-3 font-semibold transition hover:border-white/40">
              Go to My Dashboard
            </button>
          </Link>
        </div>

        {/* Right Card (Results) */}
        <div className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-8">
          <h2 className="text-2xl font-bold mb-2 text-white">
             AI Recommendation
          </h2>

          {isLoading && (
            <div className="mt-4 flex items-center text-[#38BDF8]">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing your condition...</span>
            </div>
          )}

          {error && (
            <p className="text-red-400 mt-4 font-medium">❌ Error: {error}</p>
          )}

          {!recommendation && !isLoading && !error ? (
            <p className="text-[#94A3B8] mt-4">
              Your AI recommendation will appear here...
            </p>
          ) : null}

          {recommendation && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Recommended Physio Type
              </h3>
              <p className="text-xl font-semibold text-[#38BDF8] mb-4">
                {recommendation.type}
              </p>
              <h4 className="text-white font-medium mb-2">Rationale</h4>
              <p className="text-[#94A3B8] mb-6 text-sm leading-relaxed">
                {recommendation.rationale}
              </p>
              <Link
                href="/book"
                className="w-full rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 text-center block"
              >
                Book a Recommended Therapist
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AIMatcher;