'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShaderAnimation } from '@/components/ui/shader-animation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayPathname, setDisplayPathname] = useState(pathname);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    // Start loading animation
    setIsLoading(true);

    // Small delay to show the animation
    const timer = setTimeout(() => {
      setDisplayPathname(pathname);
      setIsLoading(false);
    }, 800); // Animation duration

    return () => clearTimeout(timer);
  }, [pathname, isInitialMount]);

  const getLoadingText = () => {
    if (displayPathname === '/robot') return 'INITIALIZING ROBOT CONTROL...';
    if (displayPathname === '/inventory') return 'LOADING INVENTORY...';
    if (displayPathname === '/history') return 'ACCESSING TOURNAMENT DATA...';
    if (displayPathname === '/comms') return 'ESTABLISHING COMM LINK...';
    return 'LOADING TERMINAL...';
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key={`transition-${pathname}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            {/* Shader Animation Background */}
            <div className="absolute inset-0">
              <ShaderAnimation />
            </div>

            {/* DUST ROSE Text Overlay */}
            <motion.div
              className="relative z-10 text-center px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 1) 50%, rgba(236, 72, 153, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.5))',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                DUST ROSE
              </motion.h1>
              <motion.p
                className="text-white/60 font-mono text-xs sm:text-sm md:text-base tracking-wider"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {getLoadingText()}
              </motion.p>
            </motion.div>

            {/* Scanning lines effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                backgroundPosition: ['0% 0%', '0% 100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)',
                backgroundSize: '100% 20%',
              }}
            />

            {/* Grid overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={isLoading ? 'pointer-events-none' : ''}
      >
        {children}
      </motion.div>
    </>
  );
}
