import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjectProgress = () => {
  const [projectProgress, setProjectProgress] = useState([]); // ✅ Tableau vide par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/dashboard/progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
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