import { useState, useEffect } from "react";
import getAPI from "../services/getAPI";

/**
 * Gère l'authentification du jury :
 * - Valide le token d'invitation (nouveau jury via lien email)
 * - Récupère les infos depuis l'accessToken existant (jury qui revient)
 */
const useJuryAuth = () => {
  const [userInfo, setUserInfo] = useState({});

  const getUserFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const validateToken = async (invitationToken) => {
    try {
      const response = await getAPI.validateInvitation(invitationToken);
      const data = response.data;
      if (data.success) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        setUserInfo(data.data.user);
        window.history.replaceState({}, "", "/jury/DashboardJury");
      }
    } catch (error) {
      console.error("Erreur validation token invitation:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invitationToken = urlParams.get("token");

    if (invitationToken) {
      validateToken(invitationToken);
    } else {
      const existing = getUserFromToken();
      if (existing) setUserInfo(existing);
    }
  }, []);

  return { userInfo };
};

export default useJuryAuth;
