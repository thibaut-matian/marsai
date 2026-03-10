import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

/**
 * Hook pour vérifier si la galerie est accessible
 * La galerie n'est accessible que pendant la dernière phase
 */
export function useGalleryAccess() {
  const [isAccessible, setIsAccessible] = useState(null); // null = loading
  const [error, setError] = useState(null);

  // Fonction pour normaliser les clés (snake_case -> camelCase)
  const normalizeCamelCase = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(item => normalizeCamelCase(item));
    }
    
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[camelKey] = normalizeCamelCase(obj[key]);
        return acc;
      }, {});
    }
    
    return obj;
  };

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await getAPI.getHomeContent();
        console.log('🔍 Response complète:', response.data);
        
        const timelineContent = response.data.data.find(item => item.section === 'timeline');
        console.log('📅 Timeline content brut:', timelineContent);
        
        if (!timelineContent) {
          console.warn('⚠️ Aucun contenu timeline trouvé');
          setIsAccessible(false);
          return;
        }

        // Normaliser les données (snake_case -> camelCase)
        const timelineFr = normalizeCamelCase(timelineContent.content_fr) || {};
        console.log('📅 Timeline FR normalisé:', timelineFr);
        
        const phases = timelineFr.phases || [];
        const activeStep = timelineFr.activeStep || 1;
        
        console.log('📊 Phases:', phases);
        console.log('📍 Active step:', activeStep);
        console.log('🔢 Nombre de phases:', phases.length);
        
        // Vérifier si on est à la dernière phase
        // activeStep est 1-indexed, donc la dernière phase a un activeStep === phases.length
        const isLastPhase = activeStep === phases.length;
        
        console.log('✅ Est à la dernière phase?', isLastPhase);
        
        setIsAccessible(isLastPhase);
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
