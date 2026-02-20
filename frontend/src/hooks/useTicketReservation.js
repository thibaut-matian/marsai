import { useState, useEffect } from "react";
import { ticketService } from "../services/ticketService";

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
        const types = await ticketService.getTypes();
        setTicketTypes(types);
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
      const result = await ticketService.reserve(form);
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
