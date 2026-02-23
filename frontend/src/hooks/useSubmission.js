import { useState } from "react";

export function useSubmission() {
  // --- 1. STATE (Les données) ---
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    filmUrl: "", // Toujours envoyé, même vide
    needsSubtitles: false,
    subtitleFile: null, // Toujours envoyé, même vide
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

  // Pour les inputs classiques (texte, select, checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Pour les fichiers uniques (Vidéo, SRT, Vignette)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Pour la galerie (Multiple images)
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

  // Pour les boutons custom (Civilité, IA Classification)
  const setCustomValue = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  // --- 3. GESTION DE L'ÉQUIPE (Ajout/Suppression dynamique) ---

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

  // --- 4. VALIDATION (Règles métier) ---

  const isAdult = (dateString) => {
    if (!dateString) return false;
    const birth = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 18;
  };

  // Vérifie si la chaîne ne contient que des chiffres
  const onlyDigits = (str) => /^\d+$/.test(str);

  const validateStep = (currentStep) => {
    let newErrors = {};
    let isValid = true;

    // ÉTAPE 1 : Identité
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

    // ÉTAPE 2 : Contact
    if (currentStep === 2) {
      if (!formData.email.trim()) newErrors.email = "Email requis.";
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile requis.";
      if (!formData.address.trim()) newErrors.address = "Adresse requise.";
      if (!formData.zipcode.trim()) newErrors.zipcode = "Code Postal requis.";
      if (!formData.city.trim()) newErrors.city = "Ville requise.";
      if (!formData.country.trim()) newErrors.country = "Pays requis.";
      if (!formData.marketingSource)
        newErrors.marketingSource = "Source requise.";
      // Validation chiffres uniquement
      if (formData.zipcode && !onlyDigits(formData.zipcode))
        newErrors.zipcode = "Code Postal : chiffres uniquement.";
      if (formData.mobile && !onlyDigits(formData.mobile))
        newErrors.mobile = "Mobile : chiffres uniquement.";
      if (
        formData.telephone &&
        formData.telephone.length > 0 &&
        !onlyDigits(formData.telephone)
      )
        newErrors.telephone = "Téléphone : chiffres uniquement.";
      if (formData.mobile && formData.mobile.length > 13)
        newErrors.mobile = "Mobile : 13 chiffres max.";
      if (formData.telephone && formData.telephone.length > 13)
        newErrors.telephone = "Téléphone : 13 chiffres max.";
    }

    // ÉTAPE 3 : Assets & Tech
    if (currentStep === 3) {
      if (!formData.videoFile) newErrors.videoFile = "Fichier vidéo requis.";
      if (formData.needsSubtitles && !formData.subtitleFile) {
        newErrors.subtitleFile = "Fichier .srt requis.";
      }
      if (!formData.thumbnailFile)
        newErrors.thumbnailFile = "Vignette requise.";
      if (!formData.filmTitleOriginal.trim())
        newErrors.filmTitleOriginal = "Titre requis.";
      if (!formData.filmDuration) newErrors.filmDuration = "Durée requise.";
      if (!formData.aiClassification)
        newErrors.aiClassification = "Classification IA requise.";
      // Validation chiffres uniquement
      if (formData.filmDuration && !onlyDigits(formData.filmDuration))
        newErrors.filmDuration = "Durée : chiffres uniquement.";
      // YouTube et sous-titres : toujours envoyés (déjà gérés par défaut)
    }

    // ÉTAPE 4 : Synopsis
    if (currentStep === 4) {
      if (!formData.synopsisFR.trim())
        newErrors.synopsisFR = "Synopsis FR requis.";
      if (!formData.synopsisEN.trim())
        newErrors.synopsisEN = "Synopsis EN requis.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return isValid;
  };

  // --- 5. NAVIGATION ---

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 4) {
        setIsSubmitted(true);
      } else {
        setStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // --- 6. ENVOI DES DONNÉES ---

  const submitForm = async () => {
    // Préparation des données
    const dataToSubmit = {
      ...formData,
      step,
      videoFile: formData.videoFile ? formData.videoFile.name : null,
      subtitleFile: formData.subtitleFile ? formData.subtitleFile.name : null,
      thumbnailFile: formData.thumbnailFile
        ? formData.thumbnailFile.name
        : null,
      stillsFiles: formData.stillsFiles.map((file) => file.name),
    };

    // Envoi des données
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi des données.");

      const result = await response.json();
      console.log("Succès :", result);
      return result;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  };

  return {
    step,
    errors,
    isSubmitted,
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
    submitForm,
  };
}
