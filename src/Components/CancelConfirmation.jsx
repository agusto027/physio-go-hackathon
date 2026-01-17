'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function CancelConfirmation({ isOpen, appointment, onConfirm, onCancel }) {
  if (!appointment) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
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
              className="rounded-3xl border border-red-500/20 bg-[#1A202C] shadow-[0_25px_60px_rgba(239,68,68,0.2)] w-full max-w-md pointer-events-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Cancel Appointment</h2>
                </div>
                <button
                  onClick={onCancel}
                  className="p-2 rounded-full hover:bg-white/10 transition text-[#94A3B8] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-[#E2E8F0] leading-relaxed">
                  Are you sure you want to cancel your appointment with <span className="font-semibold text-white">{appointment.therapistName}</span>?
                </p>
                
                <div className="rounded-2xl border border-white/10 bg-[#0D1117] p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <span className="font-medium text-white">Date:</span>
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <span className="font-medium text-white">Time:</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>

                <p className="text-sm text-[#94A3B8]">
                  This action cannot be undone. You'll need to book a new appointment if you change your mind.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 pt-0 border-t border-white/10">
                <button
                  onClick={onCancel}
                  className="flex-1 rounded-full border border-white/20 bg-transparent text-white py-3 font-semibold transition hover:border-white/40 hover:bg-white/5"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 py-3 font-semibold transition hover:bg-red-500/20 hover:border-red-500/50"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


