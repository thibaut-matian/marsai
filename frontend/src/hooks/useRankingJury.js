import { useState, useEffect } from "react";
import getAPI from "../services/getAPI";

/**
 * Récupère les votes du jury connecté depuis l'API
 * et les sépare en deux listes : coups de cœur et à discuter.
 */
export function useRankingJury() {
  const [myVotes, setMyVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping ENUM BDD → statut UI
  const decisionToStatus = (decision) => {
    if (decision === "j'aime") return "validate";
    if (decision === "à discuter") return "discuss";
    return "refuse";
  };

  // Formatage durée en secondes → "MM:SS"
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const response = await getAPI.getMyVotes();
        const raw = response.data.data || [];

        const formatted = raw.map((vote) => ({
          id: vote.movieId,
          title: vote.title,
          director: vote.director,
          duration: formatDuration(vote.duration),
          status: decisionToStatus(vote.decision),
          posterUrl: vote.posterUrl,
          feedback: vote.feedback,
        }));

        setMyVotes(formatted);
        setError(null);
      } catch (err) {
        console.error("Erreur chargement classement jury:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  const validatedFilms = myVotes.filter((f) => f.status === "validate");
  const discussedFilms = myVotes.filter((f) => f.status === "discuss");
  const refusedFilms = myVotes.filter((f) => f.status === "refuse");

  return { validatedFilms, discussedFilms, refusedFilms, loading, error };
}
