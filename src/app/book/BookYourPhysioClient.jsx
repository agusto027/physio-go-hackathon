"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookingConfirmation from "@/Components/BookingConfirmation";

// Mock physiotherapist database for auto-assignment
const physiotherapists = [
  { id: "1", name: "Dr. Alok Kumar", specialty: "Orthopedic Physiotherapy", rating: 4.8, available: true },
  { id: "2", name: "Dr. Swati Singh", specialty: "Neurological Physiotherapy", rating: 4.9, available: true },
  { id: "3", name: "Dr. Rajesh Verma", specialty: "Sports Physiotherapy", rating: 4.7, available: true },
  { id: "4", name: "Dr. Priyanka Tiwari", specialty: "Pediatric Physiotherapy", rating: 4.9, available: true },
  { id: "5", name: "Dr. Manoj Bajpai", specialty: "Geriatric Physiotherapy", rating: 4.6, available: true },
  { id: "6", name: "Dr. Sneha Gupta", specialty: "Cardiopulmonary Physiotherapy", rating: 4.8, available: true },
];

// Auto-assign physiotherapist based on condition and recommendation
function assignPhysiotherapist(condition, recommendation) {
  const specialty = recommendation || "General Physiotherapy";
  const matched = physiotherapists.find((p) =>
    p.specialty.toLowerCase().includes(specialty.toLowerCase().split(" ")[0])
  );
  return matched || physiotherapists[0]; // Fallback to first if no match
}

export default function BookYourPhysioClient() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    issue: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointment, setAppointment] = useState(null);

  // Load pre-filled data from AI Matcher or reschedule
  useEffect(() => {
    if (searchParams.get("from") === "ai") {
      const aiData = sessionStorage.getItem("aiMatcherData");
      if (aiData) {
        const parsed = JSON.parse(aiData);
        setFormData((prev) => ({
          ...prev,
          issue: parsed.condition || prev.issue,
        }));
      }
    } else if (searchParams.get("reschedule") === "true") {
      const rescheduleData = sessionStorage.getItem("rescheduleAppointment");
      if (rescheduleData) {
        const parsed = JSON.parse(rescheduleData);
        setFormData({
          name: parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
          date: "",
          time: "",
          issue: parsed.issue || "",
        });
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get AI recommendation data
    const aiData = sessionStorage.getItem("aiMatcherData");
    const parsed = aiData ? JSON.parse(aiData) : null;

    // Auto-assign physiotherapist
    const assignedTherapist = assignPhysiotherapist(formData.issue, parsed?.recommendation);

    // Format date and time
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create appointment object with user email for proper linking
    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email.toLowerCase().trim(), // Normalize email for matching
      phone: formData.phone,
      address: formData.address,
      date: formattedDate,
      time: formData.time,
      issue: formData.issue,
      therapistId: assignedTherapist.id,
      therapistName: assignedTherapist.name,
      therapistSpecialty: assignedTherapist.specialty,
      therapistRating: assignedTherapist.rating,
      status: "upcoming",
      createdAt: new Date().toISOString(),
      // Add tracking data
      tracking: {
        status: "assigned", // assigned, en_route, arrived, in_session, completed
        currentLocation: null, // Will be set when tracking starts
        estimatedArrival: null, // Will be calculated
        distance: null, // Will be calculated
        lastUpdate: new Date().toISOString(),
      },
    };

    // Store appointments by email for proper user linking
    const emailKey = `appointments_${formData.email.toLowerCase().trim()}`;
    const existingAppointments = JSON.parse(localStorage.getItem(emailKey) || "[]");

    // Also store in general appointments for backward compatibility
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    if (searchParams.get("reschedule") === "true") {
      // Update existing appointment
      const rescheduleData = sessionStorage.getItem("rescheduleAppointment");
      if (rescheduleData) {
        const oldAppointment = JSON.parse(rescheduleData);
        const index = existingAppointments.findIndex((apt) => apt.id === oldAppointment.id);
        if (index !== -1) {
          existingAppointments[index] = { ...newAppointment, id: oldAppointment.id };
        }
        // Update in all appointments too
        const allIndex = allAppointments.findIndex((apt) => apt.id === oldAppointment.id);
        if (allIndex !== -1) {
          allAppointments[allIndex] = { ...newAppointment, id: oldAppointment.id };
        }
        sessionStorage.removeItem("rescheduleAppointment");
      }
    } else {
      // Add new appointment
      existingAppointments.unshift(newAppointment);
      allAppointments.unshift(newAppointment);
    }

    // Save to both email-specific and general storage
    localStorage.setItem(emailKey, JSON.stringify(existingAppointments));
    localStorage.setItem("appointments", JSON.stringify(allAppointments));

    // Show confirmation popup
    setAppointment(newAppointment);
    setShowConfirmation(true);

    // Clear AI Matcher data
    sessionStorage.removeItem("aiMatcherData");
  };

  return (
    <>
      <BookingConfirmation
        isOpen={showConfirmation}
        appointment={appointment}
        onClose={() => setShowConfirmation(false)}
      />

      <div className="flex items-center justify-center min-h-screen bg-[#0D1117] px-4 py-12">
        <div className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-10 w-full max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
            {searchParams.get("reschedule") === "true"
              ? "Reschedule Appointment"
              : "Book Your Physiotherapy Session"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Enter your complete address for home visit"
                className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white focus:border-[#38BDF8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm uppercase tracking-[0.35em]">
                Describe Your Problem
              </label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="4"
                placeholder="E.g., back pain, shoulder stiffness, post-surgery recovery..."
                className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
