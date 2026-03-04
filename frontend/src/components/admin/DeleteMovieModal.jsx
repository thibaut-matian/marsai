import { Trash2, TriangleAlert, X } from "lucide-react";

/**
 * Modale de confirmation de suppression d'un film.
 */
const DeleteMovieModal = ({ deleteTarget, deleteLoading, onCancel, onConfirm }) => {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !deleteLoading && onCancel()}
      />
      <div className="relative w-full max-w-md bg-[#1a1425] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6">

        {/* Fermer */}
        {!deleteLoading && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
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
            Cette action est <strong>irréversible</strong>. Le film, ses votes et ses données
            associées seront supprimés définitivement.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={deleteLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={deleteLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all text-sm font-bold shadow-lg shadow-red-600/20 disabled:opacity-50"
          >
            {deleteLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <Trash2 size={15} />
            )}
            {deleteLoading ? "Suppression…" : "Supprimer définitivement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
