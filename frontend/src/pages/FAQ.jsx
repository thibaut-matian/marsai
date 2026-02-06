import React, { useState } from "react";
import { Plus, Minus } from 'lucide-react';
import videoFAQ from "../assets/videos/videoFAQ.mp4";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    "Quels sont les prix décernés lors du festival ?", 
    "Quelle doit être la durée du court-métrage soumis ?",
    "Puis-je soumettre plusieurs films ?",
    "Puis-je modifier ma soumission après l’avoir envoyée ?",
    "Une équipe peut-elle soumettre un film ?",
    "Comment l’intelligence artificielle doit-elle être intégrée dans le film ?",
    "Quels sont les critères d’évaluation des films soumis ?",
    "Comment serai-je informé(e) de la bonne réception de ma soumission ?",
    "Les films soumis seront-ils rendus publics ?",
    "Où puis-je consulter le règlement et les conditions de participation ?",
  ];

  const toggleQuestion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col w-full"> {/* Container Principal */}
      
      {/* --- SECTION HEADER (Vidéo + Titre) --- */}
      {/* 1. relative : permet aux enfants en 'absolute' de se caler par rapport à CE bloc */}
      {/* 2. overflow-hidden : coupe tout ce qui dépasse (la vidéo) */}
      <div className="relative w-full h-64 overflow-hidden flex items-center justify-center">
        
        {/* LA VIDÉO EN ARRIÈRE-PLAN */}
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoFAQ} type="video/mp4"/>
        </video>

        {/* UN FILTRE NOIR (Optionnel mais recommandé pour lire le texte) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* LE CONTENU TEXTE */}
        {/* z-10 et relative : permet au texte de passer PAR DESSUS la vidéo */}
        <div className="relative z-10 text-center pt-30">
          <h1 className="text-white font-bold text-4xl mb-2">FAQ</h1>
          <p className="text-white text-xl">Foire aux Questions</p>
        </div>
      </div>


      {/* --- SECTION LISTE DES QUESTIONS --- */}
      <div className="max-w-3xl mx-auto w-full px-4 py-10">
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
            {/* Titre de la question */}
            <div className="collapse-title text-white cursor-pointer text-base flex justify-between items-center w-full pr-4">
              <span className="flex-1 font-medium">{question}</span>
              <span className="text-indigo-400">
                {activeIndex === index 
                  ? <Minus size={24} /> 
                  : <Plus size={24} />
                }
              </span>
            </div>

            {/* Contenu de la réponse */}
            <div className="collapse-content text-sm text-gray-300"> 
              <p className="pt-2">Click the "Sign Up" button in the top right corner and follow the registration process.</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}