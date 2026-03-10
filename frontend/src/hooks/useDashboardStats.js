import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI'; // ✅ Importer getAPI

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    activeJuries: 0,
    completedJuries: 0,
    totalJuries: 0,
    pendingDocuments: 0,
    totalParticipants: 0,
    thisMonthSubmissions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Utiliser getAPI au lieu d'axios
      const response = await getAPI.getDashboardStats();
      
      console.log('📊 Dashboard stats:', response.data);
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('❌ Erreur dashboard stats:', err);
      setError(err.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}