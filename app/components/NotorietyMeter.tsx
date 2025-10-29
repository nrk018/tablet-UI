'use client';

import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function NotorietyMeter() {
  const { notoriety } = useStore();
  const authorityLevel = notoriety > 70 ? 'HIGH' : notoriety > 40 ? 'MODERATE' : 'LOW';

  const getStatusColor = () => {
    if (notoriety > 70) return 'from-red-500 to-red-600';
    if (notoriety > 40) return 'from-amber-500 to-amber-600';
    return 'from-green-500 to-emerald-500';
  };

  const getStatusText = () => {
    if (notoriety > 70) return 'Expect increased patrols.';
    if (notoriety > 40) return 'Moderate attention.';
    return 'Flying under the radar.';
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Authority Surveillance</h3>
        <span className={`
          text-xs font-semibold px-3 py-1.5 rounded-full
          ${notoriety > 70 
            ? 'bg-red-500/20 text-red-400 border border-red-400/50 animate-pulse' 
            : notoriety > 40 
            ? 'bg-amber-500/20 text-amber-400 border border-amber-400/50' 
            : 'bg-green-500/20 text-green-400 border border-green-400/50'}
        `}>
          {authorityLevel}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Notoriety Level</span>
          <span className="font-mono font-semibold text-white">{notoriety}%</span>
        </div>
        <div className="progress-bar h-3 relative">
          <motion.div
            className={`progress-fill bg-gradient-to-r ${getStatusColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${notoriety}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: notoriety > 70
                ? '0 0 20px rgba(239, 68, 68, 0.5)'
                : notoriety > 40
                ? '0 0 20px rgba(245, 158, 11, 0.3)'
                : '0 0 20px rgba(16, 185, 129, 0.3)',
            }}
          />
          {notoriety > 70 && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(239, 68, 68, 0.2) 5px, rgba(239, 68, 68, 0.2) 10px)',
              }}
            />
          )}
        </div>
      </div>
      
      <p className="text-sm text-white/60">
        {getStatusText()}
      </p>
    </div>
  );
}
