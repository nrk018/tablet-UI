'use client';

import dynamic from 'next/dynamic';

// Wrapper to avoid importing React Three Fiber at module evaluation time
const NeuralCanvasImpl = dynamic(() => import('./NeuralCanvasImpl'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export default function NeuralNetworkBackground() {
  return <NeuralCanvasImpl />;
}
