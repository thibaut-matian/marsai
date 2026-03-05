import { Medal } from "lucide-react";

/**
 * Barre de progression du nombre de finalistes sélectionnés.
 */
const FinalistCounter = ({ finalistCount, FINALIST_LIMIT, limitReached }) => (
  <div
    className={`mb-4 flex items-center justify-between px-5 py-3 rounded-2xl border ${
      limitReached
        ? "bg-yellow-400/10 border-yellow-400/30"
        : "bg-white/5 border-white/10"
    }`}
  >
    <div className="flex items-center gap-2">
      <Medal size={16} className={limitReached ? "text-yellow-400" : "text-gray-400"} />
      <span className="text-sm font-semibold text-white">Finalistes sélectionnés</span>
    </div>
    <div className="flex items-center gap-3">
      {/* Barre de progression */}
      <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            limitReached ? "bg-yellow-400" : "bg-primary"
          }`}
          style={{ width: `${Math.min((finalistCount / FINALIST_LIMIT) * 100, 100)}%` }}
        />
      </div>
      <span
        className={`text-sm font-bold tabular-nums ${
          limitReached ? "text-yellow-400" : "text-white"
        }`}
      >
        {finalistCount} / {FINALIST_LIMIT}
      </span>
      {limitReached && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-semibold">
          Complet
        </span>
      )}
    </div>
  </div>
);

export default FinalistCounter;
