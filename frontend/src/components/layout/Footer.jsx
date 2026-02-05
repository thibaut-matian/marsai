import React from "react";
import { Link } from "react-router-dom";
import PlateformeLogo from "../../assets/img/logoPlateforme.png";
import MobileFilmLogo from "../../assets/img/logoMobile.png";

export default function Footer() {
    return (
       <footer className="flex flex-col bg-neutral-800 border-t border-white/5 p-6 text-center text-white overflow-hidden">
  <div className="flex flex-col items-center mb-4 w-full max-w-md mx-auto justify-center gap-6 md:flex-row">
      
      {/* Première image : on utilise max-w-full pour qu'elle ne dépasse jamais */}
      <img 
        src={MobileFilmLogo} 
        alt="Logo MobileFilm" 
        className="h-20 w-auto max-w-[180px] md:h-34 object-contain" 
      />
      
      <p className="text-xl md:text-2xl font-bold opacity-50">X</p>
      
      {/* Deuxième image */}
      <img 
        src={PlateformeLogo} 
        alt="Logo MarsIA" 
        className="h-20 w-auto max-w-[180px] md:h-34 object-contain" 
      />
      
  </div>
            <div className="container mx-auto px-4 flex flex-row justify-between gap-4">
                <h2 className="text-lg font-semibold">MarsIA</h2>
                <div className="flex flex-col md:flex-row space-x-4 text-left md:space-x-6 space-y-2 md:space-y-0">
                    <Link to="/submission" className="text-sm hover:underline">Soumettre un film</Link>
                    <Link to="" className="text-sm hover:underline">Mentions Légales</Link>
                    <Link to="" className="text-sm hover:underline">CGU</Link>
                    <Link to="" className="text-sm hover:underline">Politique de Confidentialité</Link>
                    <Link to="/FAQ" className="text-sm hover:underline">FAQ</Link>
                </div>
            </div>

        </footer>
    );
}