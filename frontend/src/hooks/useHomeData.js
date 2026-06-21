import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getAPI from '../services/getAPI';

import imgAdele from '../assets/img/adele.jpg';
import imgDepp from '../assets/img/depp.jpg';
import imgJenna from '../assets/img/jenna.jpg';
import imgMalik from '../assets/img/malik.jpg';
import imgReeve from '../assets/img/reeve.jpg';
import imgRihanna from '../assets/img/rihanna.jpg';
import imgEtchebest from '../assets/img/test-etchebest.jpg';
import teaserVideo from '../assets/videos/Teaser.mp4';

const USE_LOCAL_ASSETS = import.meta.env.VITE_USE_LOCAL_ASSETS === 'true';

const JURY_IMAGE_MAP = {
  'adèle exarchopoulos': imgAdele,
  'adele exarchopoulos': imgAdele,
  'johnny depp': imgDepp,
  'jenna ortega': imgJenna,
  'malik bentalha': imgMalik,
  'keanu reeves': imgReeve,
  'rihanna': imgRihanna,
  'philippe etchebest': imgEtchebest,
};

const applyLocalAssets = (section, content) => {
  if (!content) return content;
  if (section === 'hero') {
    return { ...content, videoUrl: teaserVideo };
  }
  if (section === 'jury' && Array.isArray(content.members)) {
    return {
      ...content,
      members: content.members.map((member) => ({
        ...member,
        image: JURY_IMAGE_MAP[member.name?.toLowerCase()] ?? member.image,
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
