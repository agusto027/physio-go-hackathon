'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your PhysioGo assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response (in production, this would call an API)
    setTimeout(() => {
      const botResponse = generateBotResponse(input.trim());
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Booking related
    if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('schedule')) {
      return "To book an appointment, click the 'Book Now' button on the homepage. Our AI Matcher will help you find the perfect physiotherapist based on your condition. You can also visit the 'Find Physio' page to browse available therapists.";
    }

    // Pricing
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee') || lowerInput.includes('charge')) {
      return "Our consultation fee starts at $50 per session. Pricing may vary based on the type of treatment and session duration. For detailed pricing information, please contact us through the Contact page or book a consultation.";
    }

    // Services
    if (lowerInput.includes('service') || lowerInput.includes('treatment') || lowerInput.includes('what do you offer')) {
      return "PhysioGo offers home-based physiotherapy services including: Orthopedic Physiotherapy, Neurological Physiotherapy, Sports Physiotherapy, Pediatric Physiotherapy, Geriatric Physiotherapy, and Cardiopulmonary Physiotherapy. All our therapists are certified and experienced.";
    }

    // Location
    if (lowerInput.includes('location') || lowerInput.includes('where') || lowerInput.includes('area') || lowerInput.includes('city')) {
      return "We currently serve multiple cities including Lucknow and surrounding areas. Our therapists provide home visits, so you don't need to travel. Enter your address during booking to check availability in your area.";
    }

    // AI Matcher
    if (lowerInput.includes('ai') || lowerInput.includes('matcher') || lowerInput.includes('recommend')) {
      return "Our AI Matcher analyzes your condition, pain level, and preferences to recommend the best physiotherapist specialty for you. Simply click 'Book Now' and answer a few quick questions to get your personalized recommendation.";
    }

    // Contact
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return "You can contact us through the Contact Us page, or use the contact form in the footer. For urgent matters, you can also message your assigned physiotherapist directly from your dashboard after booking.";
    }

    // Dashboard
    if (lowerInput.includes('dashboard') || lowerInput.includes('account') || lowerInput.includes('profile')) {
      return "Your dashboard shows all your upcoming appointments, health profile, and allows you to manage bookings. You can call, message, or reschedule appointments directly from there. Sign in to access your dashboard.";
    }

    // Payment
    if (lowerInput.includes('payment') || lowerInput.includes('pay') || lowerInput.includes('billing')) {
      return "We accept secure payments through Stripe. After booking an appointment, you'll be redirected to a secure payment page. We accept all major credit cards and digital payment methods.";
    }

    // General help
    if (lowerInput.includes('help') || lowerInput.includes('how') || lowerInput.includes('guide')) {
      return "I'm here to help! You can ask me about: booking appointments, our services, pricing, locations, the AI Matcher, or how to contact us. What would you like to know?";
    }

    // Default response
    return "Thank you for your question! For specific inquiries about booking, services, or your account, please visit the relevant page on our website. You can also contact us directly through the Contact Us page. Is there anything else I can help you with?";
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={false}
        animate={{ scale: isOpen ? 0 : 1, rotate: isOpen ? 180 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#38BDF8] text-[#05070A] shadow-[0_10px_30px_rgba(56,189,248,0.4)] flex items-center justify-center transition-all hover:shadow-[0_15px_40px_rgba(56,189,248,0.5)]"
        aria-label="Open chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[600px] rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.75)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#38BDF8]/20 to-[#38BDF8]/10 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#05070A]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">PhysioGo Assistant</h3>
                  <p className="text-xs text-[#94A3B8]">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-[#38BDF8] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[#05070A]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[#38BDF8] text-[#05070A]'
                        : 'bg-[#0D1117] text-white border border-white/10'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#38BDF8] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#05070A]" />
                  </div>
                  <div className="bg-[#0D1117] border border-white/10 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-white/10 p-4 bg-[#0D1117]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-2xl border border-white/10 bg-[#1A202C] px-4 py-2 text-white placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="rounded-full bg-[#38BDF8] text-[#05070A] p-2 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-[#38BDF8]/90"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


