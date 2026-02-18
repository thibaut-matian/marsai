import { useState } from 'react';
import axios from 'axios';

export const useEmailSend = () => {
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e, recipientEmail, movieTitle, callback) => {
        e.preventDefault();
        setLoading(true);

        // Extraction des données du formulaire (Sujet et Message)
        const formData = new FormData(e.target);
        const subject = formData.get('subject');
        const message = formData.get('message');

        try {
            const response = await axios.post("http://localhost:3000/api/admin/send-email", {
                to: recipientEmail,
                subject: subject,
                message: message
            });

            if (response.data.success) {
                alert("🚀 Email envoyé avec succès !");
                if (callback) callback(); // Pour fermer la modale par exemple
            }
        } catch (err) {
            console.error("Erreur envoi mail:", err);
            alert("❌ Une erreur est survenue lors de l'envoi.");
        } finally {
            setLoading(false);
        }
    };

    return { sendEmail, loading };
};