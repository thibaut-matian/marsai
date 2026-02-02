import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

export const useJuryForm = (jury, onSuccess) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mail: '',
    mobile: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Pré-remplir le formulaire si on modifie un jury existant
  useEffect(() => {
    if (jury) {
      setFormData({
        firstname: jury.firstname || '',
        lastname: jury.lastname || '',
        mail: jury.mail || '',
        mobile: jury.mobile || '',
      });
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        mail: '',
        mobile: '',
      });
    }
  }, [jury]);

  // Gérer les changements de champs
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Valider le formulaire
  const validate = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = 'Le prénom est requis';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Le nom est requis';
    }
    if (!formData.mail.trim()) {
      newErrors.mail = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      newErrors.mail = 'Email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (jury) {
        // Mise à jour
        await getAPI.updateJury(jury.id, formData);
      } else {
        // Création
        await getAPI.inviteJury(formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert(
        jury
          ? 'Erreur lors de la mise à jour du jury'
          : "Erreur lors de l'invitation du jury"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};