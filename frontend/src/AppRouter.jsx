import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/layout/Header.jsx";
import FAQ from "./pages/FAQ.jsx";
import Planning from "./pages/Planning.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/planning" element={<Planning />} /> 
        <Route path="/admin/dashboard" element={<Dashboard />} />
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