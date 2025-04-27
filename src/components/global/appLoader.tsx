'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api'
import { usePathname, useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useLayoutEventContext } from "@/components/global/layoutEventContext";

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const { setEvent } = useLayoutEventContext();

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {

    async function getCsrfToken(){
        await api.fetchCsrfToken();

        checkSession();
    }

    async function checkSession(){
        const cookies = parseCookies();
        const token = cookies.auth_token;

        const payload = {token : token};
        const response = await api.post('account/check_session', payload);

        if(token){
            
            if(pathName == '/login'){

                if(response && response.success == true){

                    router.push('/dashboard');
                    setTimeout(() => {setIsLoading(false)}, 3000);

                }
                
            }else {

                if(!response || !response.success){

                    router.push('/login');
                    setTimeout(() => {setIsLoading(false)}, 3000);
                }else{
                    setTimeout(() => {setIsLoading(false)}, 3000);
                    setEvent('showErrorStart');
                }
                    
            }
        }else{

            router.push('/login');
            setTimeout(() => {setIsLoading(false)}, 3000);

        }
        
    }

    getCsrfToken();
    
  }, [pathName]);

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