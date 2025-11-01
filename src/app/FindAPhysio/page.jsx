import React from "react";
import { Star, Stethoscope, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen  text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-gray-400 font-bold text-center mb-4">
          Find a Physiotherapist in <span className="text-teal-400">Lucknow</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Browse our list of top-rated, certified physiotherapists near you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {physiotherapists.map((doc, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-teal-600/30 transition"
            >
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4 text-gray-400 text-sm">
              
              </div>

              <h3 className="text-xl font-semibold mb-1 text-black/80">{doc.name}</h3>
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-medium text-black/70">{doc.rating}</span>
              </div>

              <div className="flex items-center text-gray-300 mb-2">
                <Stethoscope className="w-4 h-4 mr-2 text-teal-400" />
                <span>{doc.specialization}</span>
              </div>

              <div className="flex items-center text-gray-400 mb-6">
                <BadgeCheck className="w-4 h-4 mr-2 text-teal-400" />
                <span>{doc.experience}</span>
              </div>

              <Link className="mt-auto w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold text-center"
              to="/book"
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
