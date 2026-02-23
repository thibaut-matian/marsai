import { useState } from "react";

export function useSubmission() {
  // --- 1. STATE (Les données) ---
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ NOUVEAU
  const [submitError, setSubmitError] = useState(null); // ✅ NOUVEAU

  const [formData, setFormData] = useState({
    // IDENTITÉ
    civilite: "M",
    lastname: "",
    firstname: "",
    birthdate: "",
    profession: "",

    // CONTACT & RÉSEAUX
    email: "",
    telephone: "",
    mobile: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    socialYoutube: "",
    socialInstagram: "",
    socialLinkedin: "",
    socialFacebook: "",
    socialX: "",
    marketingSource: "",
    newsletter: false,

    // ASSETS FILM
    videoFile: null,
    filmUrl: "", // YouTube URL
    needsSubtitles: false,
    subtitleFile: null,
    thumbnailFile: null,
    stillsFiles: [],

    // INFO FILM
    filmTitleOriginal: "",
    filmTitleEN: "",
    filmDuration: "",
    filmLanguage: "FR",
    aiClassification: "",
    aiStack: "",
    aiMethodology: "",

    // DETAILS
    synopsisFR: "",
    synopsisEN: "",
    directorNoteFR: "",
    directorNoteEN: "",

    // ÉQUIPE (Dynamique)
    teamMembers: [],
  });

  // --- 2. FONCTIONS DE GESTION (Handlers) ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleStillsChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.stillsFiles.length > 3) {
      alert("Maximum 3 images pour la galerie.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      stillsFiles: [...prev.stillsFiles, ...files],
    }));
  };

  const setCustomValue = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  // --- 3. GESTION DE L'ÉQUIPE ---

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { role: "", civilite: "M", firstname: "", lastname: "", email: "" },
      ],
    }));
  };

  const removeTeamMember = (index) => {
    const newTeam = [...formData.teamMembers];
    newTeam.splice(index, 1);
    setFormData((prev) => ({ ...prev, teamMembers: newTeam }));
  };

  const updateTeamMember = (index, field, value) => {
    const newTeam = [...formData.teamMembers];
    newTeam[index][field] = value;
    setFormData((prev) => ({ ...prev, teamMembers: newTeam }));
  };

  // --- 4. VALIDATION ---

  const isAdult = (dateString) => {
    if (!dateString) return false;
    const birth = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 18;
  };

  const onlyDigits = (str) => /^\d+$/.test(str);

  const validateStep = (currentStep) => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.lastname.trim()) newErrors.lastname = "Nom requis.";
      if (!formData.firstname.trim()) newErrors.firstname = "Prénom requis.";
      if (!formData.profession.trim()) newErrors.profession = "Métier requis.";
      if (!formData.birthdate) {
        newErrors.birthdate = "Date requise.";
      } else if (!isAdult(formData.birthdate)) {
        newErrors.birthdate = "Vous devez être majeur.";
      }
    }

    if (currentStep === 2) {
      if (!formData.email.trim()) newErrors.email = "Email requis.";
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile requis.";
      if (!formData.address.trim()) newErrors.address = "Adresse requise.";
      if (!formData.zipcode.trim()) newErrors.zipcode = "Code Postal requis.";
      if (!formData.city.trim()) newErrors.city = "Ville requise.";
      if (!formData.country.trim()) newErrors.country = "Pays requis.";
      if (!formData.marketingSource) newErrors.marketingSource = "Source requise.";
      if (formData.zipcode && !onlyDigits(formData.zipcode))
        newErrors.zipcode = "Code Postal : chiffres uniquement.";
      if (formData.mobile && !onlyDigits(formData.mobile))
        newErrors.mobile = "Mobile : chiffres uniquement.";
      if (formData.telephone && formData.telephone.length > 0 && !onlyDigits(formData.telephone))
        newErrors.telephone = "Téléphone : chiffres uniquement.";
    }

    if (currentStep === 3) {
      if (!formData.videoFile) newErrors.videoFile = "Fichier vidéo requis.";
      if (!formData.filmUrl.trim()) newErrors.filmUrl = "Lien YouTube requis.";
      if (formData.needsSubtitles && !formData.subtitleFile) {
        newErrors.subtitleFile = "Fichier .srt requis.";
      }
      if (!formData.thumbnailFile) newErrors.thumbnailFile = "Vignette requise.";
      if (!formData.filmTitleOriginal.trim()) newErrors.filmTitleOriginal = "Titre requis.";
      if (!formData.filmDuration) newErrors.filmDuration = "Durée requise.";
      if (!formData.aiClassification) newErrors.aiClassification = "Classification IA requise.";
      if (formData.filmDuration && !onlyDigits(formData.filmDuration))
        newErrors.filmDuration = "Durée : chiffres uniquement.";
    }

    if (currentStep === 4) {
      if (!formData.synopsisFR.trim()) newErrors.synopsisFR = "Synopsis FR requis.";
      if (!formData.synopsisEN.trim()) newErrors.synopsisEN = "Synopsis EN requis.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return isValid;
  };

  // --- 5. ✅ NOUVELLE FONCTION : SOUMISSION AU BACKEND ---

  const submitToBackend = async () => {
    console.log('🚀 Préparation de l\'envoi au backend...');
    setIsLoading(true);
    setSubmitError(null);

    try {
      // Créer un FormData pour envoyer les fichiers
      const formDataToSend = new FormData();

      // Mapper les champs du frontend vers le backend
      formDataToSend.append('mail', formData.email);
      formDataToSend.append('gender', formData.civilite);
      formDataToSend.append('lastname', formData.lastname);
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('birthdate', formData.birthdate);
      formDataToSend.append('bio', formData.directorNoteFR || 'N/A');
      formDataToSend.append('country', formData.country);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('zip_code', formData.zipcode);
      formDataToSend.append('street', formData.address);
      formDataToSend.append('phone', formData.telephone || '');
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('actual_job', formData.profession);
      formDataToSend.append('known_at', formData.marketingSource);
      formDataToSend.append('duration', formData.filmDuration);
      formDataToSend.append('prod_type', 1); // Défaut
      formDataToSend.append('language', formData.filmLanguage);
      formDataToSend.append('vo_title', formData.filmTitleOriginal);
      formDataToSend.append('en_title', formData.filmTitleEN || formData.filmTitleOriginal);
      formDataToSend.append('vo_desc', formData.synopsisFR);
      formDataToSend.append('en_desc', formData.synopsisEN);
      formDataToSend.append('ia_used', formData.aiClassification);
      formDataToSend.append('creative_method', formData.aiStack || 'N/A');

      // ✅ FICHIERS
      if (formData.videoFile) {
        formDataToSend.append('video', formData.videoFile);
        console.log('📹 Vidéo ajoutée:', formData.videoFile.name);
      }

      if (formData.thumbnailFile) {
        formDataToSend.append('poster', formData.thumbnailFile);
        console.log('🖼️ Poster ajouté:', formData.thumbnailFile.name);
      }

      if (formData.subtitleFile) {
        formDataToSend.append('subtitle', formData.subtitleFile);
        console.log('📄 Sous-titre ajouté:', formData.subtitleFile.name);
      }

      // Afficher le contenu pour debug
      console.log('📦 FormData préparé, envoi vers backend...');
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`   ${key}: ${value.name} (${(value.size / 1024 / 1024).toFixed(2)} MB)`);
        } else {
          console.log(`   ${key}: ${value}`);
        }
      }

      // ✅ ENVOI VERS LE BACKEND
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      console.log('🌐 URL cible:', `${API_URL}/api/movies`);

      const response = await fetch(`${API_URL}/api/movies`, {
        method: 'POST',
        body: formDataToSend,
        // ⚠️ NE PAS METTRE Content-Type avec FormData !
      });

      console.log('📬 Réponse reçue:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur backend:', errorData);
        throw new Error(errorData.message || 'Erreur lors de la soumission');
      }

      const result = await response.json();
      console.log('✅ Succès:', result);

      setIsSubmitted(true);
      return result;

    } catch (error) {
      console.error('❌ Erreur soumission:', error);
      setSubmitError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // --- 6. NAVIGATION ---

  const handleNext = async () => {
    if (validateStep(step)) {
      if (step === 4) {
        // Dernière étape : soumettre au backend
        console.log('🎬 Étape finale, envoi au backend...');
        try {
          await submitToBackend();
        } catch (error) {
          console.error('Échec de la soumission:', error);
        }
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    step,
    errors,
    isSubmitted,
    isLoading, // ✅ NOUVEAU
    submitError, // ✅ NOUVEAU
    formData,
    handleChange,
    handleFileChange,
    handleStillsChange,
    setCustomValue,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    handleNext,
    handlePrev,
  };
}
