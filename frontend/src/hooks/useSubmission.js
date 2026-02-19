import { useState } from 'react';
import axios from 'axios';

export const useSubmission = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Identité
    civilite: '', // ✅ Ajouté
    gender: '', // Conversion : civilite → gender
    firstname: '',
    lastname: '',
    birthdate: '',
    profession: '', // ✅ Ajouté (équivalent actual_job)
    
    // Step 2: Contact
    email: '', // ✅ Changé de mail → email
    mail: '', // Gardé pour l'API
    telephone: '', // ✅ Ajouté (équivalent phone)
    phone: '',
    mobile: '',
    address: '', // ✅ Ajouté (équivalent street)
    street: '',
    zipcode: '', // ✅ Ajouté (équivalent zip_code)
    zip_code: '',
    city: '',
    country: '',
    
    // Réseaux sociaux
    socialYoutube: '',
    socialInstagram: '',
    socialLinkedin: '',
    socialFacebook: '',
    socialX: '',
    
    // Marketing
    marketingSource: '', // ✅ Ajouté (équivalent known_at)
    known_at: '',
    newsletter: false, // ✅ Ajouté
    
    // Step 3: Assets
    video: null,
    videoFile: null, // ✅ Ajouté
    filmUrl: '', // ✅ Ajouté (URL YouTube)
    poster: null,
    thumbnailFile: null, // ✅ Ajouté
    subtitle: null,
    subtitleFile: null, // ✅ Ajouté
    needsSubtitles: false, // ✅ Ajouté
    stillsFiles: [], // ✅ Ajouté (galerie)
    duration: '',
    filmDuration: '', // ✅ Ajouté
    
    // Classification IA
    aiClassification: '', // ✅ Ajouté
    aiStack: '', // ✅ Ajouté (ia_used)
    ia_used: '',
    aiMethodology: '', // ✅ Ajouté (creative_method)
    creative_method: '',
    
    // Step 4: Détails du film
    filmTitleOriginal: '', // ✅ Ajouté (vo_title)
    language: '',
    vo_title: '',
    en_title: '',
    synopsisFR: '', // ✅ Ajouté (vo_desc)
    vo_desc: '',
    synopsisEN: '', // ✅ Ajouté (en_desc)
    en_desc: '',
    bio: '',
    prod_type: '1',
    
    // Team
    team: [],
    teamMembers: [] // ✅ Ajouté
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setCustomValue = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      
      // Mapper aussi vers les noms de l'API
      if (name === 'videoFile') {
        setFormData(prev => ({ ...prev, video: files[0] }));
      }
      if (name === 'thumbnailFile') {
        setFormData(prev => ({ ...prev, poster: files[0] }));
      }
      if (name === 'subtitleFile') {
        setFormData(prev => ({ ...prev, subtitle: files[0] }));
      }
      
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleStillsChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setFormData(prev => ({ ...prev, stillsFiles: files }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { 
        civilite: 'M',
        firstname: '', 
        lastname: '',
        role: '',
        email: ''
      }]
    }));
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const updateTeamMember = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.civilite) newErrors.civilite = 'Civilité requise';
      if (!formData.firstname || formData.firstname.trim() === '') {
        newErrors.firstname = 'Prénom requis';
      }
      if (!formData.lastname || formData.lastname.trim() === '') {
        newErrors.lastname = 'Nom requis';
      }
      if (!formData.birthdate) {
        newErrors.birthdate = 'Date de naissance requise';
      } else {
        const birthDate = new Date(formData.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          newErrors.birthdate = 'Vous devez avoir au moins 18 ans';
        }
      }
      if (!formData.profession || formData.profession.trim() === '') {
        newErrors.profession = 'Profession requise';
      }
    }

    if (step === 2) {
      if (!formData.email || formData.email.trim() === '') {
        newErrors.email = 'Email requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.mobile || formData.mobile.trim() === '') {
        newErrors.mobile = 'Mobile requis';
      }
      if (!formData.address || formData.address.trim() === '') {
        newErrors.address = 'Adresse requise';
      }
      if (!formData.zipcode || formData.zipcode.trim() === '') {
        newErrors.zipcode = 'Code postal requis';
      }
      if (!formData.city || formData.city.trim() === '') {
        newErrors.city = 'Ville requise';
      }
      if (!formData.country || formData.country.trim() === '') {
        newErrors.country = 'Pays requis';
      }
      if (!formData.marketingSource) {
        newErrors.marketingSource = 'Source requise';
      }
    }

    if (step === 3) {
      if (!formData.videoFile) {
        newErrors.videoFile = 'Vidéo requise';
      }
      if (!formData.filmUrl || formData.filmUrl.trim() === '') {
        newErrors.filmUrl = 'URL YouTube requise';
      }
      if (!formData.thumbnailFile) {
        newErrors.thumbnailFile = 'Vignette requise';
      }
      if (!formData.filmDuration || formData.filmDuration === '') {
        newErrors.filmDuration = 'Durée requise';
      } else if (parseInt(formData.filmDuration) > 60) {
        newErrors.filmDuration = 'Durée maximale : 60 secondes';
      }
      if (formData.needsSubtitles && !formData.subtitleFile) {
        newErrors.subtitleFile = 'Sous-titre requis si voix présente';
      }
      if (!formData.aiClassification) {
        newErrors.aiClassification = 'Classification IA requise';
      }
      if (!formData.filmTitleOriginal || formData.filmTitleOriginal.trim() === '') {
        newErrors.filmTitleOriginal = 'Titre original requis';
      }
    }

    if (step === 4) {
      if (!formData.synopsisFR || formData.synopsisFR.trim() === '') {
        newErrors.synopsisFR = 'Synopsis FR requis';
      } else if (formData.synopsisFR.length > 300) {
        newErrors.synopsisFR = 'Maximum 300 caractères';
      }
      if (!formData.synopsisEN || formData.synopsisEN.trim() === '') {
        newErrors.synopsisEN = 'Synopsis EN requis';
      } else if (formData.synopsisEN.length > 300) {
        newErrors.synopsisEN = 'Maximum 300 caractères';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      console.log('❌ Validation échouée:', errors);
      return;
    }

    if (step < 4) {
      console.log('✅ Étape', step, 'validée');
      setStep(prev => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const submitData = new FormData();

      // Mapper les champs frontend vers backend
      submitData.append('mail', formData.email);
      submitData.append('gender', formData.civilite === 'M' ? 'male' : formData.civilite === 'Mme' ? 'female' : 'other');
      submitData.append('lastname', formData.lastname);
      submitData.append('firstname', formData.firstname);
      submitData.append('birthdate', formData.birthdate);
      submitData.append('bio', formData.bio || 'N/A');
      submitData.append('country', formData.country);
      submitData.append('city', formData.city);
      submitData.append('zip_code', formData.zipcode);
      submitData.append('street', formData.address);
      submitData.append('phone', formData.telephone || 'N/A');
      submitData.append('mobile', formData.mobile);
      submitData.append('actual_job', formData.profession);
      submitData.append('known_at', formData.marketingSource);
      submitData.append('duration', formData.filmDuration);
      submitData.append('prod_type', formData.prod_type);
      submitData.append('language', formData.language || 'FR');
      submitData.append('vo_title', formData.filmTitleOriginal);
      submitData.append('en_title', formData.filmTitleOriginal); // À adapter si titre EN différent
      submitData.append('vo_desc', formData.synopsisFR);
      submitData.append('en_desc', formData.synopsisEN);
      submitData.append('ia_used', formData.aiStack || 'N/A');
      submitData.append('creative_method', formData.aiMethodology || 'N/A');

      // Fichiers
      if (formData.videoFile) submitData.append('video', formData.videoFile);
      if (formData.thumbnailFile) submitData.append('poster', formData.thumbnailFile);
      if (formData.subtitleFile) submitData.append('subtitle', formData.subtitleFile);

      const response = await axios.post(
        'http://localhost:3000/api/movies',
        submitData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`📤 Upload: ${percentCompleted}%`);
          }
        }
      );

      console.log('✅ Réponse API:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('movieToken', response.data.token);
        console.log('🔑 Token JWT:', response.data.token);
      }

      setIsSubmitted(true);
      setIsLoading(false);

    } catch (error) {
      console.error('❌ Erreur soumission:', error);
      setIsLoading(false);
      
      if (error.response) {
        alert(error.response.data.message || 'Erreur lors de la soumission');
      } else {
        alert('Erreur réseau. Vérifiez que le backend est lancé.');
      }
    }
  };

  return {
    step,
    formData,
    errors,
    isSubmitted,
    isLoading,
    handleChange,
    handleFileChange,
    handleStillsChange,
    setCustomValue,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    handleNext,
    handlePrev
  };
};
