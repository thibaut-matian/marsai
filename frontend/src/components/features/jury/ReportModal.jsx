// src/components/features/vote/ReportModal.jsx
export default function ReportModal({ reportReason, setReportReason, reportDetails, setReportDetails, onReportSubmit, reportSubmitted }) {
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
                            <label className="label"><span className="label-text text-gray-300">Type de problème</span></label>
                            <select
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="select w-full bg-[#1a1425] border-white/10 text-white focus:border-purple-500/50"
                            >
                                <option value="" disabled>Sélectionnez une raison</option>
                                <option value="technical">Problème technique (son, image)</option>
                                <option value="loading">La vidéo ne charge pas</option>
                                <option value="content">Contenu inapproprié</option>
                                <option value="quality">Problème de qualité</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                        <div className="form-control w-full mb-6">
                            <label className="label"><span className="label-text text-gray-300">Détails (optionnel)</span></label>
                            <textarea
                                value={reportDetails}
                                onChange={(e) => setReportDetails(e.target.value)}
                                placeholder="Décrivez le problème rencontré..."
                                rows={4}
                                className="textarea w-full bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 resize-none"
                            />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-ghost text-gray-400">Annuler</button>
                            </form>
                            <button onClick={onReportSubmit} disabled={!reportReason} className="btn bg-red-600 border-0 text-white hover:bg-red-700">
                                Signaler
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Signalement envoyé</h3>
                        <p className="text-gray-400">Merci pour votre contribution</p>
                    </div>
                )}
            </div>
            <form method="dialog" className="modal-backdrop"><button>close</button></form>
        </dialog>
    );
}