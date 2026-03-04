import { useState, useEffect } from "react";
import getAPI from "../services/getAPI.jsx";

export default function useReport() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);

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
    const confirmation = window.confirm(
        `ATTENTION : Vous allez supprimer DEFINITIVEMENT le film "${titre}", ainsi que toutes les notes et signalements associés. Confirmer ?`
    );
    if (confirmation) {
        try {
            await getAPI.hardDeleteMovie(movieId, reportId);            
            setReports(prev => prev.filter(r => r.id !== reportId));
            alert("Le film et ses données ont été supprimés.");
        } catch (err) {
            alert("Erreur lors de la suppression complète.");
        }
    }
};

    const handleSendEmail = (e) => {
        e.preventDefault();
        alert(`Email envoyé à : ${selectedReport.auteur}`);
        setSelectedReport(null);
    };

    return { 
        reports, 
        loading,
        handleDelete, 
        handleSendEmail, 
        selectedReport, 
        setSelectedReport,
        refreshReports: fetchReports // Pour recharger si besoin
    };
}