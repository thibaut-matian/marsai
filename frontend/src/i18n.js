import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frCommon from './locales/fr/common.json';
import enCommon from './locales/en/common.json';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frCommon },
    en: { translation: enCommon }
  },
  lng: localStorage.getItem('lang') || 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false }
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng);
});

export default i18n;
