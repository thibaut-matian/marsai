import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState([]); // ✅ Tableau vide par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/dashboard/activity', {
          headers: { Authorization: `Bearer ${token}` }
        });
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