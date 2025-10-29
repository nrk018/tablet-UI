'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '../store/useStore';
import PageTransition from './PageTransition';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import NeuralNetworkBackground with no SSR
const NeuralNetworkBackground = dynamic(() => import('./NeuralNetworkBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

function LiveClock() {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span suppressHydrationWarning className="font-mono">{time}</span>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notoriety } = useStore();

  const navItems = [
    { path: '/robot', label: 'Robot Control' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/history', label: 'Tournament' },
    { path: '/comms', label: 'Comms' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Header */}
      <header className="relative z-10 border-b-2 border-orange-900/60 metal-panel">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.h1 
                className="text-2xl font-semibold neon-green font-mono tracking-wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                DUST-ROSE | TERMINAL V2.0
              </motion.h1>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <span className="text-white/40">TIME:</span>
                <LiveClock />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40">DUST LVL:</span>
                <span className={`font-semibold ${notoriety > 70 ? 'text-red-400' : 'text-amber-400'}`}>
                  {notoriety > 70 ? 'CRITICAL' : 'MODERATE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 border-b-2 border-orange-900/60 metal-panel">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    relative px-6 py-3 text-sm font-medium font-mono uppercase tracking-wider transition-all duration-300
                    ${isActive 
                      ? 'neon-green' 
                      : 'text-orange-700/80 hover:text-orange-600'}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 neon-green"
                      style={{
                        boxShadow: '0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.5)',
                        background: 'rgba(34, 197, 94, 0.8)'
                      }}
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-140px)]">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6 text-center text-xs text-white/40">
        <div className="container mx-auto px-6">
          <p className="font-mono">SYSTEM STATUS: OPERATIONAL</p>
          <p className="mt-1 text-white/30">Error 404: Morale not found</p>
        </div>
      </footer>
    </div>
  );
}
