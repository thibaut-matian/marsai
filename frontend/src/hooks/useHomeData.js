import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useHomeData() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/home-content');
        if (!response.ok) throw new Error('Erreur lors du chargement du contenu');
        
        const data = await response.json();
        
        console.log('🔍 Données brutes:', data); // Debug
        
        // Fonction pour normaliser camelCase
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
        
        // Transformer les données en objet utilisable
        const transformedContent = {};
        data.data.forEach(item => {
          const lang = i18n.language === 'fr' ? 'content_fr' : 'content_en';
          // Les données sont déjà des objets, pas besoin de JSON.parse
          const contentData = typeof item[lang] === 'string' 
            ? JSON.parse(item[lang]) 
            : item[lang];
          
          transformedContent[item.section] = normalizeCamelCase(contentData);
        });
        
        console.log('✅ Contenu transformé:', transformedContent); // Debug
        
        setContent(transformedContent);
      } catch (err) {
        setError(err.message);
        console.error('❌ Erreur:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [i18n.language]);

  return { content, isLoading, error };
}
