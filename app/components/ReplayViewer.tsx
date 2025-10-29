'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ReplayViewer() {
  const { replays } = useStore();
  const [selectedReplay, setSelectedReplay] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Battle Replays</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {replays.map((replay) => (
          <motion.div
            key={replay.id}
            className={`
              glass-panel p-5 cursor-pointer glass-panel-hover
              ${selectedReplay === replay.id ? 'border-2 border-indigo-400/50' : ''}
            `}
            onClick={() => setSelectedReplay(selectedReplay === replay.id ? null : replay.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white mb-1">{replay.opponent}</h3>
                <p className="text-sm text-white/40 font-mono">{replay.date}</p>
              </div>
              <span className={`
                text-xs font-semibold px-3 py-1.5 rounded-full
                ${replay.result === 'win' 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/50' 
                  : replay.result === 'loss' 
                  ? 'bg-red-500/20 text-red-400 border border-red-400/50' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-400/50'}
              `}>
                {replay.result.toUpperCase()}
              </span>
            </div>
            
            <div className="text-sm text-white/60 mb-3">
              Duration: <span className="font-mono">{Math.floor(replay.duration / 60)}m {replay.duration % 60}s</span>
            </div>
            
            <AnimatePresence>
              {selectedReplay === replay.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="glass-panel p-4 bg-black/40">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/60 font-mono">📍 SURVEILLANCE FEED</span>
                        <span className="text-green-400 font-semibold animate-pulse">LIVE</span>
                      </div>
                      <div className="text-white/40 font-mono text-xs mt-3 space-y-1">
                        <div>[GRAINY VIDEO FEED]</div>
                        <div>Tactical overlays active...</div>
                        <button className="text-indigo-400 hover:text-indigo-300 mt-2 transition-colors">
                          ▶ PLAY REPLAY
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      {/* Upcoming Matches */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Matches</h3>
        <div className="space-y-3">
          {[
            { date: '2027-10-30', opponent: 'Steel Vultures', arena: 'Rust Pit' },
            { date: '2027-11-02', opponent: 'Iron Mongrels (Rematch)', arena: 'Scrap Yard' },
          ].map((match, idx) => (
            <motion.div
              key={idx}
              className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 glass-panel-hover px-3 rounded-lg"
              whileHover={{ x: 4 }}
            >
              <div>
                <p className="font-semibold text-white">{match.opponent}</p>
                <p className="text-sm text-white/40 font-mono">
                  {match.date} • {match.arena}
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-400 px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/50 rounded-full">
                PREPARE
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
