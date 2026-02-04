import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FAQ from "./pages/FAQ.jsx";
import Planning from "./pages/Planning.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./components/admin/layout/AdminLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Submission from "./pages/Submission.jsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public routes using MainLayout (which uses Outlet) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/submit-movie" element={<Submission />} />
        </Route>

        {/* Admin routes using AdminLayout (Outlet) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
