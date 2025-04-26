'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Timer de 2.5 sec
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }} // Fade-out
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      {isLoading && (
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
          {/* Tu peux remplacer ce texte par un logo SVG animé ou un autre composant ici */}
          <h1 className="text-white text-4xl font-bold animate-pulse">
            SecretCrush
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
}