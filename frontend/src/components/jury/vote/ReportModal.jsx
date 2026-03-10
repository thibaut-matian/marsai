import { useState } from "react";
import getAPI from "../../../services/getAPI.jsx";

/**
 * Modale de signalement d'un problème technique ou de contenu.
 * S'ouvre via document.getElementById('report_modal').showModal()
 * Props :
 *   - movieId : identifiant du film en cours de visionnage
 */
const ReportModal = ({ movieId, onReported }) => {
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(null);

  const handleSubmit = async () => {
    setReportLoading(true);
    setReportError(null);
    try {
    console.log("DONNÉES ENVOYÉES :", { 
    movie_id: movieId, 
    cause: reportReason, 
    comment: reportDetails 
  });
      await getAPI.reportMovie({
        movie_id: movieId,
        cause: reportReason,
        comment: reportDetails || null,
      });
      setReportSubmitted(true);
      setTimeout(() => {
        document.getElementById("report_modal").close();
        setReportSubmitted(false);
        setReportReason("");
        setReportDetails("");
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Erreur signalement:", err);
      setReportError("Impossible d'envoyer le signalement. Réessayez.");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <dialog id="report_modal" className="modal modal-middle">
      <div className="modal-box bg-[#1a1425] border border-white/10 rounded-3xl mx-4">
        {!reportSubmitted ? (
          <>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:bg-white/10">✕</button>
            </form>
            <h3 className="font-bold text-lg mb-6 text-white">Signaler un problème</h3>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Type de problème</span>
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="select w-full bg-[#1a1425] border-white/10 text-white focus:border-purple-500/50 [&>option]:bg-[#1a1425]"
              >
                <option value="" disabled>Sélectionnez une raison</option>
                <option value="technical">Problème technique (son, image)</option>
                <option value="loading">La vidéo ne charge pas</option>
                <option value="content">Contenu inapproprié</option>
                <option value="quality">Problème de qualité</option>
                <option value="author">Droit d'auteur</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Détails (optionnel)</span>
              </label>
              <textarea
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Décrivez le problème rencontré..."
                rows={4}
                className="textarea w-full bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 resize-none"
              />
            </div>

            {/* Message d'erreur */}
            {reportError && (
              <div className="alert bg-red-500/20 border border-red-500/30 py-2 px-3 mb-4 rounded-xl">
                <span className="text-sm text-red-400">{reportError}</span>
              </div>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost text-gray-400 hover:bg-white/10 hover:text-white">Annuler</button>
              </form>
              <button
                onClick={handleSubmit}
                disabled={!reportReason || reportLoading}
                className="btn bg-red-600 border-0 text-white hover:bg-red-700 disabled:bg-white/5 disabled:text-gray-500"
              >
                {reportLoading
                  ? <span className="loading loading-spinner loading-sm"></span>
                  : "Signaler"
                }
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Signalement envoyé</h3>
            <p className="text-gray-400">Merci pour votre contribution</p>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ReportModal;