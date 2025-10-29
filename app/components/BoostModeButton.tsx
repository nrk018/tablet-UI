'use client';

import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BoostModeButton() {
  const { robotStats, setRobotStats } = useStore();
  const { battery } = robotStats;
  const [activated, setActivated] = useState(false);
  const isLowPower = battery <= 20;

  const handleBoost = () => {
    if (battery > 10 && !activated) {
      setActivated(true);
      setRobotStats({ battery: battery - 15 });
      
      setTimeout(() => {
        setActivated(false);
      }, 5000);
    }
  };

  return (
    <motion.button
      onClick={handleBoost}
      disabled={battery <= 10 || activated}
      className={`
        w-full py-4 px-6 font-semibold text-base font-mono uppercase tracking-wider
        transition-all duration-300 relative overflow-hidden
        ${isLowPower && !activated
          ? 'btn-primary'
          : activated
          ? 'metal-panel neon-red border-red-600/60 border-2'
          : 'metal-panel text-orange-700/80 hover:text-orange-600 border-orange-900/40 border-2'}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      whileHover={!activated && battery > 10 ? { scale: 1.02, y: -2 } : {}}
      whileTap={!activated && battery > 10 ? { scale: 0.98 } : {}}
    >
      {activated ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-lg">BOOST MODE ENGAGED</span>
          <span className="text-sm opacity-80">Hope you don't explode.</span>
        </motion.div>
      ) : battery <= 10 ? (
        'BOOST MODE UNAVAILABLE'
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span>BOOST MODE</span>
        </div>
      )}
      
      {isLowPower && !activated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      )}
    </motion.button>
  );
}
