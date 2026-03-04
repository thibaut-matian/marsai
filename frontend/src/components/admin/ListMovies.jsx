import { Clapperboard, Eye, Mail, Trash2, User, ThumbsUp, ThumbsDown, MessageCircle, Medal, X, AlertCircle, TriangleAlert } from "lucide-react";
import { useEffect, useState } from 'react';
import ContactModal from "../../components/features/contactModal";
import PaginationControls from "../../components/pagination";
import { useEmailSend } from "../../hooks/useEmailSend";
import useListFilm from "../../hooks/useListFilm";
import usePagination from "../../hooks/usePagination";
import ModalDetails from "../features/movies/ModalDetails";
import Filtre from "./filtre";
import getAPI from "../../services/getAPI";

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
    isModalOpen,
     setIsModalOpen,
     handleOpenModal, 
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail
  } = useListFilm();

  const { sendEmail, loading: emailLoading } = useEmailSend();

  // === SÉLECTION FINALISTE ===
  const [finalistModal, setFinalistModal] = useState(null);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectError, setSelectError] = useState(null);
  const [confirmInput, setConfirmInput] = useState('');
  // Suivi local des films déjà sélectionnés (sans reload)
  const [selectedIds, setSelectedIds] = useState(() =>
    (movies || []).filter((m) => m.isSelected).map((m) => m.id)
  );
  // Sync au chargement des films
  useEffect(() => {
    setSelectedIds((movies || []).filter((m) => m.isSelected).map((m) => m.id));
  }, [movies]);

  const FINALIST_LIMIT = 50;
  const finalistCount = selectedIds.length;
  const limitReached = finalistCount >= FINALIST_LIMIT;

  const openFinalistModal = (film) => {
    setConfirmInput('');
    setSelectError(null);
    setFinalistModal(film);
  };

  const handleSelectConfirm = async () => {
    if (!finalistModal) return;
    const input = confirmInput.trim().toLowerCase();
    const frTitle = (finalistModal.title || '').trim().toLowerCase();
    const enTitle = (finalistModal.enTitle || '').trim().toLowerCase();

    const isValid = input === frTitle || (enTitle && input === enTitle);

    if (!isValid) {
      setSelectError("Le titre saisi ne correspond pas. Retapez le titre exact (français ou anglais).");
      return;
    }
    setSelectLoading(true);
    setSelectError(null);
    try {
      await getAPI.selectMovie(finalistModal.id);
      setSelectedIds((prev) => [...prev, finalistModal.id]);
      setFinalistModal(null);
      setConfirmInput('');
    } catch (err) {
      setSelectError(err.response?.data?.message || "Erreur lors de la sélection.");
    } finally {
      setSelectLoading(false);
    }
  };

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
  }, [statusFilter, searchQuery]);

  if (loading) return <div className="p-10 text-center text-blue-400 animate-pulse font-bold">Chargement des films de MarsAI...</div>;
  if (error)   return <div className="p-10 text-center text-red-500 font-bold">⚠️ Erreur : {error}</div>;

  return (
    <div>
      {/* Ton nouveau composant Filtre */}
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

        {/* Compteur finalistes */}
        <div className={`mb-4 flex items-center justify-between px-5 py-3 rounded-2xl border ${
          limitReached
            ? 'bg-yellow-400/10 border-yellow-400/30'
            : 'bg-white/5 border-white/10'
        }`}>
          <div className="flex items-center gap-2">
            <Medal size={16} className={limitReached ? 'text-yellow-400' : 'text-gray-400'} />
            <span className="text-sm font-semibold text-white">Finalistes sélectionnés</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Barre de progression */}
            <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${limitReached ? 'bg-yellow-400' : 'bg-primary'}`}
                style={{ width: `${Math.min((finalistCount / FINALIST_LIMIT) * 100, 100)}%` }}
              />
            </div>
            <span className={`text-sm font-bold tabular-nums ${limitReached ? 'text-yellow-400' : 'text-white'}`}>
              {finalistCount} / {FINALIST_LIMIT}
            </span>
            {limitReached && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-semibold">
                Complet
              </span>
            )}
          </div>
        </div>
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

                  {/* Votes jury */}
                  <td className="text-center align-middle">
                    {film.votes?.total > 0 ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                          <ThumbsUp size={13} />
                          {film.votes.like}
                        </span>
                        <span className="flex items-center gap-1 text-red-400 text-xs font-semibold">
                          <ThumbsDown size={13} />
                          {film.votes.dislike}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                          <MessageCircle size={13} />
                          {film.votes.discuss}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs italic">Aucun vote</span>
                    )}
                  </td>

                  <td className="text-center align-middle">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeClass(film.status)}`}>
                      {getStatusText(film.status)}
                    </span>
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

                      {/* Bouton sélection finaliste */}
                      {selectedIds.includes(film.id) ? (
                        <div
                          className="btn btn-square shadow-none btn-sm bg-yellow-400/20 border border-yellow-400 text-yellow-400 cursor-default"
                          title="Finaliste sélectionné"
                        >
                          <Medal size={18} />
                        </div>
                      ) : film.status === 2 ? (
                        // Refusé = "je n'aime pas" → pas éligible aux finales
                        null
                      ) : limitReached ? (
                        <div
                          className="btn btn-square shadow-none btn-sm bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                          title="Limite de 50 finalistes atteinte"
                        >
                          <Medal size={18} />
                        </div>
                      ) : film.status === 5 ? (
                        <div
                          className="btn btn-square shadow-none btn-sm bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                          title="Film pas encore noté par le jury"
                        >
                          <Medal size={18} />
                        </div>
                      ) : (
                        <button
                          className="btn btn-square shadow-none btn-sm bg-white/5 hover:bg-yellow-400/20 border border-white/20 hover:border-yellow-400 text-gray-500 hover:text-yellow-400 transition-all"
                          onClick={() => openFinalistModal(film)}
                          title="Sélectionner comme finaliste"
                        >
                          <Medal size={18} />
                        </button>
                      )}

                      <button 
                        className="btn btn-square shadow-none btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
                        onClick={() => handleDelete(film)}
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

        {/* MODAL SUPPRESSION */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !deleteLoading && setDeleteTarget(null)} />
            <div className="relative w-full max-w-md bg-[#1a1425] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6">

              {/* Fermer */}
              {!deleteLoading && (
                <button onClick={() => setDeleteTarget(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              )}

              {/* Icône */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <Trash2 size={28} className="text-red-400" />
                </div>
              </div>

              {/* Titre */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Supprimer ce film ?</h3>
                <p className="text-gray-400 text-sm">Vous êtes sur le point de supprimer définitivement</p>
                <p className="text-white font-semibold text-base">« {deleteTarget.title} »</p>
                <p className="text-gray-500 text-sm italic">de {deleteTarget.director}</p>
              </div>

              {/* Avertissement */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <TriangleAlert size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">
                  Cette action est <strong>irréversible</strong>. Le film, ses votes et ses données associées seront supprimés définitivement.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all text-sm font-bold shadow-lg shadow-red-600/20 disabled:opacity-50"
                >
                  {deleteLoading
                    ? <span className="loading loading-spinner loading-xs" />
                    : <Trash2 size={15} />
                  }
                  {deleteLoading ? "Suppression…" : "Supprimer définitivement"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL SÉLECTION FINALISTE */}
        {finalistModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !selectLoading && (setFinalistModal(null), setConfirmInput(''))} />
            <div className="relative w-full max-w-lg bg-[#1a1425] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-5">
              
              {/* Fermer */}
              {!selectLoading && (
                <button onClick={() => { setFinalistModal(null); setConfirmInput(''); }} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              )}

              {/* Icône */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
                  <Medal size={30} className="text-yellow-400" />
                </div>
              </div>

              {/* Titre */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Sélectionner comme finaliste</h3>
                <p className="text-gray-400 text-sm mt-1">Ajout parmi les <span className="text-yellow-400 font-semibold">50 finalistes</span> du festival</p>
              </div>

              {/* Infos du film */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
                    <Clapperboard size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Titre original</p>
                    <p className="text-white font-semibold">{finalistModal.title || '—'}</p>
                    {finalistModal.enTitle && finalistModal.enTitle !== finalistModal.title && (
                      <p className="text-gray-400 text-sm italic mt-0.5">{finalistModal.enTitle}</p>
                    )}
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 flex-shrink-0">
                    <User size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Réalisateur</p>
                    <p className="text-white font-semibold">{finalistModal.director?.trim() || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Champ de confirmation */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">
                  Pour confirmer, retapez le titre du film (français ou anglais) :
                </label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {finalistModal.title && (
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                      🇫🇷 {finalistModal.title}
                    </span>
                  )}
                  {finalistModal.enTitle && finalistModal.enTitle !== finalistModal.title && (
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                      🇬🇧 {finalistModal.enTitle}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) => { setConfirmInput(e.target.value); setSelectError(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectConfirm()}
                  placeholder="Titre français ou anglais…"
                  disabled={selectLoading}
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm outline-none transition-all focus:ring-1 ${
                    selectError
                      ? 'border-red-500 focus:ring-red-500'
                      : (() => {
                          const input = confirmInput.trim().toLowerCase();
                          const fr = (finalistModal.title || '').trim().toLowerCase();
                          const en = (finalistModal.enTitle || '').trim().toLowerCase();
                          return input.length > 0 && (input === fr || (en && input === en))
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20';
                        })()
                  }`}
                />
                {selectError && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {selectError}
                  </p>
                )}
              </div>

              {/* Avertissement */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">
                  ⚠️ Cette action est <strong>irréversible</strong>. Une fois sélectionné, le film ne peut plus être retiré des finalistes.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setFinalistModal(null); setConfirmInput(''); }}
                  disabled={selectLoading}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSelectConfirm}
                  disabled={selectLoading || (() => {
                    const input = confirmInput.trim().toLowerCase();
                    const fr = (finalistModal.title || '').trim().toLowerCase();
                    const en = (finalistModal.enTitle || '').trim().toLowerCase();
                    return !(input === fr || (en && input === en));
                  })()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black transition-all text-sm font-bold shadow-lg shadow-yellow-400/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {selectLoading
                    ? <span className="loading loading-spinner loading-xs" />
                    : <Medal size={15} />
                  }
                  {selectLoading ? "En cours…" : "Confirmer la sélection"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListMovies;