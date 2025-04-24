/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";

const TypingEffect = () => {
  const texts = [
    "Sois toi-même, sans filtre.",
    "Tu es unique, et c'est ta force.",
    "Le monde n'attend que toi.",
  ];
  
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCaretVisible, setIsCaretVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  
  // Animation du caret clignotant
  useEffect(() => {
    const caretInterval = setInterval(() => {
      setIsCaretVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(caretInterval);
  }, []);

  // Animation du texte
  useEffect(() => {
    const typingSpeed = 70;  // ms par caractère lors de l'écriture
    const deleteSpeed = 50;  // ms par caractère lors de l'effacement
    const pauseTime = 2000;  // temps de pause réduit à 2 secondes
    
    const currentText = texts[textIndex];
    
    const tick = () => {
      // Logique pour l'écriture et l'effacement
      if (!isDeleting) {
        // En train d'écrire
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        
        // Si on a terminé d'écrire le texte complet, on attend puis on commence à effacer
        if (charIndex >= currentText.length - 1) {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
          return;
        }
      } else {
        // En train d'effacer
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        
        // Si on a tout effacé, on passe au texte suivant
        if (charIndex <= 1) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
          return;
        }
      }
    };
    
    // Définir le délai en fonction de si on écrit ou on efface
    const delay = isDeleting ? deleteSpeed : typingSpeed;
    
    // Programmer le prochain tick
    const timerId = setTimeout(tick, delay);
    
    // Nettoyer le timer
    return () => clearTimeout(timerId);
  }, [textIndex, charIndex, isDeleting, texts]);

  return (
    <p className="text-center text-sm text-gray-400 mb-6">
      {displayedText}
      <span
        className={`inline-block w-1 h-6 bg-gray-400 ml-1 ${
          isCaretVisible ? "opacity-100" : "opacity-0"
        }`}
      ></span>
    </p>
  );
};

export default TypingEffect;