import { useState, useEffect, useCallback } from "react";
import getAPI from "../services/getAPI";

export function useJuryVote() {
  // État du film
  const [decision, setDecision] = useState(null);
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allWatched, setAllWatched] = useState(false);
  const [noAssignment, setNoAssignment] = useState(false);
  const [error, setError] = useState(null);

  // État du vote
  const [comment, setComment] = useState("");
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  // Fonction réutilisable : charge le prochain film non vu
  const loadNextMovie = useCallback(async () => {
    setLoading(true);
    setFilm(null);
    setDecision(null);
    setError(null);
    setNoAssignment(false);
    try {
      const response = await getAPI.getNextMovie();
      const data = response.data;
      if (data.data === null) {
        if (data.message === "Aucun film ne vous a encore été assigné.") {
          setNoAssignment(true);
        } else {
          setAllWatched(true);
        }
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

  // Soumission du vote
  const handleVoteSubmit = async () => {
    const decisionMap = {
      validate: "j'aime",
      discuss: "à discuter",
      refuse: "je n'aime pas",
    };

    setVoteLoading(true);
    setVoteError(null);
    try {
      await getAPI.submitVote({
        movie_id: film.id,
        decision: decisionMap[decision],
        feedback: comment,
      });
      setVoteSubmitted(true);
      setComment("");
      setTimeout(() => {
        setVoteSubmitted(false);
        loadNextMovie();
      }, 1500);
    } catch (err) {
      console.error("Erreur soumission vote:", err);
      setVoteError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setVoteLoading(false);
    }
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
    loading,
    allWatched,
    noAssignment,
    error,
    loadNextMovie,
    formatDuration,
    // Vote
    comment,
    setComment,
    voteSubmitted,
    voteError,
    voteLoading,
    handleVoteSubmit,
  };
}
