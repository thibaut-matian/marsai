import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

const useRecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState([]); // ✅ Tableau vide par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getAPI.getDashboardActivity();
        setRecentActivity(response.data || []); // ✅ Fallback tableau vide
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'activité:', err);
        setError(err.message);
        setRecentActivity([]); // ✅ Tableau vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  return { recentActivity, loading, error };
};

export default useRecentActivity;