import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getAPI from '../services/getAPI';

import localJury0 from '../assets/img/adele.jpg';
import localJury5 from '../assets/img/depp.jpg';
import localJury1 from '../assets/img/jenna.jpg';
import localJury2 from '../assets/img/malik.jpg';
import localJury3 from '../assets/img/reeve.jpg';
import localJury4 from '../assets/img/rihanna.jpg';
import teaserVideo from '../assets/videos/Teaser.mp4';
const USE_LOCAL_ASSETS = import.meta.env.VITE_USE_LOCAL_ASSETS === 'true';
const LOCAL_JURY_IMAGES = [localJury0, localJury1, localJury2, localJury3, localJury4, localJury5];

const applyLocalAssets = (section, content) => {
  if (!content) return content;
  if (section === 'hero') {
    return { ...content, videoUrl: teaserVideo };
  }
  if (section === 'jury' && Array.isArray(content.members)) {
    return {
      ...content,
      members: content.members.map((member, i) => ({
        ...member,
        image: LOCAL_JURY_IMAGES[i % LOCAL_JURY_IMAGES.length],
      })),
    };
  }
  return content;
};

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
      const response = await getAPI.getHomeContent();

      console.log('🔍 Données brutes:', response.data);

      // Transformer les données pour les rendre accessibles par section
      const transformedContent = {};
      response.data.data.forEach(item => {
        const lang = i18n.language === 'en' ? 'en' : 'fr';
        const contentKey = `content_${lang}`;

        const normalized = normalizeCamelCase(item[contentKey]);
        transformedContent[item.section] = USE_LOCAL_ASSETS
          ? applyLocalAssets(item.section, normalized)
          : normalized;
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
