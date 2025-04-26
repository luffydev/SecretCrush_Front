// lib/layout-event-context.tsx

'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

// Crée le contexte pour l'événement du layout
const LayoutEventContext = createContext({
  event: '',
  setEvent: (event: string) => {console.log(event);},
});


// Fournisseur du contexte
export function LayoutEventProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<string>('');

  
  return (
    <LayoutEventContext.Provider value={{ event, setEvent }}>
      {children}
    </LayoutEventContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useLayoutEventContext() {
  return useContext(LayoutEventContext);
}