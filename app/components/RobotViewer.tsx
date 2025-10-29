'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import SplineArmViewer from './SplineArmViewer';
import ArmSidebar from './ArmSidebar';
import { ShaderAnimation } from '@/components/ui/shader-animation';

export default function RobotViewer() {
  const { components } = useStore();
  const damagedComponents = components.filter((c) => c.damaged);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-full h-[500px] relative overflow-hidden rounded-lg bg-gradient-to-br from-black via-gray-900 to-black">
        {mounted ? (
          <div className="w-full h-full">
            <SplineArmViewer />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <ShaderAnimation />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <p className="text-white/80 font-mono text-sm mb-2">Initializing 3D viewer</p>
                <p className="text-white/40 font-mono text-xs">Preparing system...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Damage Overlay Labels */}
        {damagedComponents.length > 0 && (
          <div className="absolute top-4 left-4 space-y-2 z-10">
            {damagedComponents.map((comp) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-sm
                  ${comp.critical 
                    ? 'bg-red-500/20 border border-red-400/50 text-red-300' 
                    : 'bg-amber-500/20 border border-amber-400/50 text-amber-300'}
                `}
              >
                {comp.name}: {comp.critical ? 'CRITICAL' : 'DAMAGED'}
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Controls hint */}
        <div className="absolute bottom-4 right-4 text-xs text-white/40 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
          <p className="font-mono">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>

      {/* Arm Sidebar */}
      <ArmSidebar />
    </>
  );
}
