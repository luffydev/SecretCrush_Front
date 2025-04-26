// components/global/AccountActivationLoader.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayoutEventContext } from '@/components/global/layoutEventContext'; // Import du contexte

export default function AccountActivationLoader() {
  const { event } = useLayoutEventContext();  // Récupère l'événement
  const [isVisible, setIsVisible] = useState(false);

  // Activer le loader lors de l'événement "accountActivationStart"
  useEffect(() => {
    if (event === 'accountActivationStart') {
      setIsVisible(true);
    } else if (event === 'accountActivationEnd') {
      setIsVisible(false);
    }
  }, [event]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
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
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-lg font-semibold">Activation de votre compte en cours...</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}