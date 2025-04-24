"use client"

import styles from "./../login/login.module.css";
import { useState } from "react";
import { FaUserPlus, FaSignInAlt, FaEnvelope, FaLock, FaUser, FaVenusMars } from "react-icons/fa";
import Login from "@/components/login_suscribe/login";
import { useRouter } from "next/navigation";

// Subscription component for multi-step registration
const Subscription = ({ onSubscribe }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const totalSteps = 9;

  const handleNext = () => {
    setError("");
    
    // Validation logic for each step
    if (step === 1 && !email) {
      setError("L'email est requis");
      return;
    }
    
    if (step === 2 && (!password || password.length < 8)) {
      setError("Le mot de passe doit comporter au moins 8 caractères");
      return;
    }
    
    if (step === 3 && !firstname) {
      setError("Le prénom est requis");
      return;
    }
    
    if (step === 4 && !gender) {
      setError("Veuillez sélectionner une option");
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSubscribe({ email, password, firstname, gender });
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-300">
                Ton email reste privé, il ne sera jamais divulgué. Attention, il te sera demandé de
                valider ton inscription sur cette même adresse
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-300">
                <FaLock className="inline-block mr-1" /> Crée un mot de passe unique. Il doit comporter au moins 8 caractères, incluant une
                majuscule, un caractère spécial, des lettres et des chiffres. Oui, la sécurité, ce n'est pas
                une plaisanterie
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Choisis un mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-300">
                Afficher le mot de passe
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-300">
                <FaUser className="inline-block mr-1" /> Quel est ton prénom ? Il peut s'agir d'un pseudonyme, d'un faux prénom, ou de
                celui que tu portes depuis ta naissance. Cela ne regarde que toi, mais rappelle-toi
                qu'il sera affiché sur ton profil.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Quel est ton prénom ?"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <p className="text-center">{error}</p>
              </div>
            )}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-300">
                <FaVenusMars className="inline-block mr-1" /> Quel est ton genre ? SecretCrush respecte et prend en compte ta personnalité. Le
                but est simplement de te proposer des profils qui te correspondront vraiment et de
                présenter ton profil aux bonnes personnes.
              </p>
            </div>
            
            <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
              {['Homme', 'Femme', 'Non-binaire', 'Transgenre', 'Autre'].map((option) => (
                <div 
                  key={option} 
                  className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                    gender === option ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setGender(option)}
                >
                  <div className="w-6 h-6 mr-3 border border-gray-400 rounded flex items-center justify-center">
                    {gender === option && <div className="w-4 h-4 bg-red-500 rounded"></div>}
                  </div>
                  <span className="text-white">{option}</span>
                </div>
              ))}
            </div>
            
            {(gender === 'Homme' && step === 4) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                <p className="text-center">Tu ne peux pas être "Homme" et "Femme" en même temps.</p>
              </div>
            )}
          </div>
        );
      // Add additional steps as needed
      default:
        return (
          <div className="text-center p-4">
            <p>Étape supplémentaire à implémenter</p>
          </div>
        );
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="text-center text-xs text-gray-400 mb-4">
        {step} sur {totalSteps}
      </div>

      {renderStep()}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center"
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [loginButtonSelected, setLoginButtonSelected] = useState(styles.button_selected);
  const [suscribeButtonSelected, setSuscribeButtonSelected] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#192130] to-[#192130] flex items-center justify-center p-4">
      <div
        className="bg-[#192130] border border-red-500 shadow-lg shadow-red-500/20 rounded-2xl p-8 w-full max-w-md text-white"
        style={{ animation: 'auraPulse 2s ease-in-out infinite' }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-200">
          Secret<span className="text-pink-400">C</span>rush
        </h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          {loginButtonSelected !== "" 
            ? "Explore sans limites."
            : suscribeButtonSelected !== "" 
              ? "Ton espace, tes choix."
              : "Connexions sincère"
          }
        </p>

        <div className="flex justify-center gap-2 mb-6">
          <button
            className={`text-white px-4 py-2 rounded flex items-center gap-2 ${styles.button} ${loginButtonSelected}`}
            onClick={() => {
              if (loginButtonSelected === "") {
                setLoginButtonSelected(styles.button_selected);
                setSuscribeButtonSelected("");
              }
            }}
          >
            <FaSignInAlt /> Connexion
          </button>
          <button
            className={`text-white px-4 py-2 rounded flex items-center gap-2 ${styles.button} ${suscribeButtonSelected}`}
            onClick={() => {
              if (suscribeButtonSelected === "") {
                setSuscribeButtonSelected(styles.button_selected);
                setLoginButtonSelected("");
              }
            }}
          >
            <FaUserPlus /> Inscription
          </button>
        </div>

        {/* Login component */}
        {loginButtonSelected !== "" && <Login onLogin={() => console.log("Connecté !")} />}

        {/* Subscription component */}
        {suscribeButtonSelected !== "" && (
          <Subscription onSubscribe={(data) => console.log("Inscrit !", data)} />
        )}

        <footer className="mt-6 text-center text-xs text-gray-500">
          © 2024|2025 SecretCrush
          <br />
          Développé par un 🇫🇷
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:underline">
              À propos
            </a>
            <a href="#" className="hover:underline">
              PDC
            </a>
            <a href="#" className="hover:underline">
              CGU
            </a>
            <a href="#" className="hover:underline">
              CGV
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}