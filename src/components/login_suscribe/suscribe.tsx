// components/Login.tsx

import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaVenusMars } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import validator from 'validator';
import { useToast } from "@/lib/toast-context";

interface SuscribeProps {
  onSuscribe?: (data: {
    email: string;
    password: string;
    firstname: string;
    gender: string;
  }) => void;
}

export default function Suscribe({ onSuscribe }: SuscribeProps) {

  const { notifyError } = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const router = useRouter();

  const totalSteps = 4;

  const handleNext = () => {

    switch(step)
    {
      // Verify Email
      case 1:
        if(!email){
          notifyError("L'email est requis");
          return;
        }

        if(!validator.isEmail(email)){
          notifyError("L'adresse email n'est pas valide");
          return;
        }

      break;

      // Verify password logic
      case 2:

        const isValidPassword = validator.isStrongPassword(password,
          {
            minLength: 8,
            minLowerCase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbol: 1
          }
        );

        if(!isValidPassword){
          notifyError("Le mot de passe doit comporter au moins 8 caractères, incluant une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.");
          return;
        }

      break;

      // Verify firstname
      case 3:
        if(!firstname){
          notifyError("Le prénom est requis");
          return;
        }
      break;

      // Verify gender logic
      case 4:
        if(!gender){
          notifyError("Veuillez selectionner une option");
          return;
        }
      break;
    }

    //debugger;

    if (step < totalSteps) {
      setStep(step + 1);
    } else if (onSuscribe) {
      onSuscribe({ email, password, firstname, gender });
      //router.push("/dashboard");
    }
  };

  const handleBack = () => {
    notifyError("");
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300 text-center">
              Ton email reste privé, il ne sera jamais divulgué. Attention, il te sera demandé de
              valider ton inscription sur cette même adresse.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
            <p className="text-sm text-gray-300 text-center">
              <FaLock className="inline-block mr-1" /> Crée un mot de passe sécurisé (8 caractères mini).
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <Switch checked={showPassword} onCheckedChange={setShowPassword} />
              Afficher le mot de passe
            </label>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300 text-center">Entre ton prénom</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
        );
        case 4:
              return (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-300">
                      <FaVenusMars className="inline-block mr-1" /> Quel est ton genre ? SecretCrush respecte et prend en compte ta personnalité. Le
                      but est simplement de te proposer des profils qui te correspondront vraiment et de
                      présenter ton profil aux bonnes personnes.
                    </p>
                  </div>
                  
                  <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
                  {['Homme', 'Femme', 'Non-binaire', 'Transgenre', 'Autre'].map((option) => {
                  const isSelected = gender.includes(option);
                  const handleClick = () => {
                    const newSelection = isSelected
                      ? gender.filter(g => g !== option)
                      : [...gender, option];

                    // Bloquer Homme + Femme ensemble
                    if (newSelection.includes('Homme') && newSelection.includes('Femme')) {
                      return; // On ignore la sélection qui combinerait les deux
                    }

                    setGender(newSelection);
                  };

                  return (
                    <div
                      key={option}
                      className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                        isSelected ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={handleClick}
                    >
                      <div className="w-6 h-6 mr-3 border border-gray-400 rounded flex items-center justify-center">
                        {isSelected && <div className="w-4 h-4 bg-red-500 rounded"></div>}
                      </div>
                      <span className="text-white">{option}</span>
                    </div>
                  );
                })}
                  </div>
                </div>
              );
      default:
        return null;
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="text-center text-xs text-gray-400 mb-4">
        {step} sur {totalSteps}
      </div>

      {renderStep()}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Retour
          </button>
        )}
        <button
          onClick={handleNext}
          className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {step === totalSteps ? "Terminer" : "Suivant"}
        </button>
      </div>
    </div>
  );
}
