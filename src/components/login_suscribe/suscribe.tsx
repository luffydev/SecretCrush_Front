// components/Login.tsx

import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaUser, FaVenusMars, FaCalendar, FaMapMarkerAlt  } from "react-icons/fa";
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
  const [subStep, setSubStep] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [yearOld, setYearOld] = useState("0");
  const [localisation, setLocation] = useState("");
  const [selectedOrientations, setSelectedOrientations] = useState([]);
  const [selectedRelations, setSelectedRelations] = useState([]);

  const [acceptedPdc, setAcceptedPdc] = useState(false);
  const [acceptedCgu, setAcceptedCgu] = useState(false);
  const [acceptedCgv, setAcceptedCgv] = useState(false);

  const [isGeolocalisationLoading, setGeolocalisationLoading] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const totalSteps = 9;

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    // Mettre à jour l'état correspondant à la case cochée
    if (id === "accept_pdc") {
      setAcceptedPdc(checked);
    } else if (id === "accept_cgu") {
      setAcceptedCgu(checked);
    } else if (id === "accept_cgv") {
      setAcceptedCgv(checked);
    }
  };

  // Utilisation de useEffect pour vérifier l'état de tous les checkboxes
  useEffect(() => {

    if(step == 9)
    {
      // Vérifie si toutes les cases sont cochées
      if (acceptedPdc && acceptedCgu && acceptedCgv) {
        setNextButtonDisabled(false);
      } else {
        setNextButtonDisabled(true);
      }

    }
    
  }, [acceptedPdc, acceptedCgu, acceptedCgv]); // Ce useEffect se déclenche lorsque l'un de ces états change

  const handleOriantationChange = (e) => {
    const value = e.target.value;
    setSelectedOrientations((prev) =>
      prev.includes(value)
        ? prev.filter((orientation) => orientation !== value)
        : [...prev, value]
    );
  };

  const handleRelationChange = (e) => {
    const value = e.target.value;
    setSelectedRelations((prev) =>
      prev.includes(value)
        ? prev.filter((relation) => relation !== value)
        : [...prev, value]
    );
  };

  const handleGeolocalisation = () => {

    setGeolocalisationLoading(true); // Démarre le spinner et désactive le bouton

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'e930ccf877424fbb84bed73504ee6a75'; // Remplace par ta clé API
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.results.length > 0) {
            const city = data.results[0].components.city || data.results[0].components.town;
            const postalCode = data.results[0].components.postcode;
            setLocation(`Localisé : ${city} (${postalCode})`);
            setNextButtonDisabled(false);

          } else {
            notifyError("Ville non trouvée");
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la position géographique :', error);
          notifyError('Erreur lors de la localisation');
        }
        setGeolocalisationLoading(false); // Arrête le spinner une fois la géolocalisation terminée
      }, (error) => {
        console.error('Erreur de géolocalisation:', error);
        notifyError('Erreur de géolocalisation');
        setGeolocalisationLoading(false); // Arrête le spinner en cas d'erreur
      });
    } else {
      notifyError('La géolocalisation n\'est pas supportée par ce navigateur.');
      setGeolocalisationLoading(false); // Arrête le spinner si la géolocalisation n'est pas supportée
    }

  }

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
      
      case 7:

        if(!selectedOrientations.length){
          notifyError("Veuillez sélectionner au moins une orientation.");
          return;
        }

        if(selectedOrientations.length > 1){
          notifyError("Tu ne peux pas être sur plusieurs orientations en même temps. Choisis-en une seule.");
          return;
        }
      break;


      case 8:
        if(!selectedRelations.length){
          notifyError("Veuillez sélectionner au moins un type de relation recherchée.");
          return;
        }
      break;

    }

    if (step < totalSteps) {

      if(step == 5 && subStep <= 3)
      {
        // we check substep forms !

        switch(subStep)
        {
          case 0:

            if(!birthDay || isNaN(parseInt(birthDay)) || parseInt(birthDay) > 31){
              notifyError("Le jour de naissance doit etre un nombre entre 1 et 31");
              return;
            }

          break;

          case 1:

            if(!birthMonth || isNaN(parseInt(birthMonth)) || parseInt(birthMonth) > 12){
              notifyError("Le mois  de naissance doit etre un nombre entre 1 et 12");
              return;
            }

          break;

          case 2:

            const year = parseInt(birthYear);
            const currentYear = new Date().getFullYear(); 
            const currentMonth = new Date().getMonth() + 1;
            const currentDay = new Date().getDate();

            let lYearOld = currentYear - year;

            // Si son anniversaire cette année n'est pas encore passé
            if( (parseInt(birthMonth) > currentMonth) || (parseInt(birthMonth) == currentMonth && currentDay < parseInt(birthDay)))
              lYearOld -= 1;
      
      
            if (isNaN(year) || year <= 1900 || currentYear - year > 100) {
              notifyError("Merci d'indiquer une année de naissance valide (ex 1999 ou 2005) ")
              return;
            }

            setYearOld(lYearOld.toString());

          break;
        }

        setSubStep(subStep + 1);
      }
      else
        setStep(step + 1);
    
        if(step == 8)
          setNextButtonDisabled(true);

    } else if (onSuscribe) {
      onSuscribe({ email, password, firstname, gender });
      //router.push("/dashboard");
    }
  };

  const handleBack = () => {

    setNextButtonDisabled(false);

    //debugger;
    if(step == 5 && (subStep <= 3 && subStep > 0 ))
    {
      setSubStep(subStep -1);
    }
    else if (step > 1) {
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

         case 5:

            return (
              <div className="space-y-4">

              {step === 5 && subStep === 0 && (

                <>
                  <p className="text-sm text-gray-100 text-center">
                    🔞 Il est obligatoire de connaître ton âge pour des raisons légales, mais pas seulement ! Chaque utilisateur a le droit de choisir la tranche d’âge qu’il recherche, et la règle est la même pour tout le monde
                  </p>

                  <p className="text-sm text-gray-300 text-center">
                    Quel est ton jour de naissance :
                  </p>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="ex: 12"
                      value={birthDay}
                      onChange={(e) => {

                        setBirthDay(e.target.value)
                        
                        }} 

                    />

                  </div>
                </>

                )}


                {step === 5 && subStep === 1 && (

                  <>
                    <p className="text-sm text-gray-100 text-center">
                      🔞 Il est obligatoire de connaître ton âge pour des raisons légales, mais pas seulement ! Chaque utilisateur a le droit de choisir la tranche d’âge qu’il recherche, et la règle est la même pour tout le monde
                    </p>

                    <p className="text-sm text-gray-300 text-center">
                      Quel est ton mois de naissance :
                    </p>


                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaCalendar className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="ex: 12"
                        value={birthMonth}
                        onChange={(e) => {

                          setBirthMonth(e.target.value);
                          
                          }} 
                          
                      />

                      </div>
                    </>
                  )}


                  {step === 5 && subStep === 2 && (

                    <>
                        <p className="text-sm text-gray-100 text-center">
                          🔞 Il est obligatoire de connaître ton âge pour des raisons légales, mais pas seulement ! Chaque utilisateur a le droit de choisir la tranche d’âge qu’il recherche, et la règle est la même pour tout le monde
                        </p>

                        <p className="text-sm text-gray-300 text-center">
                          Quel est ton année de naissance :
                        </p>


                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCalendar className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="ex: 1992"
                            value={birthYear}
                            onChange={(e) => {
                              setBirthYear(e.target.value);
                            }}

                          />

                        </div>

                    </>
                    )}


                    {step === 5 && subStep === 3 && (

                    <>

                        <p className="text-gray-300 text-center mb-2 text-sm">
                          Tu as donc <span id="calculatedAge" className="text-primary font-bold">{yearOld}</span> ans ?
                        </p>
                    
                        <div className="flex flex-col gap-2 items-center sm:flex-row sm:justify-center mt-4">
                          <button
                            type="button"
                            id="confirmDobYes"
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-md shadow-lg
                                      hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                            onClick={() => {
                              setStep(step + 1);
                              setSubStep(2);

                              if(!localisation)
                                setNextButtonDisabled(true);

                            }}
                          >
                            Oui ✔️
                          </button>
                          <button
                            type="button"
                            id="confirmDobNo"
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-md shadow-lg
                                      hover:from-red-700 hover:to-red-800 transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center"

                            onClick={() => setSubStep(0)}
                          >
                            Non ❌
                          </button>
                        </div>

                    </>
                    )}
                
              </div>
            );


            case 6:
              return (
                <div className="space-y-4">
                  <button
                    type="button"
                    id="geoButton"
                    onClick={handleGeolocalisation}
                    disabled={isGeolocalisationLoading} // Désactive le bouton pendant la géolocalisation
                    className={`w-full px-4 py-3 ${isGeolocalisationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-red-600'} w-full px-4 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white font-semibold rounded-md shadow-lg hover:from-red-600 hover:to-red-700 transition duration-200 transform hover:scale-105 flex items-center justify-center`}
                  >
                      {isGeolocalisationLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div> // Spinner
                      ) : (
                        <FaMapMarkerAlt className="mr-2" />
                      )}
                      {isGeolocalisationLoading 
                      ? <span className="ml-2">Localisation en cours...</span>  
                      : localisation 
                      ? `${localisation}` 
                      : 'Utiliser ma position actuelle'}
                    </button>

                </div>
              );

              case 7:
                return(
                  <div className="w-full p-4 rounded-md bg-[#1e1e1e] text-gray-200 border-2 border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition duration-200">
                  <fieldset>
                    <legend className="sr-only">Quelle est ton orientation ?</legend>
                    <div className="grid grid-cols-1 gap-2">
                      <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                        <input
                          type="checkbox"
                          name="orientation_checkbox[]"
                          value="Hétérosexuel"
                          className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                          onChange={handleOriantationChange}
                          checked={selectedOrientations.includes("Hétérosexuel")}
                        />
                        <span className="ml-2 text-sm">👫 Hétérosexuel</span>
                      </label>
                      <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                        <input
                          type="checkbox"
                          name="orientation_checkbox[]"
                          value="Bisexuel"
                          className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                          onChange={handleOriantationChange}
                          checked={selectedOrientations.includes("Bisexuel")}
                        />
                        <span className="ml-2 text-sm">💜 Bisexuel</span>
                      </label>
                      <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                        <input
                          type="checkbox"
                          name="orientation_checkbox[]"
                          value="Gay"
                          className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                          onChange={handleOriantationChange}
                          checked={selectedOrientations.includes("Gay")}
                        />
                        <span className="ml-2 text-sm">👬 Gay</span>
                      </label>
                    </div>
                  </fieldset>
                </div>
                );


              case 8:
                return(
                  <div className="w-full p-4 rounded-md bg-[#1e1e1e] text-gray-200 border-2 border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition duration-200">
                    <fieldset>
                      <legend className="sr-only">Quel type de relation recherches-tu ?</legend>
                      <div className="grid grid-cols-1 gap-2">
                        <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                          <input
                            type="checkbox"
                            name="looking_for_input[]"
                            value="Une rencontre sans lendemain"
                            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                            onChange={handleRelationChange}
                            checked={selectedRelations.includes("Une rencontre sans lendemain")}
                          />
                          <span className="ml-2 text-sm">Une rencontre sans lendemain</span>
                        </label>
                        <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                          <input
                            type="checkbox"
                            name="looking_for_input[]"
                            value="Un·e partenaire régulier·e"
                            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                            onChange={handleRelationChange}
                            checked={selectedRelations.includes("Un·e partenaire régulier·e")}
                          />
                          <span className="ml-2 text-sm">Un·e partenaire régulier·e</span>
                        </label>
                        <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                          <input
                            type="checkbox"
                            name="looking_for_input[]"
                            value="Je ne sais pas encore"
                            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                            onChange={handleRelationChange}
                            checked={selectedRelations.includes("Je ne sais pas encore")}
                          />
                          <span className="ml-2 text-sm">Je ne sais pas encore</span>
                        </label>
                        <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                          <input
                            type="checkbox"
                            name="looking_for_input[]"
                            value="Une relation sérieuse"
                            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                            onChange={handleRelationChange}
                            checked={selectedRelations.includes("Une relation sérieuse")}
                          />
                          <span className="ml-2 text-sm">Une relation sérieuse</span>
                        </label>
                        <label className="inline-flex items-center bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-500 transition duration-200">
                          <input
                            type="checkbox"
                            name="looking_for_input[]"
                            value="Un trouple"
                            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                            onChange={handleRelationChange}
                            checked={selectedRelations.includes("Un trouple")}
                          />
                          <span className="ml-2 text-sm">Un trouple</span>
                        </label>
                      </div>
                  </fieldset>
                </div>
              );
              
              case 9:
                return (
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="accept_pdc"
                        className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                        checked={acceptedPdc}
                        onChange={handleCheckboxChange}
                      />
                      <span className="ml-2 text-gray-300 text-sm">
                        J'accepte la
                        <a href="#" data-doc="pdc.php" className="text-primary hover:underline doc-link">Politique de Confidentialité</a>.
                      </span>
                    </label>
              
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="accept_cgu"
                        className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                        checked={acceptedCgu}
                        onChange={handleCheckboxChange}
                      />
                      <span className="ml-2 text-gray-300 text-sm">
                        J'accepte les
                        <a href="#" data-doc="cgu.php" className="text-primary hover:underline doc-link">Conditions Générales d’Utilisation</a>.
                      </span>
                    </label>
              
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="accept_cgv"
                        className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded focus:ring-0 transition duration-200"
                        checked={acceptedCgv}
                        onChange={handleCheckboxChange}
                      />
                      <span className="ml-2 text-gray-300 text-sm">
                        J'accepte les
                        <a href="#" data-doc="cgv.php" className="text-primary hover:underline doc-link">Conditions Générales de Vente</a>.
                      </span>
                    </label>
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

      { subStep != 3 &&

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
            className={`${isNextButtonDisabled ? "ml-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" : "ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" }`}
            disabled={isNextButtonDisabled}
          >
            {step === totalSteps ? "Terminer" : "Suivant"}
          </button>
        </div>

      }

      
    </div>
  );
}
