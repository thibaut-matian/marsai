import { Link } from "react-router-dom";
import videoMars from "../assets/video/mars-intro.mp4"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION (PLEIN ÉCRAN MOBILE & DESKTOP) --- */}
      {/* h-[100dvh] = Hauteur exacte de l'écran mobile, barre d'adresse comprise */}
      <div className="relative w-full h-[100dvh] overflow-hidden">
        
        {/* 1. LA VIDÉO (Centrage mathématique parfait) */}
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
          src={videoMars}
          autoPlay
          loop
          muted
          playsInline 
          webkit-playsinline="true" 
        />

        {/* 2. LE FILTRE (Assombrit légèrement pour le contraste) */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>

        {/* 3. CONTENU : TIMELINE + BOUTON */}
        <div className="absolute bottom-8 md:bottom-16 left-0 w-full flex flex-col items-center gap-6 md:gap-10 z-20 animate-fade-in-up px-4">
            
            {/* --- TIMELINE RESPONSIVE --- */}
            <div className="relative flex items-center justify-between w-full max-w-[300px] md:max-w-[600px]">
                
                {/* Ligne de fond */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)] -z-10 rounded-full"></div>
                
                {/* PHASE 1 : INSCRIPTION */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative flex items-center justify-center">
                        <span className="absolute w-full h-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
                        <div className="relative w-4 h-4 md:w-5 md:h-5 bg-cyan-500 rounded-full shadow-[0_0_20px_#22d3ee] border-2 border-white"></div>
                    </div>
                    <span className="text-cyan-300 font-extrabold text-[10px] md:text-sm uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Inscriptions
                    </span>
                </div>

                {/* PHASE 2 : DÉLIBÉRATION */}
                <div className="flex flex-col items-center gap-2 opacity-80">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-900 rounded-full border-2 border-gray-400 shadow-md"></div>
                    <span className="text-white font-bold text-[10px] md:text-sm uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Délibération
                    </span>
                </div>

                {/* PHASE 3 : FESTIVAL */}
                <div className="flex flex-col items-center gap-2 opacity-80">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-900 rounded-full border-2 border-gray-400 shadow-md"></div>
                    <span className="text-white font-bold text-[10px] md:text-sm uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Festival
                    </span>
                </div>
            </div>

            {/* --- LE BOUTON --- */}
            <Link 
              to="/submission"
              className="
                group relative flex items-center gap-3 px-8 py-3 md:px-10 md:py-4
                text-lg md:text-xl font-bold text-white tracking-widest uppercase
                backdrop-blur-md bg-white/10 border border-white/40 rounded-full
                shadow-[0_0_20px_rgba(0,0,0,0.5)]
                hover:bg-white/20 hover:border-white/60 hover:scale-105
                transition-all duration-300 ease-out mb-4 md:mb-0
              "
            >
              <span className="relative z-10 drop-shadow-md">Soumettre un film</span>
              <span className="relative z-10 text-xl md:text-2xl group-hover:translate-x-2 transition-transform drop-shadow-md"></span>
            </Link>
        </div>

      </div>

      {/* --- LE RESTE DE LA PAGE --- */}
      <div className="py-16 md:py-24 bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white/50 uppercase tracking-widest text-sm">
            L'expérience MarsAI
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group p-6 md:p-8 rounded-3xl bg-gray-800/50 border border-white/5 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4">⚡️</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Rapide</h3>
                <p className="text-sm md:text-base text-gray-400">Candidature simplifiée en moins de 2 minutes.</p>
            </div>

            <div className="group p-6 md:p-8 rounded-3xl bg-gray-800/50 border border-white/5 hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4">🔒</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sécurisé</h3>
                <p className="text-sm md:text-base text-gray-400">Protection intégrale de vos droits d'auteur.</p>
            </div>

            <div className="group p-6 md:p-8 rounded-3xl bg-gray-800/50 border border-white/5 hover:border-pink-500/50 hover:bg-gray-800 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4">✨</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Visionnaire</h3>
                <p className="text-sm md:text-base text-gray-400">Le futur du cinéma commence ici.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}