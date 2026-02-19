import React from 'react';

const Filtre = ({ statusFilter, setStatusFilter, filteredMovies, movies }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-2">
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
          Filtrer par :
        </span>
        
        {/* Groupe de boutons DaisyUI */}
        <div className="join border border-white/10 bg-[#1E1E24]/50 p-1 rounded-xl shadow-inner">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`btn btn-xs md:btn-sm join-item border-none transition-all ${
              statusFilter === 'all' 
              ? 'btn-primary text-white shadow-lg' 
              : 'btn-ghost text-gray-400 hover:bg-white/5'
            }`}
          >
            Tous
          </button>

          <button 
            onClick={() => setStatusFilter('0')}
            className={`btn btn-xs md:btn-sm join-item border-none transition-all ${
              statusFilter === '0' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'btn-ghost text-gray-400 hover:bg-white/5'
            }`}
          >
            En attente
          </button>

          <button 
            onClick={() => setStatusFilter('1')}
            className={`btn btn-xs md:btn-sm join-item border-none transition-all ${
              statusFilter === '1' 
              ? 'bg-success text-white shadow-lg' 
              : 'btn-ghost text-gray-400 hover:bg-white/5'
            }`}
          >
            Validés
          </button>

          <button 
            onClick={() => setStatusFilter('2')}
            className={`btn btn-xs md:btn-sm join-item border-none transition-all ${
              statusFilter === '2' 
              ? 'bg-error text-white shadow-lg' 
              : 'btn-ghost text-gray-400 hover:bg-white/5'
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