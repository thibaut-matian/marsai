import { useState } from "react";
import getAPI from "../services/getAPI";

export function useSubmission(t) {
  // --- 1. STATE (Les données) ---
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    civilite: "M",
    lastname: "",
    firstname: "",
    birthdate: "",
    profession: "",
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
    videoFile: null,
    filmUrl: "",
    needsSubtitles: false,
    subtitleFile: null,
    thumbnailFile: null,
    stillsFiles: [],
    filmTitleOriginal: "",
    filmTitleEN: "",
    filmDuration: "",
    filmLanguage: "FR",
    aiClassification: "",
    aiStack: "",
    aiMethodology: "",
    synopsisFR: "",
    synopsisEN: "",
    directorNoteFR: "",
    directorNoteEN: "",
    teamMembers: [],
  });

  // --- 2. HANDLERS ---

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
      if (!formData.marketingSource)
        newErrors.marketingSource = "Source requise.";
      if (formData.zipcode && !onlyDigits(formData.zipcode))
        newErrors.zipcode = "Code Postal : chiffres uniquement.";
      if (formData.mobile && !onlyDigits(formData.mobile))
        newErrors.mobile = "Mobile : chiffres uniquement.";
    }
    if (currentStep === 3) {
      if (!formData.videoFile) newErrors.videoFile = t("form.errors.videoFile");
      if (formData.needsSubtitles && !formData.subtitleFile)
        newErrors.subtitleFile = t("form.errors.subtitleFile");
      if (!formData.thumbnailFile)
        newErrors.thumbnailFile = t("form.errors.thumbnailFile");
      if (!formData.filmTitleOriginal.trim())
        newErrors.filmTitleOriginal = t("form.errors.filmTitleOriginal");
      if (!formData.filmDuration)
        newErrors.filmDuration = t("form.errors.filmDuration");
      if (!formData.aiClassification)
        newErrors.aiClassification = t("form.errors.aiClassification");
    }
    if (currentStep === 4) {
      if (!formData.synopsisFR.trim())
        newErrors.synopsisFR = "Synopsis FR requis.";
      if (!formData.synopsisEN.trim())
        newErrors.synopsisEN = "Synopsis EN requis.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // --- 5. NAVIGATION ---

  const handleNext = async () => {
    // Validation stricte à l'étape 4 avant submitForm
    if (step === 4) {
      // Validation globale de tous les champs requis
      let globalErrors = {};
      if (!formData.lastname.trim()) globalErrors.lastname = "Nom requis.";
      if (!formData.firstname.trim()) globalErrors.firstname = "Prénom requis.";
      if (!formData.profession.trim())
        globalErrors.profession = "Métier requis.";
      if (!formData.birthdate) globalErrors.birthdate = "Date requise.";
      if (!formData.email.trim()) globalErrors.email = "Email requis.";
      if (!formData.mobile.trim()) globalErrors.mobile = "Mobile requis.";
      if (!formData.address.trim()) globalErrors.address = "Adresse requise.";
      if (!formData.zipcode.trim())
        globalErrors.zipcode = "Code Postal requis.";
      if (!formData.city.trim()) globalErrors.city = "Ville requise.";
      if (!formData.country.trim()) globalErrors.country = "Pays requis.";
      if (!formData.marketingSource)
        globalErrors.marketingSource = "Source requise.";
      if (!formData.videoFile)
        globalErrors.videoFile = t("form.errors.videoFile");
      if (formData.needsSubtitles && !formData.subtitleFile)
        globalErrors.subtitleFile = t("form.errors.subtitleFile");
      if (!formData.thumbnailFile)
        globalErrors.thumbnailFile = t("form.errors.thumbnailFile");
      if (!formData.filmTitleOriginal.trim())
        globalErrors.filmTitleOriginal = t("form.errors.filmTitleOriginal");
      if (!formData.filmDuration)
        globalErrors.filmDuration = t("form.errors.filmDuration");
      if (!formData.aiClassification)
        globalErrors.aiClassification = t("form.errors.aiClassification");
      if (!formData.synopsisFR.trim())
        globalErrors.synopsisFR = "Synopsis FR requis.";
      if (!formData.synopsisEN.trim())
        globalErrors.synopsisEN = "Synopsis EN requis.";
      if (Object.keys(globalErrors).length > 0) {
        setErrors(globalErrors);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    if (validateStep(step)) {
      if (step === 4) {
        setIsLoading(true);
        try {
          await submitForm();
          setIsSubmitted(true);
        } catch (error) {
          alert("Erreur lors de l'envoi. Vérifiez la console.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  // --- 6. ENVOI DES DONNÉES ---

  const submitForm = async () => {
    const form = new FormData();

    // Fichiers
    if (formData.videoFile) form.append("video", formData.videoFile);
    if (formData.thumbnailFile) form.append("poster", formData.thumbnailFile);
    if (formData.subtitleFile) form.append("subtitle", formData.subtitleFile);

    // Identité & Genre
    let genderValue = "other";
    if (formData.civilite === "M") genderValue = "m.";
    else if (formData.civilite === "Mme") genderValue = "mrs.";
    form.append("gender", genderValue);

    // Champs texte
    form.append("mail", formData.email || "");
    form.append("lastname", formData.lastname || "");
    form.append("firstname", formData.firstname || "");
    form.append("birthdate", formData.birthdate || "");
    form.append("bio", formData.directorNoteFR || "N/A");
    form.append("country", formData.country || "");
    form.append("city", formData.city || "");
    form.append("zip_code", formData.zipcode || "");
    form.append("street", formData.address || "");
    form.append("phone", formData.telephone || "");
    form.append("mobile", formData.mobile || "");
    form.append("actual_job", formData.profession || "");
    form.append("known_at", formData.marketingSource || "");
    form.append("duration", formData.filmDuration || "30");
    form.append("prod_type", "1");
    form.append("language", formData.filmLanguage || "FR");
    form.append("vo_title", formData.filmTitleOriginal || "");
    form.append(
      "en_title",
      formData.filmTitleEN || formData.filmTitleOriginal || "",
    );
    form.append("vo_desc", formData.synopsisFR || "");
    form.append("en_desc", formData.synopsisEN || formData.synopsisFR || "");
    form.append("ia_used", formData.aiClassification || "N/A");
    form.append("creative_method", formData.aiMethodology || "N/A");

    // ✅ AJOUTER : Équipe en format JSON
    if (formData.teamMembers && formData.teamMembers.length > 0) {
      form.append("team_members", JSON.stringify(formData.teamMembers));
      console.log("📋 Équipe envoyée:", formData.teamMembers);
    }

    try {
      // Utilisation du service centralisé getAPI
      const response = await getAPI.submitMovie(form);
      return response.data;
    } catch (error) {
      console.error("💥 [FRONTEND] Exception:", error);
      throw error;
    }
  };

  return {
    step,
    errors,
    isSubmitted,
    isLoading,
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
