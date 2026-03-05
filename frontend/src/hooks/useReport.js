import { useState, useEffect } from "react";
import getAPI from "../services/getAPI.jsx";
import { useEmailSend } from "./useEmailSend";

export default function useReport() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { sendEmail } = useEmailSend();
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailMovie, setDetailMovie] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleOpenModal = (movie) => {
  setSelectedReport(movie); 
  setIsModalOpen(true);
};

    const handleOpenDetail = (movie) => {
      setDetailMovie(movie);
      setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
      setIsDetailOpen(false);
      setDetailMovie(null);
    };

    // Charger les vrais signalements depuis le backend
    const fetchReports = async () => {
    try {
        setLoading(true);
        
        // UTILISE TON SERVICE getAPI (C'est lui qui gère le token et l'URL de base)
        const response = await getAPI.AllMoviesReports();
        
        console.log("Données reçues de l'API :", response.data);

        // On s'adapte à la structure renvoyée par ton controller
        // Si ton controller renvoie { success: true, data: [...] }
        const data = response.data?.data || response.data || [];
        
        setReports(data); 
    } catch (err) {
        console.error("Erreur dans fetchReports:", err);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchReports();
    }, []);

   const handleDelete = async (reportId, movieId, titre) => {
  if (window.confirm(`ATTENTION : Vous allez supprimer DEFINITIVEMENT le film "${titre}" et ses fichiers Scaleway. Confirmer ?`)) {
    console.log(`Suppression du film ID ${movieId} et du signalement ID ${reportId}`);
    try {
      // 1. On appelle la fonction de MovieController (via ton service existant)
      await getAPI.deleteMovie(movieId);
      
      setReports(prev => prev.filter(r => r.id !== reportId));
      
      alert("Le film et ses données ont été supprimés avec succès.");
    } catch (err) {
      console.error("Erreur lors de la suppression complète:", err);
      alert("Erreur lors de la suppression (voir console pour plus de détails).");
    }
  }
};

const handleSendEmail = async (e) => {
    e.preventDefault();
    
    // DEBUG : Vérifie si les données existent avant l'envoi
    console.log("Destinataire:", selectedReport?.email);
    console.log("Sujet extrait du form:", new FormData(e.target).get('subject'));

    if (!selectedReport?.email) {
        alert("Erreur : L'email du destinataire est manquant.");
        return;
    }

    await sendEmail(
        e,
        selectedReport.email,
        selectedReport.title,
        selectedReport.director,
        () => setSelectedReport(null)
    );
};

    return { 
        reports, 
        loading,
        handleDelete,
        handleSendEmail,
        selectedReport, 
        setSelectedReport,
        handleOpenModal,
        handleOpenDetail,
        handleCloseDetail,
        refreshReports: fetchReports // Pour recharger si besoin
    };
}