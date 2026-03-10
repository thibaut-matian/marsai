/**
 * Bouton de verdict individuel (J'aime / À discuter / Je n'aime pas)
 */
const VerdictButton = ({ type, icon, label, sublabel, current, set, color }) => {
  const isActive = current === type;

  const colorStyles = {
    success: {
      active: "bg-success/20 border-success text-success shadow-lg shadow-success/20",
      hover: "hover:bg-success/10 hover:border-success/50",
      icon: "bg-success text-success-content",
    },
    warning: {
      active: "bg-warning/20 border-warning text-warning shadow-lg shadow-warning/20",
      hover: "hover:bg-warning/10 hover:border-warning/50",
      icon: "bg-warning text-warning-content",
    },
    error: {
      active: "bg-error/20 border-error text-error shadow-lg shadow-error/20",
      hover: "hover:bg-error/10 hover:border-error/50",
      icon: "bg-error text-error-content",
    },
  };

  const styles = colorStyles[color];

  return (
    <button
      onClick={() => set(type)}
      className={`relative flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-300 group
        ${isActive ? styles.active : `bg-white/5 border-white/10 text-gray-400 ${styles.hover}`}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300
        ${isActive ? styles.icon : "bg-white/10 text-gray-400 group-hover:bg-white/20"}`}>
        {icon}
      </div>
      <div className="text-left flex-1">
        <p className={`font-bold text-sm ${isActive ? "" : "text-white"}`}>{label}</p>
        <p className={`text-xs ${isActive ? "opacity-70" : "text-gray-500"}`}>{sublabel}</p>
      </div>
      {isActive && (
        <div className={`w-6 h-6 rounded-full ${styles.icon} flex items-center justify-center`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};

/**
 * Panneau de verdict : boutons de vote + bouton valider + messages feedback
 */
const VerdictPanel = ({ decision, setDecision, comment, onSubmit, voteSubmitted, voteLoading, voteError, onOpenReport }) => {
  return (
    <div className="w-full lg:w-1/4">
      <div className="card bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 h-full rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 px-6 py-4 border-b border-white/10">
          <h2 className="text-center text-sm font-bold text-white uppercase tracking-[0.2em]">
            Votre Verdict
          </h2>
        </div>

        <div className="card-body justify-center gap-4 p-5">
          <VerdictButton type="validate" icon="✓" label="J'aime"        sublabel="Sélectionner" current={decision} set={setDecision} color="success" />
          <VerdictButton type="discuss"  icon="?" label="À discuter"    sublabel="Hésitant"     current={decision} set={setDecision} color="warning" />
          <VerdictButton type="refuse"   icon="✕" label="Je n'aime pas" sublabel="Refuser"      current={decision} set={setDecision} color="error"   />

          <div className="divider my-1 before:bg-white/10 after:bg-white/10"></div>

          {/* Confirmation */}
          {voteSubmitted && (
            <div className="alert bg-green-500/20 border border-green-500/30 py-3 px-4 rounded-xl animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-green-400 shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-400 font-medium">Vote enregistré !</span>
            </div>
          )}

          {/* Erreur */}
          {voteError && (
            <div className="alert bg-red-500/20 border border-red-500/30 py-3 px-4 rounded-xl">
              <span className="text-sm text-red-400">{voteError}</span>
            </div>
          )}

          {/* Bouton valider */}
          {!voteSubmitted && (
            <button
              disabled={!comment.trim() || !decision || voteLoading}
              onClick={onSubmit}
              className={`btn btn-block rounded-2xl h-14 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                comment.trim() && decision && !voteLoading
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
                  : "btn-disabled bg-white/5 border-white/10 text-gray-500"
              }`}
            >
              {voteLoading ? <span className="loading loading-spinner loading-sm"></span> : "Valider mon vote"}
            </button>
          )}

          {/* Lien signalement */}
          {!voteSubmitted && (
            <button
              onClick={onOpenReport}
              className="flex items-center justify-center gap-1.5 text-xs text-red-500 hover:text-red-400 transition-colors w-full"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="underline underline-offset-2 font-medium">Signaler un problème</span>
            </button>
          )}

          {/* Rappel commentaire manquant */}
          {!comment.trim() && decision && !voteSubmitted && (
            <div className="alert bg-warning/10 border border-warning/20 py-2 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs text-warning">Commentaire requis</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerdictPanel;
