import { Home, Clapperboard, Users, Settings, LogOut, Film, ShieldAlert } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // --- VARIABLES DE STYLE ---
  const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium";
  
  // Style Actif : Fond Primaire (Violet/Bleu), Texte Blanc, Ombre portée
  const activeStyle = `${baseLinkStyle} bg-primary text-white shadow-lg shadow-primary/20`;
  
  // Style Inactif : Texte Gris, léger éclaircissement au survol
  const inactiveStyle = `${baseLinkStyle} text-gray-400 hover:bg-white/5 hover:text-white`;

  // Déterminer si une des sous-routes films est active (pour ouvrir le menu par défaut)
  const isMoviesActive = location.pathname.startsWith('/admin/movies');

  // Navigation links data (sans Films reçus qui devient un menu)
  const navigationLinks = [
    { path: '/admin/dashboard', label: 'Vue d\'ensemble', icon: Home },
    { path: '/admin/jury-management', label: 'Gestion Jury', icon: Users },
    { path: '/admin/settings', label: 'Paramètres', icon: Settings }
  ];

  return (
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

        {/* Lien Vue d'ensemble */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
        >
          <Home size={20} />
          <span>Vue d'ensemble</span>
        </NavLink>

        {/* Menu déroulant Films reçus (DaisyUI details/summary) */}
        <details open={isMoviesActive || undefined} className="group">
          <summary
            className={`${baseLinkStyle} cursor-pointer list-none select-none w-full ${
              isMoviesActive
                ? 'text-white bg-white/10'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Clapperboard size={20} />
            <span className="flex-1">Films reçus</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <ul className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1">
            <li>
              <NavLink
                to="/admin/movies/list"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Film size={16} />
                <span>Films reçus</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/movies"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <ShieldAlert size={16} />
                <span>Modération</span>
              </NavLink>
            </li>
          </ul>
        </details>

        {/* Liens restants */}
        <NavLink
          to="/admin/jury-management"
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
        >
          <Users size={20} />
          <span>Gestion Jury</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
        >
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