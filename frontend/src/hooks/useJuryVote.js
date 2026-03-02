import { useState, useEffect, useCallback } from "react";
import getAPI from "../services/getAPI";

export function useJuryVote() {
  // 1. GESTION DE L'ÉTAT (Le vote)
  const [decision, setDecision] = useState(null);
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allWatched, setAllWatched] = useState(false);
  const [error, setError] = useState(null);

  // Fonction réutilisable : charge le prochain film non vu
  const loadNextMovie = useCallback(async () => {
    setLoading(true);
    setFilm(null);
    setDecision(null); // reset le vote pour le nouveau film
    setError(null);
    try {
      const response = await getAPI.getNextMovie();
      const data = response.data;
      if (data.data === null) {
        setAllWatched(true);
      } else {
        setFilm(data.data);
        setAllWatched(false);
      }
    } catch (err) {
      console.error("Erreur chargement film suivant:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => {
    loadNextMovie();
  }, [loadNextMovie]);

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
    loading,
    allWatched,
    error,
    loadNextMovie, // ← exposé pour l'appeler après un vote
    formatDuration,
  };
}
