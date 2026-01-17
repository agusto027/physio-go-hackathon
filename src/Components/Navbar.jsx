"use client";

import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Search, Mail, LayoutDashboard, LogIn, UserPlus } from "lucide-react";

// Helper component for active links with icons
function NavLink({ href, children, onClick, icon: Icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? "text-[#38BDF8] bg-[#38BDF8]/10"
          : "text-[#E2E8F0]/70 hover:text-white hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-[#38BDF8]' : 'text-[#94A3B8] group-hover:text-[#38BDF8]'} transition-colors`} />}
      <span className="whitespace-nowrap">{children}</span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/5"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const logoSrc = "/logo.png";

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/AiMatcher", label: "AI Matcher", icon: Sparkles },
    { href: "/FindAPhysio", label: "Find Physio", icon: Search },
    { href: "/ContactUs", label: "Contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0D1117]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo - Clean & Modern */}
<Link href="/" className="flex items-center gap-3 group flex-shrink-0">
  <div className="relative flex items-center justify-center">
    <img
      src={logoSrc}
      className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
      alt="PhysioGo Logo"
    />
    {/* Soft glow on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-cyan-400/30" />
  </div>
  <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:drop-shadow-md">
    PhysioGo
  </span>
</Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center justify-center gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
          
          <SignedIn>
            <NavLink href="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
          </SignedIn>
        </nav>

        {/* Desktop Auth Buttons - Right aligned */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-sm font-semibold transition-all duration-200 hover:bg-[#38BDF8]/20 hover:border-[#38BDF8]/50 hover:shadow-[0_8px_20px_rgba(56,189,248,0.25)] hover:-translate-y-0.5">
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#38BDF8]/90 text-[#05070A] text-sm font-bold transition-all duration-200 shadow-[0_8px_20px_rgba(56,189,248,0.3)] hover:shadow-[0_12px_30px_rgba(56,189,248,0.4)] hover:-translate-y-0.5">
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="rounded-full border-2 border-[#38BDF8]/30 p-0.5 hover:border-[#38BDF8]/50 transition-colors">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors lg:hidden flex-shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#0D1117] overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
              
              <SignedIn>
                <NavLink href="/dashboard" icon={LayoutDashboard} onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
              </SignedIn>

              <div className="h-px bg-white/10 my-2" />

              <SignedOut>
                <div className="flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-sm font-semibold transition-all hover:bg-[#38BDF8]/20 hover:border-[#38BDF8]/50"
                    >
                      <LogIn className="w-4 h-4" />
                      Log in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#38BDF8]/90 text-[#05070A] text-sm font-bold shadow-[0_8px_20px_rgba(56,189,248,0.3)] transition-all hover:shadow-[0_12px_30px_rgba(56,189,248,0.4)]"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="px-4 py-2 flex items-center justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}