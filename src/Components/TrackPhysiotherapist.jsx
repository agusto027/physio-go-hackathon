'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Activity } from 'lucide-react';

export default function TrackPhysiotherapist({ appointment }) {
  const [trackingData, setTrackingData] = useState({
    status: appointment?.tracking?.status || 'assigned',
    currentLocation: appointment?.tracking?.currentLocation || null,
    estimatedArrival: appointment?.tracking?.estimatedArrival || null,
    distance: appointment?.tracking?.distance || null,
    lastUpdate: appointment?.tracking?.lastUpdate || new Date().toISOString(),
  });

  // Simulate real-time tracking updates
  useEffect(() => {
    if (!appointment || trackingData.status === 'arrived' || trackingData.status === 'in_session') {
      return;
    }

    // Generate mock location data (in production, this would come from GPS/API)
    const generateMockLocation = () => {
      // Mock coordinates (in production, use actual therapist location)
      const baseLat = 26.8467; // Lucknow coordinates
      const baseLng = 80.9462;
      const variation = 0.05; // ~5km variation
      
      return {
        lat: baseLat + (Math.random() - 0.5) * variation,
        lng: baseLng + (Math.random() - 0.5) * variation,
      };
    };

    // Calculate distance and ETA (mock calculation)
    const calculateDistanceAndETA = (therapistLocation, patientAddress) => {
      // In production, use geocoding API to convert address to coordinates
      // Then calculate distance using Haversine formula or Google Maps API
      const mockDistance = Math.random() * 10 + 2; // 2-12 km
      const mockETA = Math.round(mockDistance * 2.5); // ~2.5 min per km
      
      return {
        distance: mockDistance.toFixed(1),
        eta: mockETA,
      };
    };

    // Update tracking every 10 seconds
    const interval = setInterval(() => {
      const location = generateMockLocation();
      const { distance, eta } = calculateDistanceAndETA(location, appointment.address);
      
      // Progress through statuses
      let newStatus = trackingData.status;
      if (trackingData.status === 'assigned' && Math.random() > 0.7) {
        newStatus = 'en_route';
      } else if (trackingData.status === 'en_route' && parseFloat(distance) < 0.5) {
        newStatus = 'arrived';
      }

      setTrackingData({
        status: newStatus,
        currentLocation: location,
        estimatedArrival: eta,
        distance: distance,
        lastUpdate: new Date().toISOString(),
      });

      // Update appointment in localStorage
      const emailKey = `appointments_${appointment.email}`;
      const appointments = JSON.parse(localStorage.getItem(emailKey) || '[]');
      const appointmentIndex = appointments.findIndex(apt => apt.id === appointment.id);
      if (appointmentIndex !== -1) {
        appointments[appointmentIndex].tracking = {
          status: newStatus,
          currentLocation: location,
          estimatedArrival: eta,
          distance: distance,
          lastUpdate: new Date().toISOString(),
        };
        localStorage.setItem(emailKey, JSON.stringify(appointments));
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [appointment, trackingData.status]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'text-[#94A3B8] bg-[#94A3B8]/10 border-[#94A3B8]/20';
      case 'en_route':
        return 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20';
      case 'arrived':
        return 'text-[#FAD048] bg-[#FAD048]/10 border-[#FAD048]/20';
      case 'in_session':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20';
      default:
        return 'text-[#94A3B8] bg-[#94A3B8]/10 border-[#94A3B8]/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned':
        return 'Assigned';
      case 'en_route':
        return 'On the Way';
      case 'arrived':
        return 'Arrived';
      case 'in_session':
        return 'In Session';
      default:
        return 'Unknown';
    }
  };

  // Simple map component (in production, use Google Maps or Mapbox)
  const MapView = () => {
    if (!trackingData.currentLocation) {
      return (
        <div className="w-full h-48 rounded-xl bg-[#0D1117] border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
            <p className="text-sm text-[#94A3B8]">Waiting for location...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-48 rounded-xl bg-[#0D1117] border border-white/10 relative overflow-hidden">
        {/* Mock map visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#1A202C] to-[#0D1117]">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          {/* Patient location marker */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-[#38BDF8] border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-[#38BDF8] opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          
          {/* Therapist location marker */}
          <div className="absolute top-1/4 right-1/4">
            <div className="relative">
              <Navigation className="w-6 h-6 text-[#FAD048] drop-shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-[#FAD048] opacity-20 animate-ping" style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
          
          {/* Route line (mock) */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <line
              x1="50%"
              y1="75%"
              x2="75%"
              y2="25%"
              stroke="rgba(56,189,248,0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
        
        {/* Map controls overlay */}
        <div className="absolute top-2 right-2 z-10">
          <div className="px-2 py-1 rounded-lg bg-[#1A202C]/90 backdrop-blur text-xs text-[#94A3B8] border border-white/10">
            Live
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 rounded-2xl border border-white/10 bg-[#0D1117] p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#38BDF8]" />
          <h4 className="text-sm font-semibold text-white">Track Your Physiotherapist</h4>
        </div>
        <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(trackingData.status)}`}>
          {getStatusText(trackingData.status)}
        </span>
      </div>

      {/* Map View */}
      <MapView />

      {/* Tracking Details */}
      <div className="grid grid-cols-2 gap-3">
        {trackingData.distance && (
          <div className="rounded-xl border border-white/10 bg-[#1A202C] p-3">
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="w-4 h-4 text-[#38BDF8]" />
              <p className="text-xs text-[#94A3B8] uppercase tracking-[0.35em]">Distance</p>
            </div>
            <p className="text-lg font-bold text-white">{trackingData.distance} km</p>
          </div>
        )}

        {trackingData.estimatedArrival && (
          <div className="rounded-xl border border-white/10 bg-[#1A202C] p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#38BDF8]" />
              <p className="text-xs text-[#94A3B8] uppercase tracking-[0.35em]">ETA</p>
            </div>
            <p className="text-lg font-bold text-white">{trackingData.estimatedArrival} min</p>
          </div>
        )}
      </div>

      {/* Last Update */}
      <p className="text-xs text-[#94A3B8] text-center">
        Last updated: {new Date(trackingData.lastUpdate).toLocaleTimeString()}
      </p>
    </motion.div>
  );
}


