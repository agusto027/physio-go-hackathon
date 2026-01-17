"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageSquare, Clock, MapPin, User, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CancelConfirmation from '@/Components/CancelConfirmation';
import TrackPhysiotherapist from '@/Components/TrackPhysiotherapist';

function BookingCard({ appointment, onReschedule, onCancel }) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${appointment.phone || '+1234567890'}`;
  };

  const handleMessage = () => {
    // In a real app, this would open a messaging interface
    alert(`Messaging ${appointment.therapistName}...`);
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    onCancel(appointment);
    setShowCancelConfirm(false);
  };

  return (
    <>
      <CancelConfirmation
        isOpen={showCancelConfirm}
        appointment={appointment}
        onConfirm={handleCancelConfirm}
        onCancel={() => setShowCancelConfirm(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-white/10 bg-[#1A202C] p-5 shadow-[0_25px_60px_rgba(3,7,18,0.55)] transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-[#38BDF8]" />
              <h3 className="text-white font-semibold">{appointment.therapistName}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#FAD048] fill-current" />
                <span className="text-xs text-[#94A3B8]">{appointment.therapistRating}</span>
              </div>
            </div>
            <p className="text-[#94A3B8] text-sm mb-1">{appointment.therapistSpecialty}</p>
            <p className="text-[#94A3B8] text-xs mb-3">{appointment.issue}</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-[#38BDF8]/15 text-[#38BDF8] font-medium border border-[#38BDF8]/20">
            {appointment.status}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Calendar className="w-4 h-4 text-[#38BDF8]" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Clock className="w-4 h-4 text-[#38BDF8]" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <MapPin className="w-4 h-4 text-[#38BDF8]" />
            <span className="truncate">{appointment.address}</span>
          </div>
        </div>

        {/* Tracking Section */}
        {appointment.status === 'upcoming' && (
          <TrackPhysiotherapist appointment={appointment} />
        )}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
          <button
            onClick={handleCall}
            className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-white py-2 px-3 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call</span>
          </button>
          <button
            onClick={handleMessage}
            className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-white py-2 px-3 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Message</span>
          </button>
          <button
            onClick={() => onReschedule(appointment)}
            className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] py-2 px-3 text-sm font-medium transition hover:bg-[#38BDF8]/20"
          >
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Reschedule</span>
          </button>
          <button
            onClick={handleCancelClick}
            className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 py-2 px-3 text-sm font-medium transition hover:bg-red-500/20 hover:border-red-500/50"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

function HealthProfile({ condition, painLevel, expertise }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-white/10 bg-[#1A202C] p-6 shadow-[0_25px_60px_rgba(3,7,18,0.55)]"
    >
      <h3 className="text-xl text-white font-semibold mb-4">My Health Profile</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-[#94A3B8] block mb-1 text-sm uppercase tracking-[0.35em]">Condition</label>
          <div className="text-white font-medium">{condition}</div>
        </div>

        <div>
          <label className="text-[#94A3B8] block mb-1 text-sm uppercase tracking-[0.35em]">Pain Level</label>
          <div className="flex items-center gap-2">
            <div className="text-white font-medium">{painLevel}</div>
            <div className="text-[#94A3B8]">/10</div>
          </div>
        </div>

        <div>
          <label className="text-[#94A3B8] block mb-1 text-sm uppercase tracking-[0.35em]">Preferred Expertise</label>
          <div className="text-white font-medium">{expertise}</div>
        </div>
        <Link href="/AiMatcher">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 px-4 rounded-full bg-[#38BDF8] text-[#05070A] font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
        >
          Update Profile
        </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const username = user?.username || user?.firstName || 'there';
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments linked to user's email
    if (user?.primaryEmailAddress?.emailAddress) {
      const userEmail = user.primaryEmailAddress.emailAddress.toLowerCase().trim();
      const emailKey = `appointments_${userEmail}`;
      const userAppointments = localStorage.getItem(emailKey);
      
      if (userAppointments) {
        setAppointments(JSON.parse(userAppointments));
      } else {
        // Check for pending booking with this email
        const pendingEmail = sessionStorage.getItem('pendingBookingEmail');
        if (pendingEmail && pendingEmail.toLowerCase().trim() === userEmail) {
          // Migrate appointments from general storage to user-specific storage
          const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
          const userBookings = allAppointments.filter(apt => 
            apt.email && apt.email.toLowerCase().trim() === userEmail
          );
          if (userBookings.length > 0) {
            localStorage.setItem(emailKey, JSON.stringify(userBookings));
            setAppointments(userBookings);
          }
          sessionStorage.removeItem('pendingBookingEmail');
        }
      }
    } else {
      // Fallback to general storage if no user email
      const stored = localStorage.getItem('appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    }
  }, [user]);

  const handleReschedule = (appointment) => {
    // Store appointment data for rescheduling
    sessionStorage.setItem('rescheduleAppointment', JSON.stringify(appointment));
    window.location.href = '/book?reschedule=true';
  };

  const handleCancel = (appointment) => {
    // Remove appointment from user-specific storage
    if (user?.primaryEmailAddress?.emailAddress) {
      const userEmail = user.primaryEmailAddress.emailAddress.toLowerCase().trim();
      const emailKey = `appointments_${userEmail}`;
      const updatedAppointments = appointments.filter(apt => apt.id !== appointment.id);
      localStorage.setItem(emailKey, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    } else {
      // Fallback to general storage
      const updatedAppointments = appointments.filter(apt => apt.id !== appointment.id);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');

  return (
    <div className="min-h-screen bg-[#0D1117] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              {username}'s Dashboard
            </h1>
            <p className="text-[#94A3B8] mt-1">Welcome back! Here's an overview of your account.</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/"
              className="rounded-full bg-[#38BDF8] text-[#05070A] px-6 py-2.5 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 inline-block"
            >
              Book a New Session
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Bookings Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-[#38BDF8]" />
              <h2 className="text-xl font-semibold text-white">Upcoming Sessions</h2>
              {upcomingAppointments.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/20">
                  {upcomingAppointments.length}
                </span>
              )}
            </div>
            
            {upcomingAppointments.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#1A202C] p-12 text-center">
                <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                <p className="text-[#94A3B8] mb-4">No upcoming appointments</p>
                <Link
                  href="/"
                  className="inline-block rounded-full bg-[#38BDF8] text-[#05070A] px-6 py-2 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
                >
                  Book Your First Session
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <BookingCard
                    key={appointment.id}
                    appointment={appointment}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Health Profile Section */}
          <div>
            <HealthProfile
              condition={appointments[0]?.issue || "No condition recorded"}
              painLevel={appointments[0]?.painLevel || "N/A"}
              expertise={appointments[0]?.therapistSpecialty || "N/A"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}