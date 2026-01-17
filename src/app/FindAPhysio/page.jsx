import React from "react";
import { Star, Stethoscope, BadgeCheck } from "lucide-react";
import Link from "next/link"; // Changed: from 'react-router-dom' to 'next/link'

const physiotherapists = [
  {
    name: "Dr. Alok Kumar",
    rating: 4.8,
    specialization: "Orthopedic Physiotherapy",
    experience: "12 years of experience",
  },
  {
    name: "Dr. Swati Singh",
    rating: 4.9,
    specialization: "Neurological Physiotherapy",
    experience: "8 years of experience",
  },
  {
    name: "Dr. Rajesh Verma",
    rating: 4.7,
    specialization: "Sports Physiotherapy",
    experience: "15 years of experience",
  },
  {
    name: "Dr. Priyanka Tiwari",
    rating: 4.9,
    specialization: "Pediatric Physiotherapy",
    experience: "10 years of experience",
  },
  {
    name: "Dr. Manoj Bajpai",
    rating: 4.6,
    specialization: "Geriatric Physiotherapy",
    experience: "20 years of experience",
  },
  {
    name: "Dr. Sneha Gupta",
    rating: 4.8,
    specialization: "Cardiopulmonary Physiotherapy",
    experience: "7 years of experience",
  },
];

function FindPhysio() {
  return (
    <div className="min-h-screen bg-[#0D1117] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-white font-bold text-center mb-4">
          Find a Physiotherapist in <span className="text-[#38BDF8]">Lucknow</span>
        </h2>
        <p className="text-[#94A3B8] text-center mb-12">
          Browse our list of top-rated, certified physiotherapists near you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {physiotherapists.map((doc, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-6 flex flex-col items-center hover:border-[#38BDF8]/30 transition"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 bg-[#0D1117] border border-white/10 text-[#94A3B8] text-sm">
                {/* Placeholder for an image or icon */}
              </div>

              <h3 className="text-xl font-semibold mb-1 text-white">
                {doc.name}
              </h3>
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-[#FAD048] mr-1 fill-current" />
                <span className="font-medium text-white">{doc.rating}</span>
              </div>

              <div className="flex items-center text-[#94A3B8] mb-2">
                <Stethoscope className="w-4 h-4 mr-2 text-[#38BDF8]" />
                <span>{doc.specialization}</span>
              </div>

              <div className="flex items-center text-[#94A3B8] mb-6">
                <BadgeCheck className="w-4 h-4 mr-2 text-[#38BDF8]" />
                <span>{doc.experience}</span>
              </div>

              <Link
                className="mt-auto w-full rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 text-center"
                href="/book"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindPhysio;