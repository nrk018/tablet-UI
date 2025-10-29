'use client';

import { useEffect, useState } from 'react';

export default function NeuralCanvasImpl() {
  const [mounted, setMounted] = useState(false);
  const [CanvasComponent, setCanvasComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Wait for React to fully initialize
    const timer = setTimeout(() => {
      setMounted(true);
      
      // Dynamically import React Three Fiber AFTER React is ready
      if (typeof window !== 'undefined') {
        import('./NeuralCanvasContent').then((mod) => {
          setCanvasComponent(() => mod.default);
        }).catch((err) => {
          console.error('Failed to load neural network canvas:', err);
        });
      }
    }, 300); // Increased delay to ensure React is fully initialized

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !CanvasComponent) {
    return <div className="bg-black absolute inset-0 -z-10 w-full h-full" aria-hidden />;
  }

  return <CanvasComponent />;
}
