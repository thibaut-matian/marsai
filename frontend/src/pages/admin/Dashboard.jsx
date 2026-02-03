import AdminLayout from '../../components/admin/layout/AdminLayout.jsx';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Test du Dashboard</h1>
      
      <div className="space-y-4">
        <p className="p-4 bg-[#1E1E24] rounded-xl border border-white/5">
          Ceci est un test de contenu.
        </p>
        {[...Array(10)].map((_, i) => (
          <p key={i} className="text-gray-400">
            Ligne de contenu numéro {i + 1} pour tester le défilement... 
            Vérifiez que je ne suis pas caché par la barre du bas sur mobile !
          </p>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;