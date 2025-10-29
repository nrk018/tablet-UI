'use client';

import Layout from '../components/Layout';
import AlertsPanel from '../components/AlertsPanel';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function CommsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold text-white mb-2">Comms & Alerts</h1>
          <p className="text-white/60">Communication Center</p>
        </motion.div>

        <AlertsPanel />
      </div>
    </Layout>
  );
}
