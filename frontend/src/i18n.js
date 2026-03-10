import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frCommon from "./locales/fr/common.json";
import enCommon from "./locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      // On utilise 'translation' pour que t('form.xxx') fonctionne partout
      translation: frCommon,
    },
    en: {
      translation: enCommon,
    },
  },
  // On récupère la langue stockée ou on met 'fr' par défaut
  lng: localStorage.getItem("lang") || "fr",
  fallbackLng: "fr",

  interpolation: {
    escapeValue: false, // React gère déjà la protection XSS
  },
});

// On écoute le changement de langue pour le sauvegarder dans le navigateur
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
