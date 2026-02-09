import { useState } from "react";

export function useJuryVote() {
  // 1. GESTION DE L'ÉTAT (Le vote)
  const [decision, setDecision] = useState(null);

  // 2. DONNÉES SIMULÉES (MOCK DATA)
  // C'est ici que tu mettras tes appels API (fetch) plus tard.
  const film = {
    title: "Chroniques du Silicium",
    duration: 60,
    aiClassification: "HYBRID",

    // Identité Réalisateur
    director: {
      firstname: "Léa",
      lastname: "Dubois",
      profession: "Motion Designer",
      city: "Lyon",
      country: "France",
      socials: {
        instagram: "@lea_dbs_art",
        website: "www.lea-dubois.com",
      },
    },

    // Tech & IA
    aiStack: "Midjourney v6, Runway Gen-2, ElevenLabs, After Effects",
    aiMethodology:
      "Génération des arrière-plans sur MJ, incrustation d'acteurs réels filmés sur fond vert, puis style transfer via Runway pour l'ambiance onirique.",

    // Textes
    synopsis:
      "Dans un futur où la mémoire est stockée sur quartz, une archiviste découvre une faille dans l'histoire officielle de l'humanité. Elle doit choisir entre révéler la vérité au monde ou préserver la paix sociale factice qui règne depuis un siècle.",
    directorNote:
      "Je voulais explorer la texture du souvenir numérique. L'aspect hybride sert le propos : le réel (les acteurs) se perd peu à peu dans l'artificiel (les décors générés par IA).",

    // Équipe (Liste dynamique)
    team: [
      { role: "Sound Designer", firstname: "Marc", lastname: "Veral" },
      { role: "Voix Off", firstname: "Sarah", lastname: "Connor" },
      { role: "Prompt Engineer", firstname: "Alex", lastname: "Turing" },
    ],
  };

  // 3. FONCTION UTILITAIRE (Formatage du temps 145 -> 02:25)
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // 4. EXPORT (On rend tout disponible pour la page)
  return {
    decision,
    setDecision,
    film,
    formatDuration,
  };
}
