'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Part } from '../store/useStore';

function PartCard({ part }: { part: Part }) {
  const { illegal, compatible, durability, weight, name, type } = part;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`
        glass-panel p-5 space-y-3 cursor-pointer glass-panel-hover
        ${illegal ? 'border-red-400/50 bg-red-500/10' : compatible ? '' : 'border-amber-400/50 bg-amber-500/10'}
      `}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-white text-sm">
          {name}
        </h3>
        <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
          {type.toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-white/60">Durability</span>
          <div className="flex items-center gap-2">
            <div className="progress-bar w-20">
              <div 
                className={`progress-fill ${durability < 50 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                style={{ width: `${durability}%` }}
              />
            </div>
            <span className={`font-mono text-xs font-semibold ${durability < 50 ? 'text-amber-400' : 'text-green-400'}`}>
              {durability}%
            </span>
          </div>
        </div>
        <div className="flex justify-between text-white/60">
          <span>Weight:</span>
          <span className="font-mono">{weight} kg</span>
        </div>
      </div>
      
      {(!compatible || illegal) && (
        <div className="pt-2 space-y-1">
                  {!compatible && (
                    <div className="flex items-center gap-2 text-xs text-amber-400">
                      <span className="font-bold">!</span>
                      <span>Compatibility Warning</span>
                    </div>
                  )}
                  {illegal && (
                    <motion.div
                      className="flex items-center gap-2 text-xs text-red-400"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="font-bold">!</span>
                      <div>
                        <div className="font-semibold">ILLEGAL MOD DETECTED</div>
                        <div className="text-white/40 text-[10px] mt-0.5">...I saw nothing.</div>
                      </div>
                    </motion.div>
                  )}
        </div>
      )}
    </motion.div>
  );
}

export default function InventoryTabs() {
  const { parts } = useStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'upgrades' | 'blackmarket'>('inventory');

  const inventoryParts = parts.filter((p) => !p.illegal);
  const upgradeParts = parts;
  const blackmarketParts = parts.filter((p) => p.illegal);

  const tabs = [
    { id: 'inventory' as const, label: 'Inventory', count: inventoryParts.length },
    { id: 'upgrades' as const, label: 'Upgrades', count: upgradeParts.length },
    { id: 'blackmarket' as const, label: 'Black Market', count: blackmarketParts.length },
  ];

  const getPartsForTab = () => {
    switch (activeTab) {
      case 'inventory':
        return inventoryParts;
      case 'upgrades':
        return upgradeParts;
      case 'blackmarket':
        return blackmarketParts;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-6 py-3 text-sm font-medium transition-all duration-300
              ${activeTab === tab.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'}
            `}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                layoutId="inventory-tab-indicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {getPartsForTab().map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </motion.div>
      </AnimatePresence>

      {activeTab === 'blackmarket' && (
        <motion.div
          className="glass-panel p-6 border border-red-400/50 bg-red-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-400/50 flex items-center justify-center">
              <span className="text-red-400 text-lg font-bold">!</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-400 mb-2">Illegal Modifications</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Accessing illegal modifications... Data corruption detected.
                <br />
                <span className="text-white/40">Proceed at your own risk. The Authority does not approve.</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
