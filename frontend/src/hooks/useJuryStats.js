import { useState, useEffect, useMemo } from 'react';
import { juryService } from '../services/juryService';

export const useJuryStats = (juryList) => {
  const [apiStats, setApiStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Statistiques calculées côté client (plus rapide)
  const localStats = useMemo(() => {
    const total = juryList.length;
    const active = juryList.filter(jury => jury.isActive).length;
    const inactive = total - active;

    return { total, active, inactive };
  }, [juryList]);

  // Récupérer les statistiques depuis l'API (optionnel)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const stats = await juryService.getStats();
        setApiStats(stats);
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