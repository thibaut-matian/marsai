import React from 'react';
import { Clapperboard, User, Info, AlertTriangle } from "lucide-react";
import useListFilm from "../../hooks/useListFilm";
import usePagination from "../../hooks/usePagination";
import PaginationControls from "../../components/pagination"; 

const ListMovies = () => {
  const { MOVIES_DATA, getBadgeClass } = useListFilm();
  
  const pagination = usePagination(MOVIES_DATA, 20);

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
            </tr>
          </thead>
          
          <tbody className="text-white">
            {/* On utilise pagination.currentItems */}
            {pagination.currentItems.map((film) => (
              <tr key={film.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Clapperboard size={20} /></div>
                    <div className="font-bold text-md">{film.titre}</div>
                  </div>
                </td>
                <td>{film.realisateur}</td>
                <td className="max-w-md italic text-gray-400 text-sm">{film.description}</td>
                <td className="text-center min-w-[140px]">
                  <div className={`badge ${getBadgeClass(film.statut)} py-3 px-4 font-semibold whitespace-nowrap`}>
                    {film.statut}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationControls pagination={pagination} label="films" />
      </div>
    </div>
  );
};

export default ListMovies;