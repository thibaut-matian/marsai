import React from "react";

export default function FAQ() {

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

    return (
        <>
        <div>
            <h1>Foire aux Questions (FAQ)</h1>
            <p>Bienvenue sur la page FAQ. Ici, vous trouverez les réponses aux questions les plus fréquentes.</p>
        </div>

        {questions.map((question, index) =>
        <div key={index} tabIndex={0} className="collapse collapse-plus bg-base-100 border-base-300 border">
         <div className="collapse-title font-semibold">{question}</div>
         <div className="collapse-content text-sm"> Click the "Sign Up" button in the top right corner and follow the registration process.</div>
       </div>
    )}
       
        </>
    );
}
