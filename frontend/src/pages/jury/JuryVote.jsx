import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Imports UI
import NavbarJury from "../../components/layout/NavbarJury.jsx";

// Import de la Logique 
import { useJuryVote } from "../../hooks/useJuryVote";

export default function JuryVote() {
    const [searchParams] = useSearchParams();
    const { film, loading, error, fetchNextMovie, submitVote } = useJuryVote();

    // États locaux pour le formulaire
    const [decision, setDecision] = useState(null); // contiendra "j'aime", "je n'aime pas" ou "à discuter"
    const [comment, setComment] = useState("");
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    // États pour la modale de signalement
    const [reportReason, setReportReason] = useState("");
    const [reportDetails, setReportDetails] = useState("");
    const [reportSubmitted, setReportSubmitted] = useState(false);

    // Initialisation du token depuis l'URL (système d'email)
    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            fetchNextMovie();
        }
    }, [searchParams, fetchNextMovie]);

    const handleVoteSubmit = async () => {
        if (!decision || !comment.trim()) return;

        const success = await submitVote(decision, comment);
        if (success) {
            setVoteSubmitted(true);
            // On réinitialise le formulaire pour le prochain film
            setTimeout(() => {
                setVoteSubmitted(false);
                setDecision(null);
                setComment("");
            }, 2000);
        }
    };

    const handleReportSubmit = () => {
        console.log("Signalement envoyé:", { reason: reportReason, details: reportDetails });
        setReportSubmitted(true);
        setTimeout(() => {
            document.getElementById('report_modal').close();
            setReportSubmitted(false);
            setReportReason("");
            setReportDetails("");
        }, 2000);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#100b18] flex items-center justify-center">
            <span className="loading loading-sphere loading-lg text-purple-600"></span>
        </div>
    );

    if (!film) return (
        <div className="min-h-screen bg-[#100b18] text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold mb-4">Fin des votes ! 🏆</h1>
            <p className="text-gray-400">Vous avez évalué tous les films sélectionnés.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
            <NavbarJury />

            <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">
                
                {/* --- BLOC PRINCIPAL : VIDÉO + ACTIONS --- */}
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                        
                        {/* LECTEUR VIDÉO (YOUTUBE) */}
                        <div className="w-full lg:w-3/4">
                            <div className="card bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full rounded-3xl overflow-hidden">
                                <figure className="aspect-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&mute=1`}
                                        title={film.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </figure>
                            </div>
                        </div>

                        {/* VERDICT */}
                        <div className="w-full lg:w-1/4">
                            <div className="card bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 h-full rounded-3xl overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 px-6 py-4 border-b border-white/10">
                                    <h2 className="text-center text-sm font-bold text-white uppercase tracking-[0.2em]">Votre Verdict</h2>
                                </div>
                                
                                <div className="card-body justify-center gap-4 p-5">
                                    <VerdictButton 
                                        type="j'aime" 
                                        icon="✓"
                                        label="J'aime" 
                                        sublabel="Sélectionner"
                                        current={decision} 
                                        set={setDecision}
                                        color="success"
                                    />
                                    <VerdictButton 
                                        type="à discuter" 
                                        icon="?"
                                        label="À discuter" 
                                        sublabel="Hésitant"
                                        current={decision} 
                                        set={setDecision}
                                        color="warning"
                                    />
                                    <VerdictButton 
                                        type="je n'aime pas" 
                                        icon="✕"
                                        label="Je n'aime pas" 
                                        sublabel="Refuser"
                                        current={decision} 
                                        set={setDecision}
                                        color="error"
                                    />
                                    
                                    <div className="divider my-1 before:bg-white/10 after:bg-white/10"></div>
                                    
                                    {voteSubmitted && (
                                        <div className="alert bg-green-500/20 border border-green-500/30 py-3 px-4 rounded-xl">
                                            <span className="text-sm text-green-400 font-medium">Vote enregistré ! Chargement du suivant...</span>
                                        </div>
                                    )}
                                    
                                    {!voteSubmitted && (
                                        <button
                                            disabled={!comment.trim() || !decision}
                                            onClick={handleVoteSubmit}
                                            className={`btn btn-block rounded-2xl h-14 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                                comment.trim() && decision
                                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white shadow-lg' 
                                                    : 'btn-disabled bg-white/5 text-gray-500'
                                            }`}
                                        >
                                            Valider mon vote
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ligne 2 : Commentaire + Signaler */}
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                        <div className="w-full lg:w-3/4">
                            <div className="card bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl">
                                <div className="card-body p-6">
                                    <label className="label pt-0">
                                        <span className="label-text text-lg font-bold text-white uppercase tracking-widest">💬 Commentaire</span>
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Votre avis sur ce film (IA, technique, originalité)..."
                                        className="textarea textarea-bordered w-full bg-black/40 border-white/10 text-white focus:border-blue-500/50 rounded-xl resize-none"
                                        rows={3}
                                    />
                                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                        <span>{comment.length}/500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/4 flex items-center">
                            <button
                                onClick={() => document.getElementById('report_modal').showModal()}
                                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 hover:text-white w-full h-20 rounded-2xl"
                            >
                                Signaler un problème
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- SECTION INFOS --- */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                        {/* Synopsis */}
                        <div className="w-full lg:w-3/4">
                            <div className="card bg-white/5 border border-white/10 h-full rounded-3xl p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <h1 className="text-3xl font-bold text-white">{film.title}</h1>
                                    <div className="badge badge-outline border-white/20">⏱ {film.duration}s</div>
                                </div>
                                <div className="space-y-6 text-gray-300">
                                    <div>
                                        <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-2">Synopsis</h3>
                                        <p>{film.synopsis || "Aucun synopsis disponible."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Candidat */}
                        <div className="w-full lg:w-1/4">
                            <div className="card bg-white/5 border border-white/10 h-full rounded-3xl p-8">
                                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-4">Candidat</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="avatar placeholder">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                            <span className="text-white font-bold">{film.director?.firstname?.[0]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">{film.director?.firstname} {film.director?.lastname}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm mt-auto border-t border-white/10 pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Logiciels</span>
                                        <span className="text-white">{film.aiStack || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale de signalement */}
            <dialog id="report_modal" className="modal modal-middle">
                <div className="modal-box bg-[#1a1425] border border-white/10 rounded-3xl">
                    {!reportSubmitted ? (
                        <>
                            <h3 className="font-bold text-lg mb-6">Signaler un problème</h3>
                            <select
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="select select-bordered w-full bg-black/20 mb-4"
                            >
                                <option value="" disabled>Sélectionnez une raison</option>
                                <option value="technical">Problème technique (son/image)</option>
                                <option value="loading">Ne charge pas</option>
                                <option value="other">Autre</option>
                            </select>
                            <textarea
                                value={reportDetails}
                                onChange={(e) => setReportDetails(e.target.value)}
                                className="textarea textarea-bordered w-full bg-black/20 h-24 mb-6"
                                placeholder="Détails..."
                            />
                            <div className="modal-action">
                                <button className="btn btn-ghost" onClick={() => document.getElementById('report_modal').close()}>Annuler</button>
                                <button onClick={handleReportSubmit} className="btn btn-error text-white" disabled={!reportReason}>Signaler</button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-green-400 font-bold">Signalement reçu !</p>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
}

// Composant VerdictButton
function VerdictButton({ type, icon, label, sublabel, current, set, color }) {
    const isActive = current === type;
    const styles = {
        success: isActive ? 'bg-success/20 border-success text-success' : 'bg-white/5 border-white/10 text-gray-400 hover:border-success/50',
        warning: isActive ? 'bg-warning/20 border-warning text-warning' : 'bg-white/5 border-white/10 text-gray-400 hover:border-warning/50',
        error: isActive ? 'bg-error/20 border-error text-error' : 'bg-white/5 border-white/10 text-gray-400 hover:border-error/50',
    };

    const iconStyles = {
        success: isActive ? 'bg-success text-black' : 'bg-white/10',
        warning: isActive ? 'bg-warning text-black' : 'bg-white/10',
        error: isActive ? 'bg-error text-white' : 'bg-white/10',
    };

    return (
        <button 
            onClick={() => set(type)}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-300 ${styles[color]}`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${iconStyles[color]}`}>
                {icon}
            </div>
            <div className="text-left flex-1">
                <p className="font-bold text-sm text-white">{label}</p>
                <p className="text-xs opacity-60">{sublabel}</p>
            </div>
            {isActive && <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_10px_currentColor]"></div>}
        </button>
    );
}