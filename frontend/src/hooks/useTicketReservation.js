import { useEffect, useState } from "react";
import getAPI from "../services/getAPI";

export const useTicketReservation = () => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null); // contient les données du billet réservé
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    ticket_type_id: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  // Charger les types de billets au montage
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await getAPI.getTicketTypes();
        setTicketTypes(response.data.data || response.data);
      } catch (err) {
        setError("Impossible de charger les billets disponibles.");
      } finally {
        setIsLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(null);

    try {
      const result = await getAPI.reserveTicket(form);
      setSuccess(result.data);
      setForm({ ticket_type_id: "", firstname: "", lastname: "", email: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la réservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ticketTypes,
    isLoadingTypes,
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    success,
    error,
  };
};
