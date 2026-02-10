import React from "react";

export default function useListFilm() {

const MOVIES_DATA = [
  { id: 1, titre: "Inception", realisateur: "Christopher Nolan", description: "Infiltration de rêves.", statut: "Validé" },
  { id: 2, titre: "Joker", realisateur: "Todd Phillips", description: "Origines du Joker.", statut: "En attente" },
  { id: 3, titre: "Madame Web", realisateur: "S. J. Clarkson", description: "Pouvoirs de voyance.", statut: "Refusé" },
  { id: 4, titre: "Films Supprimer", realisateur: "Supprimé", description: "Films supprimer", statut: "Signalé" },
  { id: 5, titre: "Les dents de la mer le retours", realisateur: "Cédric", description: "Attentions dans l'océan, il y a quelqu'un qui rode au fin fond de l'océan.", statut: "Validé" },
];

 const getBadgeClass = (statut) => {
    switch (statut) {
      case "Validé": return "badge-success text-white";
      case "Refusé": return "badge-error text-white";
      case "Signalé": return "badge-error animate-pulse text-white border-2 shadow-[0_0_10px_rgba(255,0,0,0.5)]";
      case "En attente": return "badge-info text-white";
      default: return "badge-ghost";
    }
  };

  return { MOVIES_DATA, getBadgeClass };
}     