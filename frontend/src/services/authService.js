import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('Response from login API:', response, response.data);

    const role = response.data.role;

    if (!role) {
      throw new Error('Rôle non fourni par le serveur');
    }

    // Stocker le rôle dans localStorage
    localStorage.setItem('userRole', role);

    console.log('Login role:', role);

    return { success: true, role };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
  }

};