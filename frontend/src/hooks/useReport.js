import { useState } from "react";

export default function useReport() {
    const INITIAL_DATA = [
        { id: 1, titre: "Gameplay Call of Duty", auteur: "GamerPro99", email: "gamerpro@mail.com", raison: "Contenu violent", timestamp: "Il y a 2h" },
        { id: 2, titre: "Comment hacker un compte", auteur: "MrRobot", email: "fsociety@protonmail.com", raison: "Activités illégales", timestamp: "Il y a 5h" },
        { id: 3, titre: "Musique sans droits", auteur: "DJ_Vibe", email: "vibe@studio.fr", raison: "Droits d'auteur", timestamp: "Hier" },
    ];

    const [reports, setReports] = useState(INITIAL_DATA);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleDelete = (id, titre) => {
        if (window.confirm(`Confirmez-vous la suppression de la vidéo : ${titre} ?`)) {
            setReports(reports.filter(report => report.id !== id));
        }
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        alert(`Email de notification envoyé à ${selectedReport.email}`);
        setSelectedReport(null);
    };

    return { reports, handleDelete, handleSendEmail, selectedReport, setSelectedReport };
}