import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function useListFilm() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/admin/movie");
      setMovies(response.data.data || []); 
      setError(null);
    } catch (err) {
      setError("Impossible de charger les films.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

// Dans ton hook useListFilm.js, vérifie cette partie :
const filteredMovies = useMemo(() => {
  if (statusFilter === 'all') return movies;
  return movies.filter(film => String(film.status) === String(statusFilter)); 
  // On utilise "status" ici si c'est ce que ton tableau affiche
}, [movies, statusFilter]);

  const getBadgeClass = (status) => {
    const classes = { 0: "badge-info", 1: "badge-success", 2: "badge-error", 3: "badge-warning" };
    return `${classes[status] || "badge-ghost"} text-white`;
  };

  const getStatusText = (status) => {
    const labels = { 0: "En attente", 1: "Validé", 2: "Refusé", 3: "Signalé" };
    return labels[status] || "Inconnu";
  };

  const handleDelete = async (id) => {
  if (window.confirm("Es-tu sûr de vouloir supprimer ce film ?")) {
    try {
      await axios.delete(`http://localhost:3000/api/admin/movie/${id}`);
      setMovies(movies.filter(m => m.id !== id)); 
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  }
};

  return { 
    movies,           
    filteredMovies,   
    statusFilter,     
    setStatusFilter,  
    loading,
    error,
    getBadgeClass, 
    getStatusText,
    selectedMovie, 
    setSelectedMovie,
    handleDelete,
    refreshMovies: fetchMovies 
  };
}