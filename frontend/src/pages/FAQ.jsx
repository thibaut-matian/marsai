import React, { useState } from "react";
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import videoFAQ from "../assets/videos/videoFAQ.mp4";

export default function FAQ() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    t('faq.q1'),
    t('faq.q2'),
    t('faq.q3'),
    t('faq.q4'),
    t('faq.q5'),
    t('faq.q6'),
    t('faq.q7'),
    t('faq.q8'),
    t('faq.q9'),
    t('faq.q10'),
  ];

  const toggleQuestion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col w-full bg-black min-h-screen"> 
      
      {/* --- LE CONTENEUR HERO (Le Parent) --- */}
      {/* - relative : Pour que la vidéo (absolute) se cale sur LUI.
          - h-[50vh] : La hauteur de la zone vidéo (50% de la hauteur d'écran). 
                       Tu peux mettre h-96 si tu veux plus petit.
          - overflow-hidden : Coupe ce qui dépasse.
      */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        
        {/* LA VIDÉO (L'Enfant Arrière-Plan) */}
        {/* CHANGEMENT ICI : absolute (au lieu de fixed) */}
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoFAQ} type="video/mp4"/>
        </video>

        {/* LE FILTRE SOMBRE (Pour la lisibilité) */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* LE CONTENU TEXTE (L'Enfant Premier Plan) */}
        {/* z-10 : Pour passer au dessus de la vidéo */}
        {/* pt-20 : Pour éviter que le titre soit caché par le Header fixed */}
        <div className="relative z-10 text-center px-4 pt-24">
          <h1 className="text-white font-bold text-4xl mb-2">FAQ</h1>
          <p className="text-white text-xl">Foire aux Questions</p>
        </div>
      </div>


      {/* --- SECTION LISTE DES QUESTIONS --- */}
      <div className="max-w-3xl mx-auto w-full px-4 py-10 z-10 relative">
        {questions.map((question, index) => (
          <div 
            key={index} 
            className={`
              collapse mb-4 border transition-all duration-300 ease-in-out
              ${activeIndex === index 
                ? "collapse-open border-indigo-500/50 bg-white/5 shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] rounded-xl" 
                : "border-gray-800 bg-transparent rounded-none border-t-0 border-x-0 border-b" 
              }
            `}
            onClick={() => toggleQuestion(index)}
          >
            <div className="collapse-title text-white cursor-pointer text-base flex justify-between items-center w-full pr-4">
              <span className="flex-1 font-medium">{question}</span>
              <span className="text-indigo-400">
                {activeIndex === index 
                  ? <Minus size={24} /> 
                  : <Plus size={24} />
                }
              </span>
            </div>

            <div className="collapse-content text-sm text-gray-300"> 
              <p className="pt-2">Click the "Sign Up" button in the top right corner and follow the registration process.</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}