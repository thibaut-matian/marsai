import { Home, Clapperboard, Users, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // --- VARIABLES DE STYLE ---
  const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium";
  
  // Style Actif : Fond Primaire (Violet/Bleu), Texte Blanc, Ombre portée
  const activeStyle = `${baseLinkStyle} bg-primary text-white shadow-lg shadow-primary/20`;
  
  // Style Inactif : Texte Gris, léger éclaircissement au survol
  const inactiveStyle = `${baseLinkStyle} text-gray-400 hover:bg-white/5 hover:text-white`;

  // Navigation links data
  const navigationLinks = [
    { path: '/admin/dashboard', label: 'Vue d\'ensemble', icon: Home },
    { path: '/admin/movies', label: 'Films reçus', icon: Clapperboard },
    { path: '/admin/jury-management', label: 'Gestion Jury', icon: Users },
    { path: '/admin/settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    // hidden = Caché sur Mobile
    // md:flex = Visible sur Desktop
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-navbar-admin border-r">
      
      {/* 1. Header du Menu (Logo) */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          MarsAI<span className="text-primary">.</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Admin Panel</p>
      </div>

      {/* 2. Liste des Liens de Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigationLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
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