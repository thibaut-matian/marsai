import { useEffect, useState } from "react";
import getAPI from "../services/getAPI";

const useProjectProgress = () => {
  const [progress, setProgress] = useState({
    totalFilms: 0,
    watchedFilms: 0,
    percentage: 0,
    movies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await getAPI.getJuryProgress();
        // La route renvoie { success: true, data: { totalFilms, watchedFilms, percentage, movies } }
        setProgress(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement de la progression jury:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { progress, loading, error };
};

export default useProjectProgress;
