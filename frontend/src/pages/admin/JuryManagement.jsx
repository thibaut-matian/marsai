import { useState, useEffect } from 'react';
import { UserPlus, Users } from 'lucide-react';
import JuryCard from '../../components/jury/JuryCard'; 
import JuryModal from '../../components/jury/JuryModal'; 
import { juryService } from '../../services/juryService';

export default function JuryManagement() {
  const [juryList, setJuryList] = useState([]);
  const [selectedJuryMember, setSelectedJuryMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    fetchAllJuries();
  }, []);

  const fetchAllJuries = async () => {
    try {
      // Simuler un appel API pour le moment
      const juryData = await juryService.getAll();
      setJuryList(juryData);
    } catch (error) {
      console.error('Erreur lors du chargement des jurys:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleJuryCardClick = (juryMember) => {
    setSelectedJuryMember(juryMember);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJuryMember(null);
  };

  const handleJuryUpdate = async () => {
    await fetchAllJuries(); // Recharger les données après une mise à jour
    handleModalClose();
  };

  const handleJuryDelete = async (juryId) => {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce membre du jury ?');
    if (confirmDelete) {
      try {
        await juryService.delete(juryId);
        await fetchAllJuries(); // Recharger après suppression
      } catch (error) {
        alert('Erreur lors de la suppression du jury');
      }
    }
  };

  const handleInviteNewJury = () => {
    setSelectedJuryMember(null); // Pas de jury sélectionné = mode création
    setIsModalOpen(true);
  };

  const totalJuryCount = juryList.length;
  const activeJuryCount = juryList.filter(jury => jury.isActive).length;
  const inactiveJuryCount = totalJuryCount - activeJuryCount;

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
          onClick={handleInviteNewJury}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all duration-300"
          aria-label="Inviter un nouveau membre du jury"
        >
          <UserPlus size={20} aria-hidden="true" />
          <span>Inviter un Jury</span>
        </button>
      </header>

      <section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8"
        aria-label="Statistiques des jurys"
      >
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-blue-300 text-sm font-medium mb-1">Total Jurys</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">{totalJuryCount}</p>
        </article>
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-green-300 text-sm font-medium mb-1">Actifs</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">{activeJuryCount}</p>
        </article>
        <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <p className="text-red-300 text-sm font-medium mb-1">Inactifs</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">{inactiveJuryCount}</p>
        </article>
      </section>

      <section aria-label="Liste des membres du jury">
        {isLoadingData ? (
          <div className="text-white text-center py-12"><p>Chargement...</p></div>
        ) : juryList.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl">
            <p className="text-white/60">Aucun jury pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {juryList.map((juryMember) => (
              <JuryCard
                key={juryMember.id}
                jury={juryMember}
                onClick={() => handleJuryCardClick(juryMember)}
              />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <JuryModal
          jury={selectedJuryMember}
          onClose={handleModalClose}
          onUpdate={handleJuryUpdate}
          onDelete={handleJuryDelete}
        />
      )}
    </main>
  );
}