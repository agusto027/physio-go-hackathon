'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactOverlay({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur"
          />

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border border-white/10 bg-[#0D1117]/95 p-6 shadow-[0_25px_65px_rgba(3,7,18,0.75)] backdrop-blur"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
              <button
                onClick={onClose}
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#1A202C] px-4 py-3 text-white shadow-inner placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#1A202C] px-4 py-3 text-white shadow-inner placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-[#1A202C] px-4 py-3 text-white shadow-inner placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#38BDF8] px-4 py-3 text-sm font-semibold text-[#05070A] shadow-[0_15px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38BDF8]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}