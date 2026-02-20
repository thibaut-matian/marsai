import { LayoutDashboard, Film, Users, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBottom = () => {
  const navigationLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/movies', label: 'Films', icon: Film },
    { path: '/admin/jury-management', label: 'Jurys', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-[#1E1E24]/90 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl z-50">
      <div className="flex justify-around items-center h-full">
        {navigationLinks.map(link => {
          const Icon = link.icon; 
          return (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}>
              <Icon size={24} /> 
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBottom;