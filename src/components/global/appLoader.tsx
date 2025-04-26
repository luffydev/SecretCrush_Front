'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            if (!isLoading) {
              setIsVisible(false); // Après fade-out seulement
            }
          }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: 0, y: -50 }}
            animate={{
              scale: 1.2,
              rotate: 360,
              y: 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
              duration: 1.5,
            }}
          >
            <h1 className="text-white text-4xl font-bold animate-pulse">
              SecretCrush
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}