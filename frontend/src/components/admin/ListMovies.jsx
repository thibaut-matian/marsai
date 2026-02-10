import React from 'react';
import { Clapperboard, AlertTriangle, User, Info } from "lucide-react";

const MOVIES_DATA = [
  { id: 1, titre: "Inception", realisateur: "Christopher Nolan", description: "Infiltration de rêves.", statut: "Validé" },
  { id: 2, titre: "Joker", realisateur: "Todd Phillips", description: "Origines du Joker.", statut: "En attente" },
  { id: 3, titre: "Madame Web", realisateur: "S. J. Clarkson", description: "Pouvoirs de voyance.", statut: "Refusé" },
  { id: 4, titre: "Films Supprimer", realisateur: "Supprimé", description: "Films supprimer", statut: "Signalé" },
  { id: 5, titre: "Les dents de la mer le retours", realisateur: "Cédric", description: "Attentions dans l'océan, il y a quelqu'un qui rode au fin fond de l'océan.", statut: "Validé" },
];

const ListMovies = () => {
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
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1E1E24]/90 backdrop-blur-md shadow-2xl">
        <table className="table w-full">
          <thead className="text-gray-400 bg-black/40">
            <tr className="border-b border-white/10 text-sm uppercase tracking-wider">
              <th className="bg-transparent py-5">Film</th>
              <th className="bg-transparent">Réalisateur</th>
              <th className="bg-transparent">Description</th>
              <th className="bg-transparent text-center">Statut</th>
            </tr>
          </thead>
          
          <tbody className="text-white">
            {MOVIES_DATA.map((film) => (
              <tr 
                key={film.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-all group"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <Clapperboard size={20} />
                    </div>
                    <div className="font-bold text-md">{film.titre}</div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-gray-300 italic font-medium">
                    <User size={14} className="text-gray-500" />
                    {film.realisateur}
                  </div>
                </td>

                <td className="max-w-md">
                  <div className="flex gap-2 items-start">
                    <Info size={14} className="text-gray-600 mt-1 shrink-0" />
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {film.description}
                    </p>
                  </div>
                </td>

                {/* Statut centré */}
                <td className="min-w-[140px]">
                  <div className="flex justify-center">
                    <div className={`badge ${getBadgeClass(film.statut)} badge-md py-3 px-4 flex gap-2 font-semibold`}>
                      {film.statut === "Signalé" && <AlertTriangle size={14} />}
                      {film.statut}
                    </div>
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