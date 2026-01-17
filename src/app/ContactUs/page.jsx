"use client"; // <-- This is the only line you need to add

import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill all fields");
      return;
    }
    // In a real app, you'd send this form data to a server or API here
    setStatus("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <div className="rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0D1117] px-4 py-3 h-32 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#38BDF8] text-[#05070A] py-3 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
          >
            Send Message
          </button>
          {status && <p className="text-center text-[#38BDF8] mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
}