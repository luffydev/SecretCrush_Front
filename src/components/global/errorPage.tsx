/* eslint-disable react/no-unescaped-entities */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react'; // Icône alerte sympa
import { useLayoutEventContext } from '@/components/global/layoutEventContext'; // Import du contexte


export default function ErrorPage() {

  const { event } = useLayoutEventContext();  // Récupère l'événement
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (event === 'showErrorStart') {
      setIsVisible(true);
    } else if (event === 'showErrorEnd') {
      setIsVisible(false);
    }
  }, [event]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 space-y-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
              duration: 1.2,
            }}
          >
            <AlertTriangle size={80} className="text-red-500 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white text-5xl font-bold"
          >
            404 - Page introuvable
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-red-400 text-xl"
          >
            Oups... On dirait que cette page n'existe pas !
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
