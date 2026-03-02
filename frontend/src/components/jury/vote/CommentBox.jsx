/**
 * Zone de commentaire + bouton de signalement
 */
const CommentBox = ({ comment, setComment, onOpenReport }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
      {/* Textarea commentaire */}
      <div className="w-full lg:w-3/4">
        <div className="card bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl">
          <div className="card-body">
            <label className="label">
              <span className="label-text text-lg font-bold text-white uppercase tracking-widest">
                💬 Commentaire
              </span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre avis sur ce film... (qualité technique, originalité, utilisation de l'IA, etc.)"
              rows={3}
              maxLength={500}
              className="textarea textarea-bordered w-full bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 rounded-xl resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{comment.length}/500</span>
              {comment && (
                <button
                  onClick={() => setComment("")}
                  className="btn btn-ghost btn-xs text-gray-500 hover:text-red-400"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton signaler */}
      <div className="w-full lg:w-1/4 flex items-center">
        <button
          onClick={onOpenReport}
          className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white w-full h-20 gap-3 text-base rounded-2xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Signaler un problème
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
