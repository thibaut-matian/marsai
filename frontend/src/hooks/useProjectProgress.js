import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

const useProjectProgress = () => {
  const [projectProgress, setProjectProgress] = useState([]); // ✅ Tableau vide par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await getAPI.getDashboardProgress();
        setProjectProgress(response.data || []); // ✅ Fallback tableau vide
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement de la progression:', err);
        setError(err.message);
        setProjectProgress([]); // ✅ Tableau vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { projectProgress, loading, error };
};

export default useProjectProgress;