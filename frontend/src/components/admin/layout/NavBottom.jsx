import { LayoutDashboard, Film, Users, Settings, ShieldAlert } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBottom = () => {
  const location = useLocation();
  const isMoviesActive = location.pathname.startsWith('/admin/movies');

  const navigationLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/jury-management', label: 'Jurys', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-[#1E1E24]/90 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl z-50">
      
      {/* Sous-menu Films (visible seulement si on est sur une route /admin/movies) */}
      {isMoviesActive && (
        <div className="flex justify-around items-center h-10 border-b border-white/5 px-4">
          <NavLink
            to="/admin/movies/list"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400'
              }`
            }
          >
            <Film size={14} />
            <span>Films reçus</span>
          </NavLink>
          <NavLink
            to="/admin/movies"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400'
              }`
            }
          >
            <ShieldAlert size={14} />
            <span>Modération</span>
          </NavLink>
        </div>
      )}

      {/* Navigation principale */}
      <div className="flex justify-around items-center h-16">
        {/* Icône Films avec état actif global */}
        <NavLink
          to="/admin/movies"
          className={isMoviesActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
        >
          <Film size={24} />
        </NavLink>

        {navigationLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
            >
              <Icon size={24} />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBottom;