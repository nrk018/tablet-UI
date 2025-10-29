'use client';

import Layout from '../components/Layout';
import RobotViewer from '../components/RobotViewer';
import StatusBars from '../components/StatusBars';
import BoostModeButton from '../components/BoostModeButton';
import GlitchLayer from '../components/GlitchLayer';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function RobotPage() {
  const { robotStats, components } = useStore();
  const isDamaged = robotStats.battery < 30 || robotStats.armor < 40;
  const damagedComponents = components.filter((c) => c.damaged);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">ROBOT CONTROL CENTER</h1>
            <p className="text-white/60 text-sm">JAIPUR SECTOR • DUST-ROSE 2077</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-panel px-4 py-2">
              <div className="text-xs text-white/40 mb-1">UNIT ID</div>
              <div className="font-mono text-sm font-semibold text-white">DR-K3LSO</div>
            </div>
            <div className={`glass-panel px-4 py-2 ${isDamaged ? 'status-critical' : 'status-operational'}`}>
              <div className="text-xs text-white/40 mb-1">STATUS</div>
              <div className="text-sm font-semibold">{isDamaged ? 'DAMAGED' : 'OPERATIONAL'}</div>
            </div>
          </div>
        </motion.div>

        <GlitchLayer enabled={isDamaged} intensity={0.5} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Robot Viewer - Takes 2 columns */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-panel p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">3D MODEL VIEWER</h2>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>
              <RobotViewer />
            </div>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-panel p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">UNIT STATUS</h2>
                <StatusBars />
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold text-white/60 mb-3">COMPONENT HEALTH</h3>
                <div className="space-y-2">
                  {components.map((comp) => (
                    <div key={comp.id} className="flex items-center justify-between text-sm">
                      <span className="text-white/80">{comp.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20">
                          <div 
                            className="progress-fill"
                            style={{ width: `${comp.durability}%` }}
                          />
                        </div>
                        <span className={`font-mono text-xs ${comp.critical ? 'text-red-400' : comp.damaged ? 'text-amber-400' : 'text-green-400'}`}>
                          {comp.durability}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <BoostModeButton />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Damage Alerts */}
        {damagedComponents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-6 border-l-4 border-red-400 bg-red-400/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-400/50 flex items-center justify-center">
                <span className="text-red-400 text-lg font-bold">!</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-400 mb-2">DAMAGE DETECTED</h3>
                <div className="space-y-1">
                  {damagedComponents.map((comp) => (
                    <div key={comp.id} className="text-sm text-white/80">
                      • {comp.name}: {comp.critical ? 'CRITICAL' : 'DAMAGED'} — {comp.durability}% durability
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
