// Imports UI
    import NavbarJury from "../../components/layout/NavbarJury.jsx";
    import videoSample from "../../assets/videos/Teaser.mp4"; 

    // Import de la Logique 
    import { useJuryVote } from "../../hooks/useJuryVote";
    import { useState } from "react";

    export default function JuryVote() {
    // On récupère les données et fonctions depuis le hook
    const { decision, setDecision, film, formatDuration } = useJuryVote();

    // État pour gérer la modale de signalement
    const [reportReason, setReportReason] = useState("");
    const [reportDetails, setReportDetails] = useState("");
    const [reportSubmitted, setReportSubmitted] = useState(false);
    
    // État pour le commentaire de notation
    const [comment, setComment] = useState("");
    
    // État pour la confirmation du vote
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    const handleReportSubmit = () => {
        // Ici vous pouvez ajouter la logique pour envoyer le signalement au backend
        console.log("Signalement envoyé:", { reason: reportReason, details: reportDetails });
        setReportSubmitted(true);
        setTimeout(() => {
            document.getElementById('report_modal').close();
            setReportSubmitted(false);
            setReportReason("");
            setReportDetails("");
        }, 2000);
    };
    
    const handleVoteSubmit = () => {
        console.log("Vote validé:", { decision, comment });
        // TODO: Envoyer au backend
        setVoteSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
        
        <NavbarJury />

        <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">
            
            {/* --- BLOC PRINCIPAL : VIDÉO + ACTIONS --- */}
            <div className="flex flex-col gap-4 mb-12">
                {/* Ligne 1 : Vidéo + Verdict (même hauteur) */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                    {/* LECTEUR VIDÉO */}
                    <div className="w-full lg:w-3/4">
                        <div className="card bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full rounded-3xl overflow-hidden">
                            <figure className="aspect-video">
                                <video 
                                    src={videoSample} 
                                    className="w-full h-full object-cover" 
                                    controls 
                                    autoPlay
                                    muted
                                />
                            </figure>
                        </div>
                    </div>

                    {/* VERDICT - Design moderne */}
                    <div className="w-full lg:w-1/4">
                        <div className="card bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 h-full rounded-3xl overflow-hidden">
                            {/* Header avec effet glow */}
                            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 px-6 py-4 border-b border-white/10">
                                <h2 className="text-center text-sm font-bold text-white uppercase tracking-[0.2em]">
                                    Votre Verdict
                                </h2>
                            </div>
                            
                            <div className="card-body justify-center gap-4 p-5">
                                {/* Boutons de vote modernes */}
                                <VerdictButton 
                                    type="validate" 
                                    icon="✓"
                                    label="J'aime" 
                                    sublabel="Sélectionner"
                                    current={decision} 
                                    set={setDecision}
                                    color="success"
                                />
                                <VerdictButton 
                                    type="discuss" 
                                    icon="?"
                                    label="À discuter" 
                                    sublabel="Hésitant"
                                    current={decision} 
                                    set={setDecision}
                                    color="warning"
                                />
                                <VerdictButton 
                                    type="refuse" 
                                    icon="✕"
                                    label="Je n'aime pas" 
                                    sublabel="Refuser"
                                    current={decision} 
                                    set={setDecision}
                                    color="error"
                                />
                                
                                {/* Divider */}
                                <div className="divider my-1 before:bg-white/10 after:bg-white/10"></div>
                                
                                {/* Message de confirmation */}
                                {voteSubmitted && (
                                    <div className="alert bg-green-500/20 border border-green-500/30 py-3 px-4 rounded-xl animate-pulse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-green-400 shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-green-400 font-medium">Votre vote a bien été pris en compte !</span>
                                    </div>
                                )}
                                
                                {/* Bouton Valider */}
                                {!voteSubmitted && (
                                    <button
                                        disabled={!comment.trim() || !decision}
                                        onClick={handleVoteSubmit}
                                        className={`btn btn-block rounded-2xl h-14 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                            comment.trim() && decision
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]' 
                                                : 'btn-disabled bg-white/5 border-white/10 text-gray-500'
                                        }`}
                                    >
                                        Valider mon vote
                                    </button>
                                )}
                                
                                {!comment.trim() && decision && !voteSubmitted && (
                                    <div className="alert bg-warning/10 border border-warning/20 py-2 px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        <span className="text-xs text-warning">Commentaire requis</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ligne 2 : Commentaire + Signaler */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                    {/* Commentaire de notation */}
                    <div className="w-full lg:w-3/4">
                        <div className="card bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl">
                            <div className="card-body">
                                <label className="label">
                                    <span className="label-text text-lg font-bold text-white uppercase tracking-widest"> Commentaire</span>
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Votre avis sur ce film... (qualité technique, originalité, utilisation de l'IA, etc.)"
                                    rows={3}
                                    maxLength={500}
                                    className="textarea textarea-bordered w-full bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 rounded-xl resize-none"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">{comment.length}/500</span>
                                    {comment && (
                                        <button 
                                            onClick={() => setComment("")}
                                            className="btn btn-ghost btn-xs text-gray-500 hover:text-red-400"
                                        >
                                            Effacer
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bouton de signalement */}
                    <div className="w-full lg:w-1/4 flex items-center">
                        <button
                            onClick={() => document.getElementById('report_modal').showModal()}
                            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white w-full h-20 gap-3 text-base rounded-2xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Signaler un problème
                        </button>
                    </div>
                </div>
            </div>

            {/* --- SECTION INFOS --- */}
            <div className="flex flex-col gap-4">
                
                {/* Ligne 1 : Synopsis + Candidat (même hauteur) */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                    {/* Synopsis & Note d'intention */}
                    <div className="w-full lg:w-3/4">
                        <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
                            <div className="card-body">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h1 className="card-title text-3xl font-bold text-white">{film.title}</h1>
                                    <div className="badge badge-ghost gap-1">
                                        ⏱ {formatDuration(film.duration)}
                                    </div>
                                    <div className={`badge gap-1 ${film.aiClassification === 'FULL' ? 'badge-info' : 'bg-purple-600 border-purple-600 text-white'}`}>
                                        {film.aiClassification === 'FULL' ? '🤖 100% IA' : '🤝 Hybride'}
                                    </div>
                                </div>
                                
                                <div className="space-y-6 text-gray-300 leading-relaxed">
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider text-xs mb-3 text-blue-400">Synopsis</h3>
                                        <p>{film.synopsis}</p>
                                    </div>
                                    {film.directorNote && (
                                        <div>
                                            <h3 className="font-bold uppercase tracking-wider text-xs mb-3 text-purple-400">Note d'intention</h3>
                                            <p className="italic text-white/60 pl-4 border-l-2 border-white/10">"{film.directorNote}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Candidat */}
                    <div className="w-full lg:w-1/4">
                        <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
                            <div className="card-body">
                                <h3 className="font-bold uppercase tracking-wider text-xs mb-4 text-gray-500">Candidat</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar placeholder">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center">
                                            <span className="text-white text-lg font-bold">{film.director.firstname[0]}{film.director.lastname[0]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-white">{film.director.firstname} {film.director.lastname}</p>
                                        <p className="text-sm text-gray-400">{film.director.city}, {film.director.country}</p>
                                    </div>
                                </div>
                                <div className="divider my-0"></div>
                                <div className="space-y-3 text-sm mt-auto">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Métier</span>
                                        <span className="text-white">{film.director.profession}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Réseaux</span>
                                        <a className="link link-info">{film.director.socials.instagram}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ligne 2 : Fabrication & IA + Équipe (même hauteur) */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                    {/* Fabrication & IA */}
                    <div className="w-full lg:w-3/4">
                        <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
                            <div className="card-body">
                                <h3 className="card-title text-sm flex items-center gap-2">
                                    <span className="text-xl">🛠</span> Fabrication & IA
                                </h3>
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Stack Technologique</p>
                                    <div className="flex flex-wrap gap-2">
                                        {film.aiStack.split(',').map((tool, i) => (
                                            <div key={i} className="badge badge-lg badge-outline badge-info">{tool.trim()}</div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Méthodologie Créative</p>
                                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <p className="text-sm text-gray-400">{film.aiMethodology}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Équipe & Crédits */}
                    {film.team.length > 0 && (
                        <div className="w-full lg:w-1/4">
                            <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
                                <div className="card-body">
                                    <h3 className="font-bold uppercase tracking-wider text-xs mb-2 text-gray-500">Équipe & Crédits</h3>
                                    <ul className="menu bg-transparent p-0 gap-2">
                                        {film.team.map((member, idx) => (
                                            <li key={idx}>
                                                <div className="flex justify-between text-sm bg-black/20 rounded-lg">
                                                    <span className="text-gray-400">{member.role}</span>
                                                    <span className="text-white font-medium">{member.firstname} {member.lastname}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Modale de signalement DaisyUI */}
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
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div className="form-control w-full mb-6">
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

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-ghost text-gray-400 hover:bg-white/10 hover:text-white">Annuler</button>
                            </form>
                            <button
                                onClick={handleReportSubmit}
                                disabled={!reportReason}
                                className="btn bg-red-600 border-0 text-white hover:bg-red-700 disabled:bg-white/5 disabled:text-gray-500"
                            >
                                Signaler
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
        </div>
    );
    }

    // Composant VerdictButton moderne
    function VerdictButton({ type, icon, label, sublabel, current, set, color }) {
        const isActive = current === type;
        
        const colorStyles = {
            success: {
                active: 'bg-success/20 border-success text-success shadow-lg shadow-success/20',
                hover: 'hover:bg-success/10 hover:border-success/50',
                icon: 'bg-success text-success-content'
            },
            warning: {
                active: 'bg-warning/20 border-warning text-warning shadow-lg shadow-warning/20',
                hover: 'hover:bg-warning/10 hover:border-warning/50',
                icon: 'bg-warning text-warning-content'
            },
            error: {
                active: 'bg-error/20 border-error text-error shadow-lg shadow-error/20',
                hover: 'hover:bg-error/10 hover:border-error/50',
                icon: 'bg-error text-error-content'
            }
        };

        const styles = colorStyles[color];

        return (
            <button 
                onClick={() => set(type)}
                className={`relative flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-300 group
                    ${isActive 
                        ? styles.active 
                        : `bg-white/5 border-white/10 text-gray-400 ${styles.hover}`
                    }`}
            >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300
                    ${isActive ? styles.icon : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                    {icon}
                </div>
                
                {/* Labels */}
                <div className="text-left flex-1">
                    <p className={`font-bold text-sm ${isActive ? '' : 'text-white'}`}>{label}</p>
                    <p className={`text-xs ${isActive ? 'opacity-70' : 'text-gray-500'}`}>{sublabel}</p>
                </div>
                
                {/* Check indicator */}
                {isActive && (
                    <div className={`w-6 h-6 rounded-full ${styles.icon} flex items-center justify-center`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
            </button>
        );
    }