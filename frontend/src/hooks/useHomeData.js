import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/home-content';

export function useHomeData() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [i18n.language]);

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

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      
      console.log('🔍 Données brutes:', response.data);

      // Transformer les données pour les rendre accessibles par section
      const transformedContent = {};
      response.data.data.forEach(item => {
        const lang = i18n.language === 'en' ? 'en' : 'fr';
        const contentKey = `content_${lang}`;
        
        // ✅ Normaliser les clés snake_case -> camelCase
        transformedContent[item.section] = normalizeCamelCase(item[contentKey]);
      });
      
      console.log('✅ Contenu transformé:', transformedContent);
      console.log('🎬 Hero buttonEnabled:', transformedContent.hero?.buttonEnabled); // ✅ Debug spécifique
      
      setContent(transformedContent);
    } catch (error) {
      console.error('❌ Erreur chargement contenu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { content, isLoading, loadContent };
}
