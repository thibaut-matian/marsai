import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import JuryCard from '../../components/jury/JuryCard';
import JuryModal from '../../components/jury/JuryModal';
import { useJuryManagement } from '../../hooks/useJuryManagement';
import { useJuryStats } from '../../hooks/useJuryStats';
import { useJuryFilters } from '../../hooks/useJuryFilters';

export default function JuryManagement() {
  // Hook principal
  const {
    juryList,
    selectedJuryMember,
    isModalOpen,
    isLoadingData,
    error,
    openJuryModal,
    closeJuryModal,
    openInviteModal,
    updateJury,
    deleteJury,
    deactivateJury,
    reactivateJury,
  } = useJuryManagement();

  // Hook statistiques
  const { stats } = useJuryStats(juryList);

  // Hook filtres (optionnel, à utiliser si vous ajoutez une barre de recherche)
  const { filteredJuries } = useJuryFilters(juryList);

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Gestion des Jurys
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Invitez, modifiez et gérez les membres du jury.
          </p>
        </div>
        <button
          onClick={openInviteModal}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all duration-300"
          aria-label="Inviter un nouveau membre du jury"
        >
          <UserPlus size={20} aria-hidden="true" />
          <span>Inviter un Jury</span>
        </button>
      </header>

      {/* Statistiques */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8"
        aria-label="Statistiques des jurys"
      >
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-blue-300 text-sm font-medium mb-1">Total Jurys</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">
            {stats.total}
          </p>
        </article>
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-green-300 text-sm font-medium mb-1">Actifs</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">
            {stats.active}
          </p>
        </article>
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-red-300 text-sm font-medium mb-1">Inactifs</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">
            {stats.inactive}
          </p>
        </article>
      </section>

      {/* Gestion des erreurs */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Liste des jurys */}
      <section aria-label="Liste des membres du jury">
        {isLoadingData ? (
          <div className="text-white text-center py-12">
            <p>Chargement...</p>
          </div>
        ) : filteredJuries.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl">
            <p className="text-white/60">Aucun jury pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredJuries.map((juryMember) => (
              <JuryCard
                key={juryMember.id}
                jury={juryMember}
                onClick={() => openJuryModal(juryMember)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <JuryModal
          jury={selectedJuryMember}
          onClose={closeJuryModal}
          onUpdate={updateJury}
          onDelete={deleteJury}
          onDeactivate={deactivateJury}
          onReactivate={reactivateJury}
        />
      )}
    </main>
  );
}