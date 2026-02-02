import { Home, Clapperboard, Users, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // --- VARIABLES DE STYLE ---
  const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium";
  
  // Style Actif : Fond Primaire (Violet/Bleu), Texte Blanc, Ombre portée
  const activeStyle = `${baseLinkStyle} bg-primary text-white shadow-lg shadow-primary/20`;
  
  // Style Inactif : Texte Gris, léger éclaircissement au survol
  const inactiveStyle = `${baseLinkStyle} text-gray-400 hover:bg-white/5 hover:text-white`;

  return (
    // hidden = Caché sur Mobile
    // md:flex = Visible sur Desktop
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-[#1E1E24] border-r border-white/5">
      
      {/* 1. Header du Menu (Logo) */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          MarsAI<span className="text-primary">.</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Admin Panel</p>
      </div>

      {/* 2. Liste des Liens de Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Home size={20} /> 
          <span>Vue d'ensemble</span>
        </NavLink>

        <NavLink to="/admin/movies" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Clapperboard size={20} /> 
          <span>Films reçus</span>
        </NavLink>

        <NavLink to="/admin/jury" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Users size={20} /> 
          <span>Gestion Jury</span>
        </NavLink>

        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Settings size={20} /> 
          <span>Paramètres</span>
        </NavLink>
      </nav>

      {/* 3. Footer du Menu (Déconnexion) */}
      <div className="p-4 m-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl w-full transition-colors">
          <LogOut size={20} /> 
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;