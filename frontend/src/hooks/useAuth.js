import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export const useAuth = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      const { role } = await login(email, password);

      console.log("Rôle reçu du service de login:", role); // Debug : vérifier le rôle reçu

      // Redirection en fonction du rôle
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'jury') {
        navigate('/jury/dashboard');
      } else {
        throw new Error('Rôle non reconnu');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, error, isLoading };
};