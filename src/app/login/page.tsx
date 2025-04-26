"use client"  

import styles from "./login.module.css"
import { useState, useEffect, Suspense } from "react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

import Footer from "@/components/global/footer"
import Login from "@/components/login_suscribe/login";
import Suscribe from "@/components/login_suscribe/suscribe";
import TypingEffect from "@/components/login_suscribe/typing-effect";
import { useToast } from "@/lib/toast-context";
import api from "@/lib/api";

export default function LoginPage() {
  
  const {notifyError} = useToast();

     
  const [csrfToken] = useState("");
  const [apiError, setAPIError] = useState(false);
  const [loginButtonSelected, setLoginButtonSelected] = useState(styles.button_selected);
  const [suscribeButtonSelected, setSuscribeButtonSelected] = useState("");

  useEffect(() => {

    async function fetchCsrfToken(){

      try{
        
       await api.fetchCsrfToken();

      }catch{

        setAPIError(true);
        notifyError("Impossible de charger les données depuis l'API, veuillez reesayer plus tard.");
        
      }
    }

    if(!csrfToken)
      fetchCsrfToken();

  }, []);


  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#192130] to-[#192130] flex items-center justify-center p-4">
      <div className="bg-[#192130] border border-red-500 shadow-lg shadow-red-500/20 rounded-2xl p-8 w-full max-w-md text-white"  style={{ animation: 'auraPulse 2s ease-in-out infinite' }}>
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-200">
          Secret<span className="text-pink-400">C</span>rush
        </h1>
        {/* Animation du texte avec caret clignotant */}
        <TypingEffect />

        <div className="flex justify-center gap-2 mb-6">
          <button className={`text-white px-4 py-2 rounded flex items-center gap-2 ${styles.button} ${loginButtonSelected}`} onClick={() => {
                  if (loginButtonSelected === "") {
                     setLoginButtonSelected(styles.button_selected);
                     setSuscribeButtonSelected("");
                  }
          }}>

            <FaSignInAlt /> Connexion
          </button>
          <button className={`text-white px-4 py-2 rounded flex items-center gap-2 ${styles.button} ${suscribeButtonSelected}`} onClick={() => {
                  if (suscribeButtonSelected === "") {
                    setSuscribeButtonSelected(styles.button_selected);
                    setLoginButtonSelected("");
                  }
          }}>

            <FaUserPlus /> Inscription
          </button>
        </div>

        {/* Login component */}

       {/* Login component */}
       {loginButtonSelected !== "" && 
       
        <Suspense fallback={<div>Loading...</div>}>
            <Login apiError={apiError} onLogin={() => console.log("Connecté !")} />
        </Suspense>
       
       }
        

         {/* Suscription component */}
         {suscribeButtonSelected !== "" &&  

            <Suscribe onSuscribeSuccess={() => {

              setLoginButtonSelected(styles.button_selected);
              setSuscribeButtonSelected("");

            }}
            />
        }
      

        {/* Footer component */}
        <Footer />
      </div>
    </div>
  );
}
