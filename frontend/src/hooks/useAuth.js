import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getAPI from "../services/getAPI";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getAPI.login({ email, password });
      const { token, user } = response.data;

      if (!user?.role) {
        throw new Error("Rôle non fourni par le serveur");
      }

      // Stocker le token et les infos utilisateur dans localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role;

      console.log("Rôle reçu du service de login:", role); // Debug : vérifier le rôle reçu

      // Redirection en fonction du rôle
      if (role === "super_admin" || role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "jury") {
        navigate("/jury/DashboardJury");
      } else {
        throw new Error("Rôle non reconnu");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, error, isLoading };
};
