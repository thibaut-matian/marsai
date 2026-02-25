import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useJuryVote() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. RÉCUPÉRER LE PROCHAIN FILM (GET)
  const fetchNextMovie = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/jury/next-movie", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.data) {
        const d = response.data.data;
        setFilm({
          id: d.id,
          title: d.vo_title,        // Table movies
          youtubeId: d.youtube_id,  // Table movies
          synopsis: d.vo_desc,      // Table movies
          duration: d.duration,     // Table movies
          aiStack: d.ia_used,       // Table movies
          director: { 
            firstname: d.firstname, 
            lastname: d.lastname 
          }
        });
      } else {
        setFilm(null); // Plus de films à noter
      }
    } catch (err) {
      console.error("Erreur chargement:", err);
      setError("Impossible de charger le film.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. ENVOYER LE VOTE (POST)
  const submitVote = async (decision, feedback) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/api/jury/vote", 
        { 
          movieId: film.id, 
          decision: decision, // "j'aime", "je n'aime pas", ou "à discuter"
          feedback: feedback  // Texte libre (max 500 car.)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Une fois voté, on charge automatiquement le film suivant
        await fetchNextMovie();
        return true;
      }
    } catch (err) {
      console.error("Erreur lors du vote:", err);
      alert(err.response?.data?.message || "Erreur lors de l'envoi du vote");
      return false;
    }
  };

  useEffect(() => {
    fetchNextMovie();
  }, [fetchNextMovie]);

  return { 
    film, 
    loading, 
    error, 
    fetchNextMovie, 
    submitVote 
  };
}