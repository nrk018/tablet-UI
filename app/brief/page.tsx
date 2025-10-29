'use client';

import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function BriefPage() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8"
        >
          <h1 className="text-3xl font-semibold neon-green font-mono uppercase tracking-wider mb-2">
            UI/UX Brief — Dust‑Rose 2077
          </h1>
          <p className="text-orange-700/80 font-mono text-sm mb-6">
            Client-facing summary of the interface goals, structure, and benefits.
          </p>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">High-level Concept</h2>
            <p className="text-sm leading-6 text-white/80">
              Dust‑Rose 2077 is a rugged, near‑future robot control terminal. The interface blends industrial panels with neon accents to deliver fast situational awareness, confident control, and a memorable brand presence.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">Information Architecture</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li><span className="font-mono uppercase tracking-wider text-white/90">Header</span>: system identity, live clock, global Dust Level status.</li>
              <li><span className="font-mono uppercase tracking-wider text-white/90">Navigation</span>: Robot Control, Inventory, Tournament, Comms, and Brief.</li>
              <li><span className="font-mono uppercase tracking-wider text-white/90">Main Panel</span>: context-specific content; on Robot Control, a 3D viewer sits alongside status and actions.</li>
              <li><span className="font-mono uppercase tracking-wider text-white/90">Footer</span>: non-intrusive system status with light flavor.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">Visual Language</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li><b className="text-white/90">Palette</b>: deep purples/blues base; neon green/red/amber for status; saffron highlights.</li>
              <li><b className="text-white/90">Panels</b>: metal/glass treatments with subtle holographic overlays and scanlines for a terminal feel.</li>
              <li><b className="text-white/90">Motion</b>: restrained, purposeful animations to signal change without distraction.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">Key Interactions</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li><b className="text-white/90">3D Robot Viewer</b>: live indicator, progressive loading, responsive camera.</li>
              <li><b className="text-white/90">Status Bars</b>: battery, armor, heat, stability with clear thresholds (green/amber/red).</li>
              <li><b className="text-white/90">Damage Alerts</b>: scannable lines, elevating critical components first.</li>
              <li><b className="text-white/90">Primary Actions</b>: Boost Mode and context-specific controls with strong affordance.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">UX Principles</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>At‑a‑glance status using color and typographic hierarchy.</li>
              <li>Progressive disclosure keeps the interface clean while retaining depth.</li>
              <li>Consistent components reduce cognitive load and speed up training.</li>
              <li>Strong feedback and safety for risky actions (e.g., high heat warnings).</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">Accessibility & Performance</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>High contrast, readable type, minimal continuous motion on critical data.</li>
              <li>Canvas and background shader are throttled and pause when hidden.</li>
              <li>Dynamic loading for heavy visuals preserves responsiveness.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold font-mono uppercase tracking-wider text-orange-700/70">Business Value</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Faster triage and fewer operator errors through clarity.</li>
              <li>Distinctive brand presence that supports demos and sales.</li>
              <li>Scalable component system for future modules and integrations.</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}


