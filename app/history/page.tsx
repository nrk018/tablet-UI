'use client';

import Layout from '../components/Layout';
import ReplayViewer from '../components/ReplayViewer';
import NotorietyMeter from '../components/NotorietyMeter';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function HistoryPage() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-semibold text-white mb-2">Tournament & History</h1>
          <p className="text-white/60">Battle Logs & Intelligence</p>
        </motion.div>

        <NotorietyMeter />

        <ReplayViewer />
      </div>
    </Layout>
  );
}
