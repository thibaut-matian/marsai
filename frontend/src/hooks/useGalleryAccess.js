import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

/**
 * Hook pour vérifier si la galerie est accessible
 * La galerie n'est accessible que pendant la dernière phase (festival)
 */
export function useGalleryAccess() {
  const [isAccessible, setIsAccessible] = useState(null); // null = loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await getAPI.getHomeContent();
        const timelineContent = response.data.data.find(item => item.section === 'timeline');
        
        if (!timelineContent) {
          setIsAccessible(false);
          return;
        }

        // Récupérer les phases et l'étape active (on prend la version FR par défaut)
        const timelineFr = timelineContent.content_fr || {};
        const phases = timelineFr.phases || [];
        const activeStep = timelineFr.activeStep || 1;
        
        // Vérifier si on est à la dernière phase (festival)
        // La dernière phase est généralement celle avec la key "festival" ou la dernière dans la liste
        const lastPhaseIndex = phases.length;
        const isLastPhase = activeStep === lastPhaseIndex;
        
        // Alternative : vérifier par la clé "festival"
        const activePhase = phases[activeStep - 1];
        const isFestivalPhase = activePhase?.key === 'festival';
        
        setIsAccessible(isLastPhase || isFestivalPhase);
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'accès galerie:', err);
        setError(err);
        // En cas d'erreur, on autorise l'accès par défaut
        setIsAccessible(true);
      }
    };

    checkAccess();
  }, []);

  return { isAccessible, error };
}
