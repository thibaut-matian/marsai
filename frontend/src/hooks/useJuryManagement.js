import { useState, useEffect, useCallback } from 'react';
import { juryService } from '../services/juryService';

export const useJuryManagement = () => {
  const [juryList, setJuryList] = useState([]);
  const [selectedJuryMember, setSelectedJuryMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer tous les jurys
  const fetchAllJuries = useCallback(async () => {
    try {
      setIsLoadingData(true);
      setError(null);
      const juryData = await juryService.getAll();
      setJuryList(juryData);
    } catch (err) {
      console.error('Erreur lors du chargement des jurys:', err);
      setError('Impossible de charger les jurys');
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Charger les jurys au montage du composant
  useEffect(() => {
    fetchAllJuries();
  }, [fetchAllJuries]);

  // Ouvrir la modal avec un jury sélectionné
  const openJuryModal = useCallback((juryMember) => {
    setSelectedJuryMember(juryMember);
    setIsModalOpen(true);
  }, []);

  // Fermer la modal
  const closeJuryModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedJuryMember(null);
  }, []);

  // Ouvrir la modal pour inviter un nouveau jury
  const openInviteModal = useCallback(() => {
    setSelectedJuryMember(null);
    setIsModalOpen(true);
  }, []);

  // Mettre à jour un jury
  const updateJury = useCallback(async () => {
    await fetchAllJuries();
    closeJuryModal();
  }, [fetchAllJuries, closeJuryModal]);

  // Supprimer un jury
  const deleteJury = useCallback(async (juryId) => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer définitivement ce jury ?'
    );
    
    if (confirmDelete) {
      try {
        await juryService.delete(juryId);
        await fetchAllJuries();
        closeJuryModal();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        alert('Erreur lors de la suppression du jury');
      }
    }
  }, [fetchAllJuries, closeJuryModal]);

  // Désactiver un jury
  const deactivateJury = useCallback(async (juryId) => {
    const confirmDeactivate = window.confirm(
      'Voulez-vous désactiver ce jury ? Il ne sera plus visible pendant le festival.'
    );
    
    if (confirmDeactivate) {
      try {
        await juryService.deactivate(juryId);
        await fetchAllJuries();
        closeJuryModal();
      } catch (err) {
        console.error('Erreur lors de la désactivation:', err);
        alert('Erreur lors de la désactivation du jury');
      }
    }
  }, [fetchAllJuries, closeJuryModal]);

  // Réactiver un jury
  const reactivateJury = useCallback(async (juryId) => {
    try {
      await juryService.reactivate(juryId);
      await fetchAllJuries();
      closeJuryModal();
    } catch (err) {
      console.error('Erreur lors de la réactivation:', err);
      alert('Erreur lors de la réactivation du jury');
    }
  }, [fetchAllJuries, closeJuryModal]);

  return {
    // State
    juryList,
    selectedJuryMember,
    isModalOpen,
    isLoadingData,
    error,
    
    // Actions
    openJuryModal,
    closeJuryModal,
    openInviteModal,
    updateJury,
    deleteJury,
    deactivateJury,
    reactivateJury,
    refreshJuries: fetchAllJuries,
  };
};