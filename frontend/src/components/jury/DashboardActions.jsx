import { Link } from "react-router-dom";

/**
 * Bloc des deux boutons d'action du dashboard :
 * - Commencer / Reprendre la session de vote
 * - Voir mon classement
 */
const DashboardActions = ({ watchedFilms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* BOUTON LANCER LA SESSION */}
      <Link
        to="/jury/JuryVote"
        className="group relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1 overflow-hidden transition-transform hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity"></div>
        <div className="bg-[#100b18] rounded-[22px] h-full p-8 flex items-center justify-between relative z-10 group-hover:bg-transparent transition-colors">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {watchedFilms === 0 ? "Commencer les votes" : "Reprendre la session"}
            </h3>
            <p className="text-gray-400 group-hover:text-white/80 transition-colors">
              Visionner le film suivant
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white text-white group-hover:text-purple-600 transition-all">
            <svg className="w-8 h-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </Link>

      {/* BOUTON VOIR CLASSEMENT */}
      <Link
        to="/jury/RankingJury"
        className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between hover:bg-white/10 transition-all group"
      >
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Mon Classement</h3>
          <p className="text-gray-400">Revoir mes notes et coups de cœur</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:border-blue-400 group-hover:text-blue-400 transition-all">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </Link>

    </div>
  );
};

export default DashboardActions;
