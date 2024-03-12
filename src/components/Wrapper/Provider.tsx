'use client'
import useAuthStore from '@/hooks/useAuth';
import { Loader } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthStore();

  return (
    <div>
      {isLoading ? <div className='w-screen flex items-center justify-center h-screen'>
        <Loader className='animate-spin m-auto' />
      </div>
        :
        <>{children}</>
      }
    </div>
  )
};

export default Provider;