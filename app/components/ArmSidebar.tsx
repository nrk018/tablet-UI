'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function ArmSidebar() {
  const { selectedArm, armInfo, setSelectedArm, setArmState } = useStore();

  const handleRepair = () => {
    setArmState('repaired');
    setSelectedArm(false);
  };

  const handleStateChange = (state: 'normal' | 'damaged' | 'repaired') => {
    setArmState(state);
  };

  return (
    <AnimatePresence>
      {selectedArm && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArm(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Robot Arm</h2>
                <button
                  onClick={() => setSelectedArm(false)}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Component Status */}
              <div className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Component Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">Health</span>
                      <span className={`font-mono font-semibold ${armInfo.health < 30 ? 'text-red-400' : armInfo.health < 60 ? 'text-amber-400' : 'text-green-400'}`}>
                        {armInfo.health}%
                      </span>
                    </div>
                    <div className="progress-bar h-3">
                      <div
                        className={`progress-fill ${armInfo.health < 30 ? 'bg-gradient-to-r from-red-500 to-red-600' : armInfo.health < 60 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                        style={{ width: `${armInfo.health}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-white/60 text-sm">Status</span>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleStateChange('normal')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          armInfo.state === 'normal'
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => handleStateChange('damaged')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          armInfo.state === 'damaged'
                            ? 'bg-red-500/20 text-red-400 border border-red-400/50'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Damaged
                      </button>
                      <button
                        onClick={() => handleStateChange('repaired')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          armInfo.state === 'repaired'
                            ? 'bg-green-500/20 text-green-400 border border-green-400/50'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Repaired
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repair Information */}
              <div className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Repair Options</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Repair Time</span>
                    <span className="font-mono text-white">{armInfo.repairTime} seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Material Cost</span>
                    <span className="font-mono text-white">{armInfo.materialCost} credits</span>
                  </div>
                  <button
                    onClick={handleRepair}
                    className="w-full btn-primary mt-4"
                  >
                    Initiate Repair
                  </button>
                </div>
              </div>

              {/* Upgrades */}
              <div className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Available Upgrades</h3>
                <div className="space-y-2">
                  {armInfo.upgrades.map((upgrade, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/80">{upgrade}</span>
                      <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        Install
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

