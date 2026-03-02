/**
 * Carte de progression du jury
 * Affiche : X / Y films vus + barre de progression animée
 */
const ProgressCard = ({ watchedFilms, totalFilms, percentage, loading }) => {
  return (
    <div className="col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all">
      {/* Glow décoratif */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <h2 className="text-2xl font-bold mb-2">Votre Progression</h2>
      <div className="flex items-end gap-2 mb-6">
        <span className="text-4xl font-bold text-white">
          {loading ? "…" : watchedFilms}
        </span>
        <span className="text-xl text-gray-500 mb-1">
          / {loading ? "…" : totalFilms} films vus
        </span>
      </div>

      {/* Barre de progression */}
      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: loading ? "0%" : `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 text-right">
        {loading ? "Chargement…" : `${percentage}% complété`}
      </p>
    </div>
  );
};

export default ProgressCard;
