'use client';

import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardLink({ children, className = '' }) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    
    if (!isLoaded) {
      // Still loading auth state
      return;
    }

    if (isSignedIn) {
      // User is logged in, go to their dashboard
      router.push('/dashboard');
    }
    // If not signed in, SignInButton will handle the click
  };

  if (!isLoaded) {
    return (
      <button className={className} disabled>
        {children}
      </button>
    );
  }

  if (isSignedIn) {
    return (
      <button
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
    );
  }

  // Not signed in - use SignInButton with redirect
  return (
    <SignInButton mode="modal" redirectUrl="/dashboard">
      <button
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
    </SignInButton>
  );
}

