import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalJuries: 0,
    activeJuries: 0,
    completedJuries: 0,
    pendingDocuments: 0,
    totalParticipants: 0,
    thisMonthSubmissions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getAPI.getDashboardStats();
        setStats(response.data || {
          totalJuries: 0,
          activeJuries: 0,
          completedJuries: 0,
          pendingDocuments: 0,
          totalParticipants: 0,
          thisMonthSubmissions: 0
        });
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des stats:', err);
        setError(err.message);
        // Garde les valeurs par défaut en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useDashboardStats;