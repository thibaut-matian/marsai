import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginForm from "./components/features/auth/LoginForm.jsx";
import FAQ from "./pages/FAQ.jsx";
import Planning from "./pages/Planning.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import JuryManagement from "./pages/admin/JuryManagement.jsx";
import AdminLayout from "./components/admin/layout/AdminLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Submission from "./pages/Submission.jsx";
import DashboardJury from "./pages/jury/DashboardJury.jsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* 1. Routes Publiques (avec le Header du site) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/submit-movie" element={<Submission />} />
        </Route>

        {/* 2. Routes Admin (avec la Sidebar Admin) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jury-management" element={<JuryManagement />} />
        </Route>

        {/* 3. Routes Jury et login (Autonomes, avec leur propre Navbar interne) */}
        {/* On la met en dehors des layouts pour qu'elle soit en plein écran avec son propre style */}
        <Route path="/jury/DashboardJury" element={<DashboardJury />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes> 
    </Router>
  );
}

export default AppRouter;
