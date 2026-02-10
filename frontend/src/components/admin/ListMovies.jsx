import React from 'react';
import { Clapperboard, AlertTriangle } from "lucide-react";

const MOVIES_DATA = [
  { id: 1, titre: "Inception", realisateur: "Christopher Nolan", description: "Infiltration de rêves.", statut: "Validé" },
  { id: 2, titre: "Joker", realisateur: "Todd Phillips", description: "Origines du Joker.", statut: "En attente" },
  { id: 3, titre: "Madame Web", realisateur: "S. J. Clarkson", description: "Pouvoirs de voyance.", statut: "Refusé" },
  { id: 4, titre: "Films Supprimer", realisateur: "Supprimé", description: "Films supprimer", statut: "Signalé" },
  { id: 5, titre: "Les dents de la mer le retours", realisateur: "Cédric", description: "Attentions dans l'océan, il y a quelqu'un qui rode au fin fond de l'océan, je teste les grand texte pour savoir ce qu'il faut faire.", statut: "Validé" },
];

const ListMovies = () => {
  // Gestion précise des couleurs et animations de badges
  const getBadgeClass = (statut) => {
    switch (statut) {
      case "Validé": return "badge-success text-white";
      case "Refusé": return "badge-error text-white";
      case "Signalé": return "badge-error animate-pulse text-white border-2 shadow-[0_0_10px_rgba(255,0,0,0.5)]";
      case "En attente": return "badge-info text-white";
      default: return "badge-ghost";
    }
  };

  return (
    <div className="p-6">
      {/* Tableau avec ta couleur personnalisée */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1E1E24]/90 backdrop-blur-md shadow-2xl">
        <table className="table w-full">
          {/* Header sombre */}
          <thead className="text-gray-400 bg-black/40">
            <tr className="border-b border-white/10">
              <th className="bg-transparent py-5">Titre</th>
              <th className="bg-transparent">Réalisateur</th>
              <th className="bg-transparent text-center">Description</th>
              <th className="bg-transparent">Statut</th>
            </tr>
          </thead>
          
          <tbody className="text-white">
            {MOVIES_DATA.map((film) => (
              <tr 
                key={film.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-all"
              >
                <td className="font-bold text-lg">{film.titre}</td>
                <td className="text-gray-300 font-medium">{film.realisateur}</td>
                <td className="max-w-md">
                  <p className="text-gray-400 italic text-sm line-clamp-2">
                    {film.description}
                  </p>
                </td>
                <td className="min-w-[140px]">
                  <div className={`badge ${getBadgeClass(film.statut)} badge-md py-3 px-4 flex gap-2`}>
                    {film.statut === "Signalé" && <AlertTriangle size={14} />}
                    {film.statut}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMovies;