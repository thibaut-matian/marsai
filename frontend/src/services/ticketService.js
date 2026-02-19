import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets";

export const ticketService = {
  // Récupérer les types de billets avec places restantes
  getTypes: async () => {
    const response = await axios.get(`${API_URL}/types`);
    return response.data.data;
  },

  // Réserver un billet
  reserve: async ({ ticket_type_id, email, firstname, lastname }) => {
    const response = await axios.post(API_URL, {
      ticket_type_id,
      email,
      firstname,
      lastname,
    });
    return response.data;
  },
};
