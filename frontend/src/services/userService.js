import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const userService = {
  // Récupérer tous les users (filtrable par rôle : "jury", "admin", "super_admin")
  getAll: async (role = "jury") => {
    const response = await axios.get(
      `${API_URL}/users?role=${role}`,
      getAuthHeader(),
    );
    return response.data.data;
  },

  // Créer un nouveau compte (super_admin uniquement)
  create: async (userData) => {
    const response = await axios.post(
      `${API_URL}/users`,
      userData,
      getAuthHeader(),
    );
    return response.data;
  },

  // Modifier un compte
  update: async (id, userData) => {
    const response = await axios.put(
      `${API_URL}/users/${id}`,
      userData,
      getAuthHeader(),
    );
    return response.data;
  },

  // Supprimer un compte
  delete: async (id) => {
    const response = await axios.delete(
      `${API_URL}/users/${id}`,
      getAuthHeader(),
    );
    return response.data;
  },

  // Récupérer les rôles disponibles
  getRoles: async () => {
    const response = await axios.get(`${API_URL}/roles`, getAuthHeader());
    return response.data.data;
  },
};
