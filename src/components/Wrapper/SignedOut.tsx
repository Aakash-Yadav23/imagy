import useAuthStore from '@/hooks/useAuth';
import React from 'react';

interface SignedInProps {
  children: React.ReactNode;
}

const SignedOut = ({ children }: SignedInProps) => {
  const { user } = useAuthStore();

  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default SignedOut;