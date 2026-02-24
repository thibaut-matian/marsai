import { useEffect, useMemo, useState } from 'react';
import getAPI from '../services/getAPI';

export const useJuryStats = (juryList) => {
  const [apiStats, setApiStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Statistiques calculées côté client (plus rapide)
  const localStats = useMemo(() => {
    // Vérifier que juryList est bien un tableau
    if (!Array.isArray(juryList)) {
      return { total: 0, active: 0, inactive: 0 };
    }
    
    const total = juryList.length;
    const active = juryList.filter(jury => jury.is_active).length;
    const inactive = total - active;

    return { total, active, inactive };
  }, [juryList]);

  // Récupérer les statistiques depuis l'API (optionnel)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const response = await getAPI.getJuryStats();
        setApiStats(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    // Décommenter pour utiliser les stats de l'API au lieu du calcul local
    // fetchStats();
  }, []);

  // Utiliser les stats locales par défaut (plus rapide)
  return {
    stats: localStats,
    // stats: apiStats || localStats, // Décommenter pour utiliser l'API
    isLoadingStats,
  };
};