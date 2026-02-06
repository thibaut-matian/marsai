import React, {useState} from "react";
import { Plus, Minus } from 'lucide-react';


export default function FAQ() {

  // State pour savoir quelle question est ouverte (null = aucune)
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

    // Fonction pour gérer le clic
  const toggleQuestion = (index) => {
    // Si on clique sur la question déjà ouverte, on la ferme (null)
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      // Sinon, on ouvre la nouvelle question
      setActiveIndex(index);
    }
  };

    return (
        <div className="mb-10 mt-10 text-lg flex justify-between items-center flex-col">
            <h1 className="text-center text-white">FAQ</h1>
            <p className="text-center text-white text-3xl mb-10">Foire aux Questions</p>

        {questions.map((question, index) =>
        <div 
          key={index} 
          className={`border-b-1 border-gray-700 collapse mb-2 w-full ${activeIndex === index ? "collapse-open" : "collapse-close"}`}
          onClick={() => toggleQuestion(index)}
          >
         <div className="collapse-title text-white cursor-pointer text-base flex justify-between items-center w-full">
           <span className="flex-1">{question}</span>
           {activeIndex === index ? <Minus className="text-white ml-4" size={20} /> : <Plus className="text-white ml-5" size={20} />}
         </div>
         <div className="collapse-content text-sm text-gray-400"> Click the "Sign Up" button in the top right corner and follow the registration process.</div>
       </div>
    )}
       
    </div>
    );
}
