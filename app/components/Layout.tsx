'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '../store/useStore';
import PageTransition from './PageTransition';
import { useEffect, useState } from 'react';
import { ExpandableTabs } from '@/components/ui/expandable-tabs';
import { Home, History, Package, Radio, Bot } from 'lucide-react';

// Background effects removed for Vercel-style pure black UI

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
  const tabs = [
    { title: 'Home', icon: Home },
    { type: 'separator' as const },
    { title: 'Robot', icon: Bot },
    { title: 'Inventory', icon: Package },
    { title: 'History', icon: History },
    { title: 'Comms', icon: Radio },
  ];

  const navItems = [
    { path: '/robot', label: 'Robot Control' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/history', label: 'Tournament' },
    { path: '/comms', label: 'Comms' },
    { path: '/brief', label: 'UX Brief' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">

      {/* Header */}
      <header className="relative z-10 bg-black/80 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-sm font-medium tracking-wide text-white/70"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Nexus
            </motion.h1>
            <div className="liquid-glass rounded-2xl p-[2px]">
              <div className="rounded-2xl bg-black/70">
                <ExpandableTabs
                  tabs={tabs}
                  className="glass-nav"
                  activeColor="text-white"
                  onChange={(i) => {
                    if (i === null) return;
                    const map = ['/', 'robot', 'inventory', 'history', 'comms'];
                    const href = i === 0 ? '/' : `/${map[i]}`;
                    window.location.href = href;
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <span className="text-white/40">TIME:</span>
                <LiveClock />
              </div>
              <div className="w-8 h-8 rounded-full liquid-glass" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation replaced by ExpandableTabs in header */}

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-140px)] bg-black">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6 text-center text-xs text-white/40 border-t border-white/10">
        <div className="container mx-auto px-6">
          <p>System status: Operational</p>
        </div>
      </footer>
    </div>
  );
}
