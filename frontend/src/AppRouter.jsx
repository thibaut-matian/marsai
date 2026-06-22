import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import { useGalleryAccess } from "./hooks/useGalleryAccess";
import FAQ from "./pages/FAQ.jsx";
import Galerie from "./pages/Galerie.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Planning from "./pages/Planning.jsx";
import Reservation from "./pages/Reservation.jsx";
import Submission from "./pages/Submission.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import JuryManagement from "./pages/admin/JuryManagement.jsx";
import MovieList from "./pages/admin/MovieList.jsx";
import Settings from './pages/admin/Settings';
import MovieModeration from "./pages/admin/movieModeration.jsx";
import DashboardJury from "./pages/jury/DashboardJury.jsx";
import JuryVote from "./pages/jury/JuryVote.jsx";
import RankingJury from "./pages/jury/RankingJury.jsx";
import getAPI from "./services/getAPI.jsx";

// Fonction pour vérifier l'authentification et le rôle
const isAuthenticated = async (requiredRole = null) => {
  // Bypass si le mode DEV est activé
  if (import.meta.env.VITE_DEVMODE === 'true') return true;
  
  // Vérifier si un token est présent dans l'URL (invitation)
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');
  
  // Si un token est présent dans l'URL, vérifier le rôle
  if (tokenFromUrl) {
    try {
      const response = await getAPI.getUserByToken(tokenFromUrl);
      
      if (response.data.success) {
        // Vérifier le rôle si requis
        if (requiredRole) {
          return response.data.data.role.toLowerCase().includes(requiredRole.toLowerCase());
        }
        return true;
      }
    } catch (error) {
      console.error("Erreur vérification token:", error);
      return false;
    }
  }
  
  // Vérifier le localStorage
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  if (!token) return false;
  
  // Si un rôle est requis, vérifier dans le token JWT
  if (requiredRole) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role?.toLowerCase().includes(requiredRole.toLowerCase());
    } catch (error) {
      console.error("Erreur décodage token:", error);
      return false;
    }
  }
  
  return true;
};

// Composant de protection de route
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isAuth, setIsAuth] = useState(null);
  
  useEffect(() => {
    isAuthenticated(requiredRole).then(setIsAuth);
  }, [requiredRole]);
  
  if (isAuth === null) return <div>Chargement...</div>;
  if (!isAuth) return <Navigate to="/" replace />;
  
  return children;
};

// Composant de protection pour la galerie (accessible uniquement pendant la phase festival)
const ProtectedGalleryRoute = ({ children }) => {
  const { isAccessible, error } = useGalleryAccess();
  
  // Pendant le chargement
  if (isAccessible === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-white"></span>
          <p className="text-white mt-4">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }
  
  // Si la galerie n'est pas accessible
  if (!isAccessible) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-bold text-white mb-4 text-nowrap">Galerie non disponible</h1>
          <p className="text-gray-300 mb-6">
            La galerie des films sélectionnés ne sera accessible que pendant la dernière phase du festival.
          </p>
          <a 
            href="/" 
            className="btn-custom-glass text-white transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }
  
  return children;
};

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* 1. Routes Publiques (avec le Header du site) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/submit-movie" element={<Submission />} />
          <Route 
            path="/galerie" 
            element={
              <ProtectedGalleryRoute>
                <Galerie />
              </ProtectedGalleryRoute>
            } 
          />
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* 2. Routes Admin (avec la Sidebar Admin) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jury-management" element={<JuryManagement />} />
          <Route path="/admin/movies" element={<MovieModeration />} />
          <Route path="/admin/movies/list" element={<MovieList />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* 3. Routes Jury (Autonomes, avec leur propre Navbar interne) */}
        <Route 
          path="/jury/DashboardJury" 
          element={
            <ProtectedRoute requiredRole="jury">
              <DashboardJury />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jury/RankingJury" 
          element={
            <ProtectedRoute requiredRole="jury">
              <RankingJury />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jury/JuryVote" 
          element={
            <ProtectedRoute requiredRole="jury">
              <JuryVote />
            </ProtectedRoute>
          } 
        />
      </Routes> 
    </Router>
  );
}

export default AppRouter;