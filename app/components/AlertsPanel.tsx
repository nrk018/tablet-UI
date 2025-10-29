'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AlertsPanel() {
  const { alerts, acknowledgeAlert, addAlert } = useStore();
  const [showRadio, setShowRadio] = useState(false);

  useEffect(() => {
    // Simulate incoming alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const types: Array<'crew' | 'authority' | 'system' | 'warning'> = ['crew', 'authority', 'system', 'warning'];
        const messages = [
          'Crew member requesting backup at Sector 7.',
          'Authority broadcast detected. Acknowledge to continue.',
          'System: Left arm critical — tape won\'t fix this.',
          'Warning: Power levels dropping below 20%.',
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        addAlert({
          type,
          message: messages[Math.floor(Math.random() * messages.length)],
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [addAlert]);

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);
  const authorityAlerts = unacknowledgedAlerts.filter((a) => a.type === 'authority');

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'authority':
        return 'border-cyan-400/50 bg-cyan-500/10';
      case 'warning':
        return 'border-red-400/50 bg-red-500/10';
      case 'crew':
        return 'border-green-400/50 bg-green-500/10';
      default:
        return 'border-amber-400/50 bg-amber-500/10';
    }
  };

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case 'authority':
        return 'text-cyan-400';
      case 'warning':
        return 'text-red-400';
      case 'crew':
        return 'text-green-400';
      default:
        return 'text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Authority Broadcast - Blocks UI */}
      <AnimatePresence>
        {authorityAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                authorityAlerts.forEach((a) => acknowledgeAlert(a.id));
              }
            }}
          >
            <motion.div
              className="glass-panel p-8 max-w-md w-full border-2 border-cyan-400/50 bg-cyan-500/10"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(34, 211, 238, 0.3)',
                  '0 0 50px rgba(34, 211, 238, 0.5), 0 0 70px rgba(34, 211, 238, 0.3)',
                  '0 0 30px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center space-y-6">
                <div className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AUTHORITY BROADCAST
                </div>
                <div className="text-white/80 text-sm leading-relaxed">
                  {authorityAlerts[0].message}
                </div>
                <motion.button
                  onClick={() => authorityAlerts.forEach((a) => acknowledgeAlert(a.id))}
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ACKNOWLEDGE
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regular Alerts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Alerts & Comms</h2>
          <button
            onClick={() => setShowRadio(!showRadio)}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {showRadio ? 'Hide' : 'Show'} Radio
          </button>
        </div>

        {/* Crew Radio Panel */}
        <AnimatePresence>
          {showRadio && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-5 border-l-4 border-green-400/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">CREW RADIO</span>
                <span className="text-xs text-white/40 font-mono">● STATIC</span>
              </div>
              <div className="space-y-2 font-mono text-sm text-white/60">
                <div>▶ "Scavenger Alpha reporting in. Sector clear."</div>
                <div>▶ "Weapons check complete. Ready for deployment."</div>
                <div className="text-white/40">▶ [STATIC] ...breaking up...</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alert List */}
        <div className="space-y-3">
          <AnimatePresence>
            {unacknowledgedAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`glass-panel p-4 flex justify-between items-start gap-4 border-l-4 ${getAlertColor(alert.type)}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold ${getAlertTextColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-white/80">
                    {alert.message}
                  </p>
                </div>
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {unacknowledgedAlerts.length === 0 && (
            <div className="glass-panel p-6 text-center text-white/60">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-sm">No active alerts. System operational.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant */}
      <div className="glass-panel p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-sm font-semibold text-white/60">AI ASSISTANT</span>
        </div>
        <div className="space-y-2 font-mono text-sm text-white/60">
          <div>▶ Error 404: Morale not found</div>
          <div>▶ All systems nominal. Mostly.</div>
          <div>▶ Boost Mode Engaged — hope you don't explode.</div>
        </div>
      </div>
    </div>
  );
}
