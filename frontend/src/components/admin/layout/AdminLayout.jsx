import Sidebar from './SideBar.jsx';
import NavBottom from './NavBottom.jsx';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Sidebar - Visible uniquement sur desktop */}
      <Sidebar />
      
      {/* Contenu principal avec marge à gauche pour la sidebar sur desktop */}
      <div className="md:ml-72 min-h-screen pb-20 md:pb-0">
        <main className="p-4 md:p-8 text-white">
          {children}
        </main>
      </div>
      
      {/* NavBottom - Visible uniquement sur mobile */}
      <NavBottom />
    </div>
  );
};

export default AdminLayout;