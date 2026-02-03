import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/layout/Header.jsx";
import FAQ from "./pages/FAQ.jsx";
import Planning from "./pages/Planning.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Submission from "./pages/Submission.jsx";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Header visible SEULEMENT si ce n'est PAS une route admin */}
      {!isAdminRoute && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/planning" element={<Planning />} /> 
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/submission" element={<Submission />} />
      </Routes>
    </>
  );
}

function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppRouter;