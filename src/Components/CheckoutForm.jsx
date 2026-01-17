'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
    setIsReady(true);
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Starting payment confirmation...');
      
      // Confirm the payment without redirect
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmation`,
        },
        redirect: 'always'  // Changed to always redirect
      });

      // This point will only be reached if there's an immediate error
      // Otherwise, the customer will be redirected to the return_url
      if (result.error) {
        console.error('Payment confirmation error:', result.error);
        setErrorMessage(result.error.message || 'An error occurred during payment processing');
      }
    } catch (err) {
      console.error('Payment submission error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isReady) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38BDF8] mx-auto"></div>
        <p className="mt-2 text-[#94A3B8]">Loading payment form...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Payment Details</h3>
        <p className="text-[#94A3B8] mb-4">Amount to pay: ${amount}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0D1117] p-4">
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card'],
          }}
        />
      </div>

      <AddressElement 
        options={{
          mode: 'billing',
          allowedCountries: ['US'],
        }}
      />
      
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm">
          <p className="font-semibold">Payment Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full rounded-full bg-[#38BDF8] text-[#05070A] py-3 px-4 font-semibold shadow-[0_18px_35px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5 disabled:bg-[#1A202C] disabled:text-[#94A3B8] disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isProcessing ? 'Processing Payment...' : `Pay $${amount}`}
      </button>

      <p className="text-sm text-[#94A3B8] text-center mt-4">
        Your payment is secure. We use Stripe for secure payment processing.
      </p>
    </form>
  );
};

export default CheckoutForm;