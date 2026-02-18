import { useState, useEffect } from "react";
import axios from "axios";

export default function useListFilm() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fonction pour récupérer les films
  const fetchMovies = async () => {
    try {
      setLoading(true);
      // Avec Axios, on récupère directement l'objet "data" de la réponse
      const response = await axios.get("http://localhost:3000/api/admin/movie");
      
      // Ton contrôleur renvoie : { success: true, count: X, data: [...] }
      // Axios place le corps de la réponse dans response.data
      console.log("Réponse du serveur:", response.data); // Pour vérifier la structure de la réponse
      setMovies(response.data.data); 
      setError(null);
    } catch (err) {
      // Axios capture les erreurs HTTP (404, 500, etc.) automatiquement
      setError("Impossible de charger les films. Vérifiez que le serveur est lancé.");
      console.error("Erreur Axios:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Confirmez-vous la suppression du film : ${title} ?`)) {
      try {
        // Optionnel : si tu as une route DELETE côté back
        // await axios.delete(`http://localhost:3000/api/admin/movie/${id}`);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    alert(`Email envoyé au réalisateur de : ${selectedMovie.title}`);
    setSelectedMovie(null);
  };

  // Adaptation selon les valeurs de `is_selected` (0, 1, 2, 3) renvoyées par Sequelize
  const getBadgeClass = (status) => {
    switch (status) {
      case 1: return "badge-success text-white"; // Validé
      case 2: return "badge-error text-white";   // Refusé
      case 3: return "badge-warning text-white"; // Signalé
      case 0: return "badge-info text-white";    // En attente
      default: return "badge-ghost";
    }
  };

  // Petite fonction utilitaire pour transformer le chiffre en texte dans ton tableau
  const getStatusText = (status) => {
    const labels = { 0: "En attente", 1: "Validé", 2: "Refusé", 3: "Signalé" };
    return labels[status] || "Inconnu";
  };

  return { 
    movies,
    loading,
    error,
    getBadgeClass, 
    getStatusText,
    handleDelete, 
    handleSendEmail, 
    selectedMovie, 
    setSelectedMovie,
    refreshMovies: fetchMovies 
  };
}