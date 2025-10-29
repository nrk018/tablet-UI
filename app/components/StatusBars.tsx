'use client';

import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface StatusBarProps {
  label: string;
  value: number;
  max?: number;
  color: string;
  criticalThreshold?: number;
  unit?: string;
}

function StatusBar({ label, value, max = 100, color, criticalThreshold = 20, unit = '%' }: StatusBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  const isCritical = percentage <= criticalThreshold;
  const isLow = percentage <= 40;

  const barColor = isCritical
    ? 'from-red-500 to-red-600'
    : isLow
    ? 'from-amber-500 to-amber-600'
    : color === 'green'
    ? 'from-green-500 to-emerald-500'
    : color === 'blue'
    ? 'from-blue-500 to-cyan-500'
    : 'from-purple-500 to-pink-500';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium font-mono uppercase tracking-wider text-orange-700/70">
          {label}
        </span>
        <span className={`
          text-sm font-mono font-semibold
          ${isCritical ? 'neon-red' : isLow ? 'neon-amber' : 'neon-green'}
        `}>
          {value.toFixed(0)}{unit}
        </span>
      </div>
      
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            boxShadow: isCritical
              ? '0 0 15px rgba(239, 68, 68, 0.8), inset 0 0 10px rgba(239, 68, 68, 0.4)'
              : isLow
              ? '0 0 15px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.3)'
              : '0 0 15px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(34, 197, 94, 0.3)',
            background: isCritical
              ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.9) 0%, rgba(239, 68, 68, 1) 50%, rgba(239, 68, 68, 0.9) 100%)'
              : isLow
              ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.9) 0%, rgba(245, 158, 11, 1) 50%, rgba(245, 158, 11, 0.9) 100%)'
              : 'linear-gradient(90deg, rgba(34, 197, 94, 0.9) 0%, rgba(34, 197, 94, 1) 50%, rgba(34, 197, 94, 0.9) 100%)',
          }}
        />
      </div>
      
      {isCritical && (
        <p className="text-xs neon-red font-medium font-mono uppercase tracking-wider">
          CRITICAL LEVEL
        </p>
      )}
    </div>
  );
}

export default function StatusBars() {
  const { robotStats } = useStore();
  const { battery, armor, weaponHeat, stability } = robotStats;

  return (
    <div className="space-y-4">
      <StatusBar
        label="BATTERY"
        value={battery}
        color="green"
        criticalThreshold={15}
      />
      <StatusBar
        label="ARMOR"
        value={armor}
        color="blue"
        criticalThreshold={25}
      />
      <StatusBar
        label="WEAPON HEAT"
        value={weaponHeat}
        max={100}
        color="red"
        criticalThreshold={80}
      />
      <StatusBar
        label="STABILITY"
        value={stability}
        color="purple"
        criticalThreshold={30}
      />
    </div>
  );
}
