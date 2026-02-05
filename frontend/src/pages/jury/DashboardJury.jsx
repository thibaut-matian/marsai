import { useState } from "react";
import NavbarJury from "../../components/layout/NavbarJury.jsx";

import videoSample from "../../assets/videos/Teaser.mp4"; 

export default function DashboardJury() {
  const [decision, setDecision] = useState(null);


  const film = {
    // Identité & Contact
    director: {
      firstname: "Léa",
      lastname: "Dubois",
      profession: "Motion Designer",
      city: "Lyon",
      country: "France",
      socials: {
        instagram: "@lea_dbs_art",
        website: "www.lea-dubois.com"
      }
    },
    // Film & Tech
    title: "Chroniques du Silicium", // filmTitleOriginal
    duration: 60, // filmDuration (en secondes)
    aiClassification: "HYBRID", // FULL ou HYBRID
    aiStack: "Midjourney v6, Runway Gen-2, ElevenLabs, After Effects", // aiStack
    aiMethodology: "Génération des arrière-plans sur MJ, incrustation d'acteurs réels filmés sur fond vert, puis style transfer via Runway.", // aiMethodology
    // Textes
    synopsis: "Dans un futur où la mémoire est stockée sur quartz, une archiviste découvre une faille dans l'histoire officielle de l'humanité. Elle doit choisir entre révéler la vérité ou préserver la paix sociale.", // synopsisFR
    directorNote: "Je voulais explorer la texture du souvenir numérique. L'aspect hybride sert le propos : le réel (acteurs) se perd dans l'artificiel (décors IA).", // directorNoteFR
    // Équipe (Collaborateurs)
    team: [
        { role: "Sound Designer", firstname: "Marc", lastname: "Veral" },
        { role: "Voix Off", firstname: "Sarah", lastname: "Connor" }
    ]
  };

  // Fonction utilitaire pour formater la durée 
  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
      
      <NavbarJury />

      <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">
        
        {/* --- BLOC PRINCIPAL : VIDÉO + ACTIONS --- */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
            
            {/* 1. LECTEUR VIDÉO */}
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

            {/* 2. VERDICT (Panneau Latéral) */}
            <div className="w-full lg:w-1/4 flex flex-col justify-center">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center sticky top-28">
                    <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Votre Verdict</h2>
                    <div className="flex flex-col gap-6">
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
            </div>
        </div>

        {/* --- SECTION INFOS DU FORMULAIRE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLONNE GAUCHE (2/3) : Synopsis, Tech, Métho */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. SYNOPSIS & NOTE */}
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

                {/* 2. TECH & MÉTHODOLOGIE (Champs spécifiques IA) */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                        <span className="text-xl">🛠</span> Fabrication & IA
                    </h3>
                    
                    <div className="mb-6">
                        <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Stack Technologique</p>
                        <div className="flex flex-wrap gap-2">
                            {film.aiStack.split(',').map((tool, i) => (
                                <span key={i} className="bg-black/40 px-3 py-1 rounded-lg border border-white/10 text-blue-200 text-sm">
                                    {tool.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Méthodologie Créative</p>
                        <p className="text-sm text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
                            {film.aiMethodology}
                        </p>
                    </div>
                </div>
            </div>

            {/* COLONNE DROITE (1/3) : Réalisateur & Équipe */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* 3. LE RÉALISATEUR */}
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

                {/* 4. ÉQUIPE / CRÉDITS (Données dynamiques du form) */}
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
    </div>
  );
}

// Composant Bouton Verdict
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