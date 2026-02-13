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

    return (
        <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
        
        <NavbarJury />

        <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">
            
            {/* --- BLOC PRINCIPAL : VIDÉO + ACTIONS --- */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                     {/* LECTEUR VIDÉO */}
            <div className="w-full lg:w-3/4">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black aspect-video group">
                    <video 
                        src={videoSample} 
                        className="w-full h-full object-cover" 
                        controls 
                        autoPlay
                        muted
                    />
                </div>
            </div>

            {/* VERDICT */}
            <div className="w-full lg:w-1/4 flex flex-col gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center flex flex-col h-full">
                    <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Votre Verdict</h2>
                    <div className="flex flex-col gap-6 flex-grow justify-center">
                        <ActionButton type="validate" label="J'AIME (Valider)" current={decision} set={setDecision} />
                        <ActionButton type="discuss" label="À DISCUTER" current={decision} set={setDecision} />
                        <ActionButton type="refuse" label="J'AIME PAS (Refuser)" current={decision} set={setDecision} />
                    </div>
                    {decision && (
                        <div className="mt-8 animate-fade-in text-blue-300 font-medium">
                            Vote enregistré ! <br/> <span className="text-xs text-white/50">Passage au suivant...</span>
                        </div>
                    )}
                </div>
                
                {/* Bouton de signalement - en dehors de la section verdict */}
                <button
                    onClick={() => document.getElementById('report_modal').showModal()}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-2xl text-red-400 hover:text-red-300 transition-all duration-300 text-base font-semibold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Signaler un problème
                </button>
            </div>
            </div>

            {/* --- SECTION INFOS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* COLONNE GAUCHE (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <h1 className="text-3xl font-bold text-white">{film.title}</h1>
                            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/5 text-sm text-gray-300">
                                ⏱ {formatDuration(film.duration)}
                            </span>
                            <span className={`px-3 py-1 rounded-full border text-sm font-bold ${film.aiClassification === 'FULL' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}`}>
                                {film.aiClassification === 'FULL' ? '🤖 100% IA' : '🤝 Hybride'}
                            </span>
                        </div>
                        
                        <div className="space-y-8 text-gray-300 leading-relaxed">
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-3 text-blue-400">Synopsis</h3>
                                <p>{film.synopsis}</p>
                            </div>
                            {film.directorNote && (
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-3 text-purple-400">Note d'intention</h3>
                                    <p className="italic text-white/60 pl-4 border-l-2 border-white/10">"{film.directorNote}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                            <span className="text-xl">🛠</span> Fabrication & IA
                        </h3>
                        <div className="mb-6">
                            <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Stack Technologique</p>
                            <div className="flex flex-wrap gap-2">
                                {film.aiStack.split(',').map((tool, i) => (
                                    <span key={i} className="bg-black/40 px-3 py-1 rounded-lg border border-white/10 text-blue-200 text-sm">{tool.trim()}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Méthodologie Créative</p>
                            <p className="text-sm text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">{film.aiMethodology}</p>
                        </div>
                    </div>
                </div>

                {/* COLONNE DROITE (1/3) */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 text-gray-500">Candidat</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center text-lg font-bold">
                                {film.director.firstname[0]}{film.director.lastname[0]}
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">{film.director.firstname} {film.director.lastname}</p>
                                <p className="text-sm text-gray-400">{film.director.city}, {film.director.country}</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Métier</span>
                                <span className="text-white">{film.director.profession}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Réseaux</span>
                                <span className="text-blue-400 cursor-pointer hover:text-white">{film.director.socials.instagram}</span>
                            </div>
                        </div>
                    </div>

                    {film.team.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 text-gray-500">Équipe & Crédits</h3>
                            <ul className="space-y-3">
                                {film.team.map((member, idx) => (
                                    <li key={idx} className="flex justify-between text-sm items-center bg-black/20 p-2 rounded-lg">
                                        <span className="text-gray-400">{member.role}</span>
                                        <span className="text-white font-medium">{member.firstname} {member.lastname}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Modale de signalement avec DaisyUI */}
        <dialog id="report_modal" className="modal">
            <div className="modal-box bg-[#1a1425] border border-white/10 rounded-3xl max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {!reportSubmitted ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Signaler un problème</h2>
                            <form method="dialog">
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Type de problème
                                </label>
                                <select
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    className="select select-bordered w-full bg-[#100C17] border-white/10 text-white focus:border-red-500 focus:outline-none focus:outline-red-500/50 hover:border-red-500/50 transition-colors"
                                >
                                    <option value="" disabled>Sélectionnez une raison</option>
                                    <option value="technical">Problème technique (son, image)</option>
                                    <option value="loading">La vidéo ne charge pas</option>
                                    <option value="content">Contenu inapproprié</option>
                                    <option value="quality">Problème de qualité</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Détails (optionnel)
                                </label>
                                <textarea
                                    value={reportDetails}
                                    onChange={(e) => setReportDetails(e.target.value)}
                                    placeholder="Décrivez le problème rencontré..."
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                <form method="dialog" className="flex-1">
                                    <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all duration-300 font-medium">
                                        Annuler
                                    </button>
                                </form>
                                <button
                                    onClick={handleReportSubmit}
                                    disabled={!reportReason}
                                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 border border-red-500/30 rounded-lg text-white transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
                                >
                                    Signaler
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Signalement envoyé</h3>
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

    // Composant Visuel simple pour les boutons (Peut rester ici car c'est purement visuel)
    function ActionButton({ type, label, current, set }) {
        const styles = {
            validate: "border-green-500 text-green-500 hover:bg-green-500/10",
            discuss: "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10",
            refuse: "border-red-500 text-red-500 hover:bg-red-500/10"
        };
        
        const activeStyles = {
            validate: "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]",
            discuss: "bg-yellow-600 border-yellow-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.4)]",
            refuse: "bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
        };

        return (
            <button 
                onClick={() => set(type)}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all duration-300 border uppercase tracking-wider text-sm ${current === type ? activeStyles[type] : `bg-transparent border-white/10 text-gray-400 ${styles[type]}`}`}
            >
                {label}
            </button>
        );
    }