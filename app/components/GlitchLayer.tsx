'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchLayerProps {
  enabled?: boolean;
  intensity?: number;
}

export default function GlitchLayer({ enabled = false, intensity = 1 }: GlitchLayerProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 300);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled || !glitch) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3 * intensity, 0],
        filter: [
          'hue-rotate(0deg)',
          'hue-rotate(90deg) brightness(1.2)',
          'hue-rotate(0deg)',
        ],
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 68, 0.1) 2px,
            rgba(255, 0, 68, 0.1) 4px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 136, 0.1) 2px,
            rgba(0, 255, 136, 0.1) 4px
          )
        `,
      }}
    />
  );
}

export function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {glitch ? (
        <motion.span
          animate={{
            x: [0, -2, 2, 0],
            filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      ) : (
        children
      )}
    </span>
  );
}

export function SparkAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-dust-rose-neon-green rounded-full"
          initial={{
            x: '50%',
            y: '50%',
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: Math.random() * 0.5 + 0.3,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

