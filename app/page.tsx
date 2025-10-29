'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/robot');
  }, [router]);

  return (
    <div className="min-h-screen bg-dust-rose-bg flex items-center justify-center">
      <div className="text-dust-rose-neon-green font-stencil animate-pulse-neon">
        Loading Dust-Rose 2077...
      </div>
    </div>
  );
}

