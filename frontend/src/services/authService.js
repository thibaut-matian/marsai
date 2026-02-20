import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, user } = response.data;

    if (!user?.role) {
      throw new Error("Rôle non fourni par le serveur");
    }

    // Stocker le token et les infos utilisateur dans localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, role: user.role };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erreur lors de la connexion",
    );
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
