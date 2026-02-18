import { useState } from 'react';
import axios from 'axios';

export const useEmailSend = () => {
    const [loading, setLoading] = useState(false);

    // now accept an optional director name as the fourth argument
    const sendEmail = async (e, recipientEmail, movieTitle, director, callback) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const subject = formData.get('subject');
        const message = formData.get('message');

        try {
            const payload = {
                to: recipientEmail,
                subject,
                message,
            };
            if (director) payload.director = director; // forward if provided

            const response = await axios.post("http://localhost:3000/api/admin/send-email", payload);

            if (response.data.success) {
                alert("🚀 Email envoyé avec succès !");
                if (callback) callback();
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