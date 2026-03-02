
const Filtre = ({ statusFilter, setStatusFilter, filteredMovies, movies }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-2">
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
          Filtrer par :
        </span>
        
        {/* Groupe de boutons DaisyUI avec glassmorphisme personnalisé */}
        <div className="join gap-2">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`join-item text-sm px-3 py-1.5 border backdrop-blur-md rounded-lg transition-all duration-300 ${
              statusFilter === 'all' 
              ? 'bg-white text-black border-white' 
              : 'bg-white/10 border-white/80 hover:bg-white hover:text-black'
            }`}
          >
            Tous
          </button>

          <button 
            onClick={() => setStatusFilter('0')}
            className={`join-item text-sm px-3 py-1.5 border backdrop-blur-md rounded-lg transition-all duration-300 ${
              statusFilter === '0' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white/10 border-white/80 hover:bg-blue-600 hover:text-white hover:border-blue-600'
            }`}
          >
            En attente
          </button>

          <button 
            onClick={() => setStatusFilter('1')}
            className={`join-item text-sm px-3 py-1.5 border backdrop-blur-md rounded-lg transition-all duration-300 ${
              statusFilter === '1' 
              ? 'bg-green-600 text-white border-green-600' 
              : 'bg-white/10 border-white/80 hover:bg-green-600 hover:text-white hover:border-green-600'
            }`}
          >
            Validés
          </button>

          <button 
            onClick={() => setStatusFilter('2')}
            className={`join-item text-sm px-3 py-1.5 border backdrop-blur-md rounded-lg transition-all duration-300 ${
              statusFilter === '2' 
              ? 'bg-red-600 text-white border-red-600' 
              : 'bg-white/10 border-white/80 hover:bg-red-600 hover:text-white hover:border-red-600'
            }`}
          >
            Refusés
          </button>
        </div>
      </div>

      {/* Badge de statistiques */}
      <div className="flex items-center gap-2">
        <div className="badge badge-outline border-white/10 text-gray-500 py-3 px-4">
          <span className="text-blue-400 font-bold mr-1">{filteredMovies.length}</span> 
          résultat(s) sur {movies.length}
        </div>
      </div>
    </div>
  );
};

export default Filtre;