import { Mail, Shield, Power } from 'lucide-react';

export default function JuryCard({ jury, onClick }) {
  const isJuryActive = jury.isActive;
  const juryInitials = `${jury.firstname?.[0] || ''}${jury.lastname?.[0] || ''}`;

  return (
    <article
      onClick={onClick}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-105"
      role="button"
      tabIndex={0}
      aria-label={`Voir les détails de ${jury.firstname} ${jury.lastname}`}
    >
      <div className="absolute top-4 right-4">
        <span 
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
            isJuryActive 
              ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
              : 'bg-red-500/20 text-red-300 border border-red-500/50'
          }`}
          aria-label={`Statut: ${isJuryActive ? 'Actif' : 'Inactif'}`}
        >
          <Power size={12} aria-hidden="true" />
          <span>{isJuryActive ? 'Actif' : 'Inactif'}</span>
        </span>
      </div>

      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:scale-110 transition-transform"
        aria-hidden="true"
      >
        {juryInitials}
      </div>

      <header>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">
          {jury.firstname} {jury.lastname}
        </h3>
        <address className="flex items-center gap-2 text-white/60 text-sm not-italic">
          <Mail size={14} aria-hidden="true" />
          <span className="truncate">{jury.email}</span>
        </address>
      </header>
    </article>
  );
}