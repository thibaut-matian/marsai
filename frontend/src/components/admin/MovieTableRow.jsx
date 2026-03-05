import {
  Clapperboard,
  Eye,
  Mail,
  Trash2,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Medal,
} from "lucide-react";

/**
 * Ligne de tableau pour un film dans la liste admin.
 */
const MovieTableRow = ({
  film,
  getBadgeClass,
  getStatusText,
  selectedIds,
  limitReached,
  onOpenDetail,
  onOpenContact,
  onOpenFinalist,
  onDelete,
}) => {
  const isFinalist = selectedIds.includes(film.id);

  const renderFinalistButton = () => {
    if (isFinalist) {
      return (
        <div
          className="btn btn-square shadow-none btn-sm bg-yellow-400/20 border border-yellow-400 text-yellow-400 cursor-default"
          title="Finaliste sélectionné"
        >
          <Medal size={18} />
        </div>
      );
    }
    if (film.status === 2) {
      // Refusé → pas éligible
      return null;
    }
    if (limitReached) {
      return (
        <div
          className="btn btn-square shadow-none btn-sm bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
          title="Limite de 50 finalistes atteinte"
        >
          <Medal size={18} />
        </div>
      );
    }
    if (film.status === 5) {
      return (
        <div
          className="btn btn-square shadow-none btn-sm bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
          title="Film pas encore noté par le jury"
        >
          <Medal size={18} />
        </div>
      );
    }
    return (
      <button
        className="btn btn-square shadow-none btn-sm bg-white/5 hover:bg-yellow-400/20 border border-white/20 hover:border-yellow-400 text-gray-500 hover:text-yellow-400 transition-all"
        onClick={() => onOpenFinalist(film)}
        title="Sélectionner comme finaliste"
      >
        <Medal size={18} />
      </button>
    );
  };

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-all">
      {/* Titre */}
      <td className="align-middle py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Clapperboard size={20} />
          </div>
          <span className="font-bold text-sm md:text-md truncate max-w-[150px] md:max-w-none">
            {film.title}
          </span>
        </div>
      </td>

      {/* Réalisateur */}
      <td className="align-middle">
        <div className="flex items-center gap-2 text-gray-300 italic text-sm">
          <User size={14} className="text-gray-500 flex-shrink-0" />
          <span className="truncate">{film.director?.trim()}</span>
        </div>
      </td>

      {/* Description */}
      <td className="align-middle max-w-md italic text-gray-400 text-sm">
        <div className="line-clamp-1">{film.vo_desc || film.description}</div>
      </td>

      {/* Votes jury */}
      <td className="text-center align-middle">
        {film.votes?.total > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
              <ThumbsUp size={13} />
              {film.votes.like}
            </span>
            <span className="flex items-center gap-1 text-red-400 text-xs font-semibold">
              <ThumbsDown size={13} />
              {film.votes.dislike}
            </span>
            <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
              <MessageCircle size={13} />
              {film.votes.discuss}
            </span>
          </div>
        ) : (
          <span className="text-gray-600 text-xs italic">Aucun vote</span>
        )}
      </td>

      {/* Statut */}
      <td className="text-center align-middle">
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeClass(film.status)}`}
        >
          {getStatusText(film.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="align-middle">
        <div className="flex justify-center items-center gap-2">
          <button
            className="btn btn-square shadow-none btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white"
            onClick={() => onOpenDetail(film)}
          >
            <Eye size={18} />
          </button>
          <button
            className="btn btn-square shadow-none btn-sm bg-amber-500/20 hover:bg-amber-500 border border-amber-500 text-amber-500 hover:text-black transition-all"
            onClick={() => onOpenContact(film)}
          >
            <Mail size={18} />
          </button>

          {renderFinalistButton()}

          <button
            className="btn btn-square shadow-none btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
            onClick={() => onDelete(film)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MovieTableRow;
