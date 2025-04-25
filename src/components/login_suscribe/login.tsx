/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch"; 
import validator from 'validator';

import styles from "./../../app/login/login.module.css";
import { useToast } from "@/lib/toast-context";
import api from '@/lib/api';

interface LoginProps {
  apiError: boolean,
  onLogin?: () => void;
}

export default function Login({ apiError, onLogin }: LoginProps) {

  const { notifyError, notifySuccess } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error] = useState("");
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoute ta logique de login ici
    if (email && password) {

      if(!validator.isEmail(email)){
        notifyError("Vous devez saisir une adresse email valide");
        return;
      }
    
      const payload = {
        email: email,
        password: password
      }

      setIsLoading(true); 

      try{
        const response = await api.post('account/login', payload);
        
        if(!response || !response.success){

          notifyError("Email ou mot de passe invalide");
          setIsLoading(false);
          return;

        }else{

          notifySuccess("Bienvenue : " + email + " !!!!!!!!!");
          setIsLoading(false);
          return;

        }

      }catch(error){
        
        notifyError("Une erreur interne est survenue");
        setIsLoading(false);

        return;
      }


    } else {
      notifyError("Remplis tous les champs !");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" color="#ef4444" />
        <input
          type="text"
          placeholder="Ton adresse email"
          className={`${styles.input_login_password} w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" color="#ef4444" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Ton mot de passe"
          className={`${styles.input_login_password} w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300">
        <label className="flex items-center gap-2">
          <Switch checked={showPassword} onCheckedChange={setShowPassword} />
          Afficher le mot de passe
        </label>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300">
        <label className="flex items-center gap-2">
          <Switch checked={stayLoggedIn} onCheckedChange={setStayLoggedIn} />
          Ne pas me déconnecter
        </label>
      </div>

      {error && <div className="text-sm text-red-400 text-center">{error}</div>}

      <button
        type="submit"
        className={`w-full ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white py-2 rounded flex items-center justify-center gap-2`}
        disabled={isLoading} // Désactive le bouton pendant le chargement
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div> // Spinner

        ) : (
          <FaSignInAlt />
        )}
        {isLoading ? 'Connexion...' : 'Connexion'}
      </button>


      <div className="text-center mt-2">
        <a href="#" className="text-sm text-red-400 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
}