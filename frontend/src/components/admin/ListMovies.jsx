import { Clapperboard, Eye, Mail, Trash2, User } from "lucide-react";
import { useEffect } from 'react'; // Ajout de useState pour la modal détails
import ContactModal from "../../components/features/contactModal";
import PaginationControls from "../../components/pagination";
import { useEmailSend } from "../../hooks/useEmailSend";
import useListFilm from "../../hooks/useListFilm";
import usePagination from "../../hooks/usePagination";
import ModalDetails from "../features/movies/ModalDetails";
import Filtre from "./filtre";

const ListMovies = () => {
  const { 
    movies, 
    loading, 
    error, 
    getBadgeClass, 
    getStatusText,
    handleDelete, 
    selectedMovie, 
    setSelectedMovie,
    statusFilter, 
    setStatusFilter, 
    filteredMovies, 
    detailMovie,
    isModalOpen,
     setIsModalOpen,
     handleOpenModal, 
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail
  } = useListFilm();

  const { sendEmail, loading: emailLoading } = useEmailSend();

  const handleSendEmail = async (e) => {
    if (!selectedMovie?.email) return;
    await sendEmail(
      e,
      selectedMovie.email,
      selectedMovie.title,
      selectedMovie.director,
      () => setSelectedMovie(null),
    );
  };

  
  // On branche la pagination sur les films filtrés
  const pagination = usePagination(filteredMovies, 20);

  // Petit ajout pour ne pas rester bloqué sur une page vide quand on change de filtre
  useEffect(() => {
    if (pagination.goToPage) pagination.goToPage(1);
  }, [statusFilter]);

  if (loading) return <div className="p-10 text-center text-blue-400 animate-pulse font-bold">Chargement des films de MarsAI...</div>;
  if (error)   return <div className="p-10 text-center text-red-500 font-bold">⚠️ Erreur : {error}</div>;

  return (
    <div>
      {/* Ton nouveau composant Filtre */}
      <Filtre 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
        filteredMovies={filteredMovies} 
        movies={movies} 
      />
      
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
              {/* TON TABLEAU ORIGINAL INCHANGÉ */}
              {pagination.currentItems.map((film) => (
                <tr key={film.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="align-middle py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Clapperboard size={20} />
                      </div>
                      <span className="font-bold text-sm md:text-md truncate max-w-[150px] md:max-w-none">
                        {film.title}
                      </span>
                    </div>
                  </td>

                  <td className="align-middle">
                    <div className="flex items-center gap-2 text-gray-300 italic text-sm">
                      <User size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="truncate">{film.director?.trim()}</span>
                    </div>
                  </td>

                  <td className="align-middle max-w-md italic text-gray-400 text-sm">
                    <div className="line-clamp-1">
                      {film.vo_desc || film.description}
                    </div>
                  </td>

                  <td className="text-center align-middle">
                    <div className={`badge ${getBadgeClass(film.status)} py-3 px-4 font-semibold whitespace-nowrap inline-flex items-center justify-center`}>
                      {getStatusText(film.status)}
                    </div>
                  </td>

                  <td className="align-middle">
                    <div className="flex justify-center items-center gap-2">
                      <button className="btn btn-square shadow-none btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white" key={film.id} onClick={() => 
                        handleOpenDetail(film)}>
                        <Eye size={18} />
                      </button>
                      <button 
                        className="btn btn-square shadow-none btn-sm bg-amber-500/20 hover:bg-amber-500 border border-amber-500 text-amber-500 hover:text-black transition-all"
                        onClick={() => setSelectedMovie(film)}
                      >
                        <Mail size={18} />
                      </button>
                      <button 
                        className="btn btn-square shadow-none btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
                        onClick={() => handleDelete(film.id)}
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

        {/* TON MODAL ORIGINAL INCHANGÉ */}
        <ContactModal
          isOpen={!!selectedMovie}               
          data={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSend={handleSendEmail}               
          loading={emailLoading}               
        />

        {isDetailOpen && detailMovie && (
          <ModalDetails 
            movieId={detailMovie.id}
            isOpen={isDetailOpen}
            onClose={handleCloseDetail} 
          />
        )}

      </div>
    </div>
  );
};

export default ListMovies;