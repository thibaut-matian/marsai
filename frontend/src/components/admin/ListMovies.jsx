import { useEffect } from "react";
import ContactModal from "../../components/features/contactModal";
import PaginationControls from "../../components/pagination";
import { useEmailSend } from "../../hooks/useEmailSend";
import useListFilm from "../../hooks/useListFilm";
import usePagination from "../../hooks/usePagination";
import ModalDetails from "../features/movies/ModalDetails";
import DeleteMovieModal from "./DeleteMovieModal";
import FinalistCounter from "./FinalistCounter";
import FinalistModal from "./FinalistModal";
import Filtre from "./filtre";
import MovieTableRow from "./MovieTableRow";

const ListMovies = () => {
  const {
    movies,
    loading,
    error,
    getBadgeClass,
    getStatusText,
    handleDelete,
    confirmDelete,
    deleteTarget,
    setDeleteTarget,
    deleteLoading,
    selectedMovie,
    setSelectedMovie,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    finalistFilter,
    setFinalistFilter,
    filteredMovies,
    detailMovie,
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail,
    // Finaliste
    finalistModal,
    openFinalistModal,
    closeFinalistModal,
    selectLoading,
    selectError,
    setSelectError,
    confirmInput,
    setConfirmInput,
    selectedIds,
    FINALIST_LIMIT,
    finalistCount,
    limitReached,
    handleSelectConfirm,
    isConfirmInputValid,
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

  // Pagination sur les films filtrés
  const pagination = usePagination(filteredMovies, 20);

  // Retour page 1 quand les filtres changent
  useEffect(() => {
    if (pagination.goToPage) pagination.goToPage(1);
  }, [statusFilter, searchQuery]);

  if (loading)
    return (
      <div className="p-10 text-center text-blue-400 animate-pulse font-bold">
        Chargement des films de MarsAI...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">⚠️ Erreur : {error}</div>
    );

  return (
    <div>
      <Filtre
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        finalistFilter={finalistFilter}
        setFinalistFilter={setFinalistFilter}
        filteredMovies={filteredMovies}
        movies={movies}
      />

      <div className="p-6">
        <FinalistCounter
          finalistCount={finalistCount}
          FINALIST_LIMIT={FINALIST_LIMIT}
          limitReached={limitReached}
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1E1E24]/90 backdrop-blur-md shadow-2xl">
          <table className="table w-full">
            <thead className="text-gray-400 bg-black/40">
              <tr className="border-b border-white/10 text-sm uppercase tracking-wider">
                <th className="bg-transparent py-5">Film</th>
                <th className="bg-transparent">Réalisateur</th>
                <th className="bg-transparent">Description</th>
                <th className="bg-transparent text-center">Votes jury</th>
                <th className="bg-transparent text-center">Statut</th>
                <th className="bg-transparent text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {pagination.currentItems.map((film) => (
                <MovieTableRow
                  key={film.id}
                  film={film}
                  getBadgeClass={getBadgeClass}
                  getStatusText={getStatusText}
                  selectedIds={selectedIds}
                  limitReached={limitReached}
                  onOpenDetail={handleOpenDetail}
                  onOpenContact={setSelectedMovie}
                  onOpenFinalist={openFinalistModal}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>

          <PaginationControls pagination={pagination} label="films" />
        </div>

        {/* Modal contact */}
        <ContactModal
          isOpen={!!selectedMovie}
          data={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSend={handleSendEmail}
          loading={emailLoading}
        />

        {/* Modal détail */}
        {isDetailOpen && detailMovie && (
          <ModalDetails
            movieId={detailMovie.id}
            isOpen={isDetailOpen}
            onClose={handleCloseDetail}
          />
        )}

        {/* Modal suppression */}
        <DeleteMovieModal
          deleteTarget={deleteTarget}
          deleteLoading={deleteLoading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />

        {/* Modal finaliste */}
        <FinalistModal
          finalistModal={finalistModal}
          selectLoading={selectLoading}
          selectError={selectError}
          setSelectError={setSelectError}
          confirmInput={confirmInput}
          setConfirmInput={setConfirmInput}
          onClose={closeFinalistModal}
          onConfirm={handleSelectConfirm}
          isConfirmInputValid={isConfirmInputValid}
        />
      </div>
    </div>
  );
};

export default ListMovies;