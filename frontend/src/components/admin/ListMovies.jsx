import React from 'react';
import useListFilm from "../../hooks/useListFilm";
import usePagination from "../../hooks/usePagination";
import PaginationControls from "../../components/pagination"; 
import { Eye, Mail, Trash2, Clapperboard, User } from "lucide-react";
import ContactModal from "../../components/features/contactModal";

const ListMovies = () => {
  // On récupère tout ce qui est nécessaire du hook
  const { movies, getBadgeClass, handleDelete, handleSendEmail, selectedMovie, setSelectedMovie } = useListFilm();
  
  // La pagination utilise maintenant 'movies' (l'état)
  const pagination = usePagination(movies, 20);

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1E1E24]/90 backdrop-blur-md shadow-2xl">
        <table className="table w-full">
          <thead className="text-gray-400 bg-black/40">
            <tr className="border-b border-white/10 text-sm uppercase tracking-wider">
              <th className="bg-transparent py-5">Film</th>
              <th className="bg-transparent">Réalisateur</th>
              <th className="bg-transparent">Description</th>
              <th className="bg-transparent text-center">Statut</th>
              <th className="bg-transparent text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="text-white">
            {pagination.currentItems.map((film) => (
              <tr key={film.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Clapperboard size={20} /></div>
                    <div className="font-bold text-md">{film.titre}</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-gray-300 italic">
                    <User size={14} className="text-gray-500" /> {film.realisateur}
                  </div>
                </td>
                <td className="max-w-md italic text-gray-400 text-sm line-clamp-1">{film.description}</td>
                <td className="text-center">
                  <div className={`badge ${getBadgeClass(film.statut)} py-3 px-4 font-semibold whitespace-nowrap`}>
                    {film.statut}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-square btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white" title="Voir">
                      <Eye size={18} />
                    </button>
                    <button 
                      className="btn btn-square btn-sm bg-amber-500/20 hover:bg-amber-500 border border-amber-500 text-amber-500 hover:text-black transition-all"
                      onClick={() => setSelectedMovie(film)}
                      title="Contacter le réalisateur"
                    >
                      <Mail size={18} />
                    </button>
                    <button 
                      className="btn btn-square btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
                      onClick={() => handleDelete(film.id, film.titre)}
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationControls pagination={pagination} label="films" />
      </div>

      {/* MODALE DE CONTACT RÉUTILISABLE */}
      <ContactModal 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        data={selectedMovie} 
        onSend={handleSendEmail} 
      />
    </div>
  );
};

export default ListMovies;