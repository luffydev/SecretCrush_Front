/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Création du contexte
const ToastContext = createContext({
  notifySuccess: (msg: string) => {},
  notifyError: (msg: string) => {},
});

// Provider qui gère les toasts
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </ToastContext.Provider>
  );
};

// Hook pour utiliser les toasts
export const useToast = () => useContext(ToastContext);