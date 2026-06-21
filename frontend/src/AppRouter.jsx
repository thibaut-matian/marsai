import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useGalleryAccess } from "./hooks/useGalleryAccess";
import getAPI from "./services/getAPI.jsx";

const AdminLayout = lazy(() => import("./components/admin/layout/AdminLayout.jsx"));
const MainLayout = lazy(() => import("./components/layout/MainLayout.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Galerie = lazy(() => import("./pages/Galerie.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Planning = lazy(() => import("./pages/Planning.jsx"));
const Reservation = lazy(() => import("./pages/Reservation.jsx"));
const Submission = lazy(() => import("./pages/Submission.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const JuryManagement = lazy(() => import("./pages/admin/JuryManagement.jsx"));
const MovieList = lazy(() => import("./pages/admin/MovieList.jsx"));
const Settings = lazy(() => import("./pages/admin/Settings.jsx"));
const MovieModeration = lazy(() => import("./pages/admin/movieModeration.jsx"));
const DashboardJury = lazy(() => import("./pages/jury/DashboardJury.jsx"));
const JuryVote = lazy(() => import("./pages/jury/JuryVote.jsx"));
const RankingJury = lazy(() => import("./pages/jury/RankingJury.jsx"));

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

const PAGE_TITLES = {
  '/':                      'MarsAI Festival',
  '/FAQ':                   'FAQ - MarsAI Festival',
  '/planning':              'Planning - MarsAI Festival',
  '/reservation':           'Réservation - MarsAI Festival',
  '/submission':            'Soumettre un film - MarsAI Festival',
  '/submit-movie':          'Soumettre un film - MarsAI Festival',
  '/galerie':               'Galerie - MarsAI Festival',
  '/admin/login':           'Connexion Admin - MarsAI Festival',
  '/admin':                 'Dashboard - MarsAI Festival',
  '/admin/dashboard':       'Dashboard - MarsAI Festival',
  '/admin/jury-management': 'Gestion des jurys - MarsAI Festival',
  '/admin/movies':          'Modération - MarsAI Festival',
  '/admin/movies/list':     'Films - MarsAI Festival',
  '/admin/settings':        'Paramètres - MarsAI Festival',
  '/jury/DashboardJury':    'Espace Jury - MarsAI Festival',
  '/jury/RankingJury':      'Classement - MarsAI Festival',
  '/jury/JuryVote':         'Vote - MarsAI Festival',
};

const TitleManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'MarsAI Festival';
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <span className="loading loading-spinner loading-lg text-white"></span>
  </div>
);

function AppRouter() {
  return (
    <Router>
      <TitleManager />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </Router>
  );
}

export default AppRouter;