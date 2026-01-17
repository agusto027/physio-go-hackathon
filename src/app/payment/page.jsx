'use client';

import { useState, useEffect, Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';
import CheckoutForm from '@/Components/CheckoutForm';

// Load stripe outside of components to avoid recreating stripe object on renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('initial');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const appointmentDetails = {
      id: searchParams.get('appointmentId'),
      physiotherapistId: searchParams.get('physiotherapistId'),
      date: searchParams.get('date'),
      time: searchParams.get('time'),
      amount: searchParams.get('amount'),
    };

    // Create payment intent on component mount
    const createPaymentIntent = async () => {
      try {
        // Log URL parameters
        console.log('URL Parameters:', {
          appointmentId: searchParams.get('appointmentId'),
          amount: searchParams.get('amount'),
          date: searchParams.get('date'),
          time: searchParams.get('time'),
        });

        console.log('Stripe public key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        
        // Validate amount before proceeding
        const amount = Number(appointmentDetails.amount);
        if (isNaN(amount) || amount <= 0) {
          console.error('Invalid amount:', appointmentDetails.amount);
          setPaymentStatus('error');
          return;
        }

        console.log('Creating payment intent with details:', {
          amount,
          appointmentDetails,
        });
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            appointmentDetails,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Payment intent request failed:', {
            status: response.status,
            statusText: response.statusText,
            responseText: text
          });
          setPaymentStatus('error');
          return;
        }

        const data = await response.json();
        console.log('Payment intent response:', data);

        if (data.error) {
          console.error('Payment intent creation failed:', {
            error: data.error,
            code: data.code,
            type: data.type
          });
          setPaymentStatus('error');
          return;
        }

        if (data.clientSecret) {
          console.log('Successfully created payment intent');
          setClientSecret(data.clientSecret);
          setPaymentStatus('ready');
        } else {
          console.error('No client secret in response:', data);
          setPaymentStatus('error');
        }
      } catch (error) {
        console.error('Error creating payment intent:', {
          error: error.message,
          stack: error.stack
        });
        setPaymentStatus('error');
      }
    };

    if (appointmentDetails.amount) {
      createPaymentIntent();
    } else {
      console.error('No amount provided in URL parameters');
      setPaymentStatus('error');
    }
  }, [searchParams]);

  const handlePayment = async (event) => {
    event.preventDefault();
    setPaymentStatus('processing');

    const { stripe, elements } = await stripePromise;

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation`,
      },
    });

    if (error) {
      setPaymentStatus('error');
      console.error('[Error]', error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentStatus('succeeded');
      router.push('/booking-confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] py-12">
      <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Complete Your Payment</h2>
        
        {paymentStatus === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-4">
            Payment failed. Please try again.
          </div>
        )}

        {clientSecret && (
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: {
                theme: 'night',
                variables: {
                  colorPrimary: '#38BDF8',
                  colorBackground: '#0D1117',
                  colorText: '#FFFFFF',
                  colorDanger: '#ef4444',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  borderRadius: '16px',
                },
              },
              loader: 'auto',
            }}
          >
            <CheckoutForm amount={searchParams.get('amount')} />
          </Elements>
        )}

        {!clientSecret && (
          <div className="text-center text-[#94A3B8]">
            Loading payment form...
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap PaymentForm with Suspense
export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0D1117] py-12">
          <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-[#1A202C] shadow-[0_25px_60px_rgba(3,7,18,0.55)] p-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38BDF8]"></div>
              <p className="mt-4 text-[#94A3B8]">Loading payment form...</p>
            </div>
          </div>
        </div>
      }
    >
      <PaymentForm />
    </Suspense>
  );
}