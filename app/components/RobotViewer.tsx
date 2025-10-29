'use client';

import dynamic from 'next/dynamic';

const BladeRunnerRobotViewer = dynamic(() => import('./BladeRunnerRobotViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] relative overflow-hidden bg-gradient-to-br from-[#0a0518] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-[#00d4aa] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#8bd3e6] font-mono text-sm">Initializing interface...</p>
        <p className="text-[#8bd3e6]/60 font-mono text-xs mt-2">Memory chrono-shifts detected</p>
      </div>
    </div>
  ),
});

export default BladeRunnerRobotViewer;
