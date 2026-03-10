/**
 * Zone de commentaire
 */
const CommentBox = ({ comment, setComment }) => {
  return (
    <div className="w-full">
      <div className="card bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl">
        <div className="card-body">
          <label className="label">              <span className="label-text text-lg font-bold text-white uppercase tracking-widest">
                Commentaire
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
  );
};

export default CommentBox;
