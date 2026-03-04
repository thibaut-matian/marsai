import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/home-content';

export function useHomeContent() {
  const [content, setContent] = useState({
    hero: { 
      fr: { videoUrl: '', buttonText: '', buttonEnabled: true }, 
      en: { videoUrl: '', buttonText: '', buttonEnabled: true } 
    },
    about: { 
      fr: { title: '', paragraph1: '', paragraph2: '' }, 
      en: { title: '', paragraph1: '', paragraph2: '' } 
    },
    criteria: { 
      fr: { title: '', items: [] }, 
      en: { title: '', items: [] } 
    },
    rewards: { 
      fr: { title: '', items: [] }, 
      en: { title: '', items: [] } 
    },
    jury: { 
      fr: { title: '', description: '', members: [] }, 
      en: { title: '', description: '', members: [] } 
    },
    contact: { 
      fr: { title: '', phone: '', email: '', address: '', mapUrl: '' }, 
      en: { title: '', phone: '', email: '', address: '', mapUrl: '' } 
    },
    timeline: { 
      fr: { title: '', phases: [] }, 
      en: { title: '', phases: [] } 
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadContent();
  }, []);

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
      
      const transformedContent = {};
      response.data.data.forEach(item => {
        const contentFr = normalizeCamelCase(item.content_fr);
        const contentEn = normalizeCamelCase(item.content_en);

        transformedContent[item.section] = {
          fr: contentFr,
          en: contentEn
        };
      });
      
      setContent(transformedContent);
      setMessage({ type: '', text: '' });
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erreur lors du chargement du contenu. Vérifiez que le backend est démarré.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (section, lang, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: {
          ...prev[section][lang],
          [field]: value
        }
      }
    }));
  };

  const updateArrayItem = (section, lang, index, value) => {
    setContent(prev => {
      const arrayField = section === 'timeline' ? 'phases' : 'items';
      const newList = [...(prev[section][lang][arrayField] || [])];
      newList[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [lang]: {
            ...prev[section][lang],
            [arrayField]: newList
          }
        }
      };
    });
  };

  const addArrayItem = (section, lang) => {
    setContent(prev => {
      const arrayField = section === 'timeline' ? 'phases' : 'items';
      let newItem;
      
      if (section === 'timeline') {
        // Pour timeline, créer un objet phase complet
        newItem = {
          key: '',
          label: '',
          startDate: '',
          endDate: '',
          description: ''
        };
      } else {
        newItem = '';
      }
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [lang]: {
            ...prev[section][lang],
            [arrayField]: [...(prev[section][lang][arrayField] || []), newItem]
          }
        }
      };
    });
  };

  const removeArrayItem = (section, lang, index) => {
    setContent(prev => {
      const arrayField = section === 'timeline' ? 'phases' : 'items';
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [lang]: {
            ...prev[section][lang],
            [arrayField]: (prev[section][lang][arrayField] || []).filter((_, i) => i !== index)
          }
        }
      };
    });
  };

  const updateJuryMember = (lang, index, field, value) => {
    setContent(prev => {
      const newMembers = [...(prev.jury[lang].members || [])];
      newMembers[index] = {
        ...newMembers[index],
        [field]: value
      };
      return {
        ...prev,
        jury: {
          ...prev.jury,
          [lang]: {
            ...prev.jury[lang],
            members: newMembers
          }
        }
      };
    });
  };

  const addJuryMember = (lang) => {
    setContent(prev => ({
      ...prev,
      jury: {
        ...prev.jury,
        [lang]: {
          ...prev.jury[lang],
          members: [...(prev.jury[lang].members || []), { name: '', title: '', image: '' }]
        }
      }
    }));
  };

  const removeJuryMember = (lang, index) => {
    setContent(prev => ({
      ...prev,
      jury: {
        ...prev.jury,
        [lang]: {
          ...prev.jury[lang],
          members: (prev.jury[lang].members || []).filter((_, i) => i !== index)
        }
      }
    }));
  };

  const updateTimelinePhase = (lang, index, field, value) => {
    setContent(prev => {
      const newPhases = [...(prev.timeline[lang].phases || [])];
      newPhases[index] = {
        ...newPhases[index],
        [field]: value
      };
      return {
        ...prev,
        timeline: {
          ...prev.timeline,
          [lang]: {
            ...prev.timeline[lang],
            phases: newPhases
          }
        }
      };
    });
  };

  // Fonction pour convertir camelCase -> snake_case
  const toSnakeCase = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(item => toSnakeCase(item));
    }
    
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        acc[snakeKey] = toSnakeCase(obj[key]);
        return acc;
      }, {});
    }
    
    return obj;
  };

  const saveContent = async () => {
    try {
      setIsSaving(true);
      setMessage({ type: '', text: '' });

      const sectionsToUpdate = Object.keys(content).map(section => ({
        section,
        content_fr: toSnakeCase(content[section].fr),
        content_en: toSnakeCase(content[section].en)
      }));

      await axios.put(`${API_URL}/bulk-update`, { sections: sectionsToUpdate });

      setMessage({ 
        type: 'success', 
        text: '✅ Contenu sauvegardé avec succès !' 
      });

      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage({ 
        type: 'error', 
        text: '❌ Erreur lors de la sauvegarde. Réessayez.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    content,
    isLoading,
    isSaving,
    message,
    updateField,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    updateJuryMember,
    addJuryMember,
    removeJuryMember,
    updateTimelinePhase,
    saveContent,
  };
}
