import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getAPI from "../services/getAPI";

export const useAdminAuth = () => {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  /**
   * Gère le changement des champs du formulaire
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Efface l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Efface l'erreur serveur
    if (serverError) {
      setServerError("");
    }
  };

  /**
   * Valide le formulaire
   */
  const validateForm = () => {
    const newErrors = {};

    // Validation email
    if (!formData.mail) {
      newErrors.mail = "L\'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      newErrors.mail = "Format d\'email invalide";
    }

    // Validation password
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Connexion admin
   */
  const handleLogin = async (e) => {
    e?.preventDefault();

    // Validation du formulaire
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const response = await getAPI.login({
        mail: formData.mail,
        password: formData.password,
      });

      // ✅ Adapter à la nouvelle structure de réponse
      const { success, data } = response.data;

      if (!success || !data) {
        throw new Error("Réponse du serveur invalide");
      }

      // ✅ Extraire accessToken, refreshToken et user
      const { accessToken, refreshToken, user } = data;

      if (!user) {
        throw new Error("Données utilisateur manquantes");
      }

      // Vérifier que c'est bien un admin
      if (!["admin", "super_admin"].includes(user.Role?.name)) {
        throw new Error("Accès réservé aux administrateurs");
      }

      // ✅ Sauvegarder les tokens JWT
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.Role.name);
      localStorage.setItem("isAuthenticated", "true");

      console.log("✅ Connexion réussie:", user.firstname, user.lastname);

      // Redirection vers le dashboard admin
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("❌ Erreur de connexion:", err);

      const message = err.response?.data?.message || err.message || "Erreur de connexion";
      setServerError(message);

      // Mapper les erreurs serveur aux champs
      if (message.toLowerCase().includes("email") || message.toLowerCase().includes("mail")) {
        setErrors((prev) => ({
          ...prev,
          mail: message,
        }));
      } else if (message.toLowerCase().includes("mot de passe") || message.toLowerCase().includes("password")) {
        setErrors((prev) => ({
          ...prev,
          password: message,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Vérifier si l'utilisateur est déjà connecté
   */
  const checkAuth = async () => {
    try {
      // ✅ Utilisation de getAPI
      const response = await getAPI.checkAuth();
      return response.data.isAuthenticated;
    } catch (error) {
      console.error("Erreur checkAuth:", error);
      return false;
    }
  };

  /**
   * Déconnexion
   */
  const handleLogout = async () => {
    try {
      await getAPI.logout();

      // ✅ Nettoyer tous les tokens
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  /**
   * Inscription admin (si activé)
   */
  const handleRegister = async (registrationData) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await getAPI.register(registrationData);

      // ✅ Adapter à la nouvelle structure de réponse
      const { success, data } = response.data;

      if (!success || !data) {
        throw new Error("Erreur lors de l'inscription");
      }

      // ✅ Extraire accessToken, refreshToken et user
      const { accessToken, refreshToken, user } = data;

      // ✅ Sauvegarder les tokens JWT
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.Role.name);
      localStorage.setItem("isAuthenticated", "true");

      // Redirection
      navigate("/admin/dashboard");

    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erreur lors de l'inscription";
      setServerError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    serverError,
    handleChange,
    handleLogin,
    handleLogout,
    handleRegister,
    checkAuth,
  };
};
