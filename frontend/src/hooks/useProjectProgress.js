import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/dashboard';

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
      
      const response = await axios.get(`${API_URL}/progress`);
      
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
