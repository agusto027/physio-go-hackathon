'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getAiRecommendation } from '@/app/AiMatcher/actions';
import { useRouter } from 'next/navigation';

export default function AIMatcherModal({ isOpen, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [condition, setCondition] = useState('');
  const [painLevel, setPainLevel] = useState(5);
  const [expertise, setExpertise] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatch = async () => {
    setError(null);
    setIsLoading(true);

    const result = await getAiRecommendation(condition, painLevel, expertise);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setRecommendation(result.data);
      setStep(2);
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    // Store AI data in sessionStorage for booking page
    const aiData = {
      condition,
      painLevel,
      expertise,
      recommendation: recommendation?.type,
      rationale: recommendation?.rationale,
    };
    sessionStorage.setItem('aiMatcherData', JSON.stringify(aiData));
    
    // Close modal and redirect to booking page
    onClose();
    router.push('/book?from=ai');
  };

  const handleClose = () => {
    setStep(1);
    setCondition('');
    setPainLevel(5);
    setExpertise('');
    setRecommendation(null);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.75)] w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1A202C] border-b border-white/10 p-6 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-2xl font-bold text-white">AI Physio Matcher</h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/10 transition text-[#94A3B8] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 1 ? (
                  <div className="space-y-6">
                    <p className="text-[#94A3B8] text-sm">
                      Answer a few quick questions and our AI will recommend the best physiotherapist for your needs.
                    </p>

                    <div>
                      <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
                        Describe your condition
                      </label>
                      <textarea
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        placeholder="e.g., severe back pain, difficulty walking, post-surgery recovery..."
                        className="w-full p-3 rounded-2xl bg-[#0D1117] text-white border border-white/10 placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none resize-none"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
                        Pain Level: {painLevel}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={painLevel}
                        onChange={(e) => setPainLevel(Number(e.target.value))}
                        className="w-full accent-[#38BDF8]"
                      />
                      <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
                        <span>Mild</span>
                        <span>Severe</span>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-[#E2E8F0] text-sm font-semibold uppercase tracking-[0.35em]">
                        Preferred Expertise (optional)
                      </label>
                      <input
                        type="text"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        placeholder="e.g., Sports injuries, geriatrics, neurological"
                        className="w-full p-3 rounded-2xl bg-[#0D1117] text-white border border-white/10 placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleMatch}
                      disabled={isLoading || !condition.trim()}
                      className={`w-full rounded-full py-3 font-semibold transition ${
                        isLoading || !condition.trim()
                          ? 'bg-[#0D1117] text-[#94A3B8] cursor-not-allowed border border-white/10'
                          : 'bg-[#38BDF8] text-[#05070A] shadow-[0_18px_35px_rgba(56,189,248,0.35)] hover:-translate-y-0.5'
                      }`}
                    >
                      {isLoading ? 'Analyzing...' : 'Get Recommendation'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#38BDF8]/15 border border-[#38BDF8]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Perfect Match Found!</h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0D1117] p-6 space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-2">Recommended Type</p>
                        <p className="text-2xl font-bold text-[#38BDF8]">{recommendation?.type}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-2">Why This Match</p>
                        <p className="text-[#E2E8F0] leading-relaxed">{recommendation?.rationale}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-full border border-white/20 bg-transparent text-white py-3 font-semibold transition hover:border-white/40"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="flex-1 rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
                      >
                        Continue to Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

