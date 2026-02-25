import { useState, useEffect } from 'react';
import axios from 'axios';

export function useSettings() {
  const [settings, setSettings] = useState({
    // Hero Section
    heroTitle: '',
    heroSubtitle: '',
    heroCTA: '',
    heroVideo: null,
    
    // About Section
    aboutTitle: '',
    aboutText1: '',
    aboutText2: '',
    
    // Criteria Section
    criteriaTitle: '',
    criteriaList: ['', '', '', '', ''],
    
    // Rewards Section
    rewardsTitle: '',
    rewardsList: ['', '', '', ''],
    
    // Jury Section
    juryTitle: '',
    juryDescription: '',
    
    // Contact Section
    contactTitle: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    contactCity: '',
    contactZipcode: '',
    contactMapUrl: '',
    
    // Festival Info
    festivalName: 'MARS AI FILM FESTIVAL',
    festivalYear: new Date().getFullYear(),
    festivalDateStart: '',
    festivalDateEnd: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Charger les paramètres
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/admin/settings');
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Erreur chargement settings:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement des paramètres' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayName, index, value) => {
    setSettings(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName) => {
    setSettings(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setSettings(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (field, file) => {
    setSettings(prev => ({ ...prev, [field]: file }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Ajouter tous les champs
      Object.keys(settings).forEach(key => {
        if (Array.isArray(settings[key])) {
          formData.append(key, JSON.stringify(settings[key]));
        } else if (settings[key] instanceof File) {
          formData.append(key, settings[key]);
        } else {
          formData.append(key, settings[key]);
        }
      });

      const response = await axios.put('/api/admin/settings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès !' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    settings,
    isLoading,
    isSaving,
    message,
    handleChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    handleFileChange,
    saveSettings,
  };
}