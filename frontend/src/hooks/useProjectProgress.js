import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI'; // ✅ Importer getAPI

export default function useProjectProgress() {
  const [projectProgress, setProjectProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Utiliser getAPI
      const response = await getAPI.getDashboardProgress();
      
      console.log('📈 Project progress:', response.data);
      
      if (response.data.success) {
        setProjectProgress(response.data.data);
      }
    } catch (err) {
      console.error('❌ Erreur project progress:', err);
      setError(err.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  return { projectProgress, loading, error, refetch: fetchProgress };
}
