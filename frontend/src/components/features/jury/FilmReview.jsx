// src/components/features/vote/FilmReview.jsx
import VerdictButton from "./VerdictButton";

export default function FilmReview({ film, videoSample, decision, setDecision, comment, setComment, voteSubmitted, onVoteSubmit, formatDuration }) {
    return (
        <div className="flex flex-col gap-4 mb-12">
            {/* Ligne 1 : Vidéo + Verdict */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                <div className="w-full lg:w-3/4">
                    <div className="card bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full rounded-3xl overflow-hidden">
                        <figure className="aspect-video">
                            {/* afficher la vidéo depuis la base de données si elle existe */}
                            {film.cloudUrl ? (
                                <video
                                    key={film.id}
                                    src={film.cloudUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    muted
                                />
                            ) : film.youtube_id ? (
                                <iframe
                                    key={film.id}
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${film.youtube_id}?rel=0&showinfo=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    key={film.id}
                                    src={videoSample}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    muted
                                />
                            )}
                        </figure>
                    </div>
                </div>

                <div className="w-full lg:w-1/4">
                    <div className="card bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 h-full rounded-3xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 px-6 py-4 border-b border-white/10">
                            <h2 className="text-center text-sm font-bold text-white uppercase tracking-[0.2em]">Votre Verdict</h2>
                        </div>
                        <div className="card-body justify-center gap-4 p-5">
                            <VerdictButton type="validate" icon="✓" label="J'aime" sublabel="Sélectionner" current={decision} set={setDecision} color="success" />
                            <VerdictButton type="discuss" icon="?" label="À discuter" sublabel="Hésitant" current={decision} set={setDecision} color="warning" />
                            <VerdictButton type="refuse" icon="✕" label="Je n'aime pas" sublabel="Refuser" current={decision} set={setDecision} color="error" />
                            <div className="divider my-1 before:bg-white/10 after:bg-white/10"></div>
                            
                            {voteSubmitted ? (
                                <div className="alert bg-green-500/20 border border-green-500/30 py-3 px-4 rounded-xl animate-pulse">
                                    <span className="text-sm text-green-400 font-medium">Vote pris en compte !</span>
                                </div>
                            ) : (
                                <button
                                    disabled={!comment.trim() || !decision}
                                    onClick={onVoteSubmit}
                                    className={`btn btn-block rounded-2xl h-14 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                        comment.trim() && decision ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white shadow-lg shadow-purple-500/30 hover:scale-[1.02]' : 'btn-disabled bg-white/5 border-white/10 text-gray-500'
                                    }`}
                                >
                                    Valider mon vote
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ligne 2 : Commentaire + Signalement */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                <div className="w-full lg:w-3/4">
                    <div className="card bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text text-lg font-bold text-white uppercase tracking-widest">💬 Commentaire</span>
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Votre avis sur ce film..."
                                rows={3}
                                className="textarea textarea-bordered w-full bg-black/40 border-white/10 text-white rounded-xl resize-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 flex items-center">
                    <button onClick={() => document.getElementById('report_modal').showModal()} className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 w-full h-20 rounded-2xl">
                        Signaler un problème
                    </button>
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
    );
}