import { Home, Clapperboard, Users, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBottom = () => {
  // --- VARIABLES DE STYLE ---
  // Style de base pour tous les liens (centré, colonne)
  const baseLinkStyle = "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200";
  
  // Style quand le lien est ACTIF (Blanc brillant)
  const activeStyle = `${baseLinkStyle} text-white`;
  
  // Style quand le lien est INACTIF (Gris)
  const inactiveStyle = `${baseLinkStyle} text-gray-500 hover:text-gray-300`;

  return (
    // md:hidden = CACHÉ si l'écran est moyen ou grand (Desktop)
    <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-[#1E1E24]/90 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl z-50">
      <div className="flex justify-around items-center h-full">
        
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Home size={24} strokeWidth={2} />
        </NavLink>

        <NavLink to="/admin/movies" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Clapperboard size={24} strokeWidth={2} />
        </NavLink>

        <NavLink to="/admin/jury" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Users size={24} strokeWidth={2} />
        </NavLink>

        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <Settings size={24} strokeWidth={2} />
        </NavLink>

      </div>
    </nav>
  );
};

export default NavBottom;