/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch"; 

import styles from "./../../app/login/login.module.css";

import { useToast } from "@/lib/toast-context";

interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {

  const { notifyError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoute ta logique de login ici
    if (email && password) {
      onLogin?.();
    } else {
      notifyError("Remplis tous les champs !");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" color="#ef4444" />
        <input
          type="email"
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
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
      >
        <FaSignInAlt /> Connexion
      </button>

      <div className="text-center mt-2">
        <a href="#" className="text-sm text-red-400 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
}