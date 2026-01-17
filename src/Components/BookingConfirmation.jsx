'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, MapPin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';

export default function BookingConfirmation({ isOpen, appointment, onClose }) {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();

  const handleContinue = () => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      // User is logged in, go to their dashboard
      onClose();
      router.push('/dashboard');
    } else {
      // User is not logged in - store booking email for matching after login
      if (appointment?.email) {
        sessionStorage.setItem('pendingBookingEmail', appointment.email);
      }
      // SignInButton will handle the redirect
    }
  };

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
            onClick={onClose}
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
              className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.75)] w-full max-w-md pointer-events-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Icon */}
              <div className="flex justify-center pt-8 pb-4">
                <div className="w-20 h-20 bg-[#38BDF8]/15 border border-[#38BDF8]/30 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-[#38BDF8]" />
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Appointment Confirmed!</h2>
                  <p className="text-[#94A3B8] text-sm">
                    Your physiotherapist has been assigned and will arrive at your location.
                  </p>
                </div>

                {/* Appointment Details */}
                <div className="rounded-2xl border border-white/10 bg-[#0D1117] p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-1">Physiotherapist</p>
                      <p className="text-white font-semibold">{appointment.therapistName}</p>
                      <p className="text-[#94A3B8] text-sm">{appointment.therapistSpecialty}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-1">Date</p>
                      <p className="text-white">{appointment.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-1">Time</p>
                      <p className="text-white">{appointment.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8] mb-1">Address</p>
                      <p className="text-white text-sm">{appointment.address}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {isLoaded && isSignedIn ? (
                    <button
                      onClick={handleContinue}
                      className="flex-1 rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
                    >
                      View Dashboard
                    </button>
                  ) : (
                    <SignInButton mode="modal" redirectUrl="/dashboard">
                      <button
                        onClick={handleContinue}
                        className="flex-1 rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
                      >
                        Log in to View Dashboard
                      </button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

