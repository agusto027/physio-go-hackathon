"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Calendar, Check, Clock, Home, MapPin, Shield, Star, User, LayoutDashboard } from "lucide-react";
import AIMatcherModal from "@/Components/AIMatcherModal";
import DashboardLink from "@/Components/DashboardLink";

const services = [
  {
    icon: User,
    title: "Certified Clinicians",
    description: "Elite physios with hospital-grade experience and proven recovery plans.",
  },
  {
    icon: Home,
    title: "At-Home Treatments",
    description: "All equipment comes to you, keeping every session personal and calm.",
  },
  {
    icon: Clock,
    title: "Adaptive Scheduling",
    description: "Book same-week visits, reschedule in moments, and stay on track.",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Tell us where",
    description: "Share your location, concerns, and preferred times in one flow.",
  },
  {
    icon: Calendar,
    title: "Match & confirm",
    description: "We pair you with a specialist and lock in your next visit instantly.",
  },
  {
    icon: Check,
    title: "Recover with confidence",
    description: "Your physio arrives with a personalized plan and real-time tracking.",
  },
];

const stats = [
  { label: "Appointments completed", value: "18K+" },
  { label: "Average rating", value: "4.9/5" },
  { label: "Cities covered", value: "32" },
];

function CardShell({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/5 bg-[#11161f]/80 p-8 shadow-[0_25px_60px_rgba(3,7,18,0.55)] ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const [isAIMatcherOpen, setIsAIMatcherOpen] = useState(false);
  const heroSrc = process.env.NEXT_PUBLIC_HERO_IMAGE || "/hero.png";

  return (
    <div className="bg-[#0D1117] text-white">
      <AIMatcherModal isOpen={isAIMatcherOpen} onClose={() => setIsAIMatcherOpen(false)} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0D1117] via-[#0f1a2a] to-[#06080F]" />
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-[120px]" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 lg:py-32 flex flex-col gap-16">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#E2E8F0]/70">
              PhysioGo experience
            </span>
            <h1 className="text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
              Professional Physiotherapy,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8] font-bold">
                 at Your Doorstep
              </span>
            </h1>
            <p className="text-lg text-[#94A3B8] sm:text-xl">
              Book certified physiotherapists who come to your home. Convenient, professional, and personalized care.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => setIsAIMatcherOpen(true)}
                className="rounded-full bg-[#FAD048] px-8 py-4 text-base font-semibold text-[#0D1117] shadow-[0_20px_40px_rgba(250,208,72,0.35)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAD048]"
              >
                Book Now
              </button>
              <Link
                href="/FindAPhysio"
                className="rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur hover:border-white/40 text-center transition"
              >
                Find a Physio
              </Link>
            </div>
          </div>

          <CardShell className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-[#E2E8F0]/80 text-sm">
                <Shield className="h-4 w-4 text-[#38BDF8]" />
                Expert care with hospital-grade standards
              </div>
              <p className="text-2xl font-semibold text-white">
                “The minimal interface made booking effortless. My physio tracked every milestone.”
              </p>
              <div className="flex items-center gap-3 text-sm text-[#E2E8F0]/70">
                <div className="flex items-center gap-1 text-[#FAD048]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                Trusted by thousands of focused recoveries
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E131B] to-[#0A0E15] p-4">
              <div className="rounded-xl bg-[#05070A] p-4">
                <img src={heroSrc} alt="Person doing physiotherapy stretches" className="rounded-2xl border border-white/5" />
              </div>
            </div>
          </CardShell>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/5 bg-[#05070A]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-8 text-center sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2 rounded-3xl border border-white/5 bg-white/5 px-6 py-6 backdrop-blur">
              <p className="text-3xl font-bold text-white">{item.value}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-white/5 bg-[#0D1117] py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">Why PhysioGo</p>
            <h2 className="text-4xl font-semibold text-white">Designed to keep every step effortless</h2>
            <p className="text-lg text-[#94A3B8]">
              Crisp cards, soft highlights, and frictionless flows guide you from intent to recovery.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map(({ icon: Icon, title, description }) => (
              <CardShell key={title} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#38BDF8]/15 text-[#38BDF8]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-[#94A3B8]">{description}</p>
              </CardShell>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-white/5 bg-[#05070A] py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">How it works</p>
            <h2 className="text-4xl font-semibold text-white">Transparent steps anchored in clarity</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <CardShell key={title} className="space-y-4">
                <div className="flex items-center justify-between text-sm text-[#94A3B8]">
                  <span>Step {index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-[#1A202C] p-3 text-[#38BDF8]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{description}</p>
              </CardShell>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1117] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <CardShell className="items-center text-center space-y-6 border border-[#38BDF8]/30 bg-gradient-to-br from-[#0E141F] to-[#06080F]">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#94A3B8]">Ready to begin</p>
            <h2 className="text-4xl font-semibold text-white">
              Calm, confident recovery starts with one tap.
            </h2>
            <p className="text-lg text-[#94A3B8]">
              Book your first visit or explore the intelligent matcher to discover the perfect clinician for your goals.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="rounded-full bg-[#38BDF8] px-8 py-4 text-base font-semibold text-[#05070A] shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
              >
                Book an appointment
              </Link>
              <DashboardLink className="rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white hover:border-white/40 transition-all duration-200 hover:bg-white/5 inline-flex items-center justify-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Access your dashboard
              </DashboardLink>
            </div>
          </CardShell>
        </div>
      </section>
    </div>
  );
}