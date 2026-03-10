import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI'; // ✅ Importer getAPI

export default function useRecentActivity() {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivity();
    
    // ✅ Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Utiliser getAPI
      const response = await getAPI.getDashboardActivity();
      
      console.log('🔔 Recent activity:', response.data);
      
      if (response.data.success) {
        setRecentActivity(response.data.data);
      }
    } catch (err) {
      console.error('❌ Erreur recent activity:', err);
      setError(err.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  return { recentActivity, loading, error, refetch: fetchActivity };
}