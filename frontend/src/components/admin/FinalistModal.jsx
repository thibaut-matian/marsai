import { AlertCircle, Clapperboard, Medal, User, X } from "lucide-react";

/**
 * Modale de confirmation de sélection d'un film comme finaliste.
 */
const FinalistModal = ({
  finalistModal,
  selectLoading,
  selectError,
  confirmInput,
  setConfirmInput,
  setSelectError,
  onClose,
  onConfirm,
  isConfirmInputValid,
}) => {
  if (!finalistModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !selectLoading && onClose()}
      />
      <div className="relative w-full max-w-lg bg-[#1a1425] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-5">

        {/* Fermer */}
        {!selectLoading && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
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
          <p className="text-gray-400 text-sm mt-1">
            Ajout parmi les{" "}
            <span className="text-yellow-400 font-semibold">50 finalistes</span> du festival
          </p>
        </div>

        {/* Infos du film */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
              <Clapperboard size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Titre original</p>
              <p className="text-white font-semibold">{finalistModal.title || "—"}</p>
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
              <p className="text-white font-semibold">{finalistModal.director?.trim() || "—"}</p>
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
            onChange={(e) => {
              setConfirmInput(e.target.value);
              setSelectError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && isConfirmInputValid() && onConfirm()}
            placeholder="Titre français ou anglais…"
            disabled={selectLoading}
            autoFocus
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm outline-none transition-all focus:ring-1 ${
              selectError
                ? "border-red-500 focus:ring-red-500"
                : confirmInput.length > 0 && isConfirmInputValid()
                ? "border-green-500 focus:ring-green-500"
                : "border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20"
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
            ⚠️ Cette action est <strong>irréversible</strong>. Une fois sélectionné, le film ne
            peut plus être retiré des finalistes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={selectLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={selectLoading || !isConfirmInputValid()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black transition-all text-sm font-bold shadow-lg shadow-yellow-400/20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {selectLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <Medal size={15} />
            )}
            {selectLoading ? "En cours…" : "Confirmer la sélection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalistModal;
