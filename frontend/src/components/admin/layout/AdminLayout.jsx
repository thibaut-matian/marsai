import { Outlet } from "react-router-dom";
import Sidebar from './SideBar.jsx';
import NavBottom from './NavBottom.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Sidebar />
      <div className="md:ml-72 min-h-screen pb-20 md:pb-0">
        <main className="p-4 md:p-8 text-white">
          <Outlet />
        </main>
      </div>
      <NavBottom />
    </div>
  );
}