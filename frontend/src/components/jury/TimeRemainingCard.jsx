/**
 * Carte "Temps Restant" avant la clôture des votes
 */
const TimeRemainingCard = ({ remainingTime }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-white/20 transition-all">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-2xl mb-4 text-red-400">
        ⏳
      </div>
      <h3 className="text-lg font-bold text-gray-300">Temps Restant</h3>
      <p className="text-3xl font-bold text-white mt-2">{remainingTime}</p>
      <p className="text-xs text-gray-500 mt-2">Avant la clôture des votes</p>
    </div>
  );
};

export default TimeRemainingCard;
