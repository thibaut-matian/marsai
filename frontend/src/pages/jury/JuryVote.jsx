// Imports UI
import NavbarJury from "../../components/layout/NavbarJury.jsx";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/jury/vote/VideoPlayer.jsx";
import VerdictPanel from "../../components/jury/vote/VerdictPanel.jsx";
import CommentBox from "../../components/jury/vote/CommentBox.jsx";
import FilmInfoCard from "../../components/jury/vote/FilmInfoCard.jsx";
import ReportModal from "../../components/jury/vote/ReportModal.jsx";

// Import de la Logique
import { useJuryVote } from "../../hooks/useJuryVote";

export default function JuryVote() {
  const {
    decision,
    setDecision,
    film,
    loading,
    allWatched,
    noAssignment,
    error,
    loadNextMovie,
    formatDuration,
    comment,
    setComment,
    voteSubmitted,
    voteError,
    voteLoading,
    handleVoteSubmit,
  } = useJuryVote();

  return (
    <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">

      <NavbarJury />

      {/* CHARGEMENT */}
      {loading && (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-purple-400"></span>
            <p className="mt-4 text-gray-400">Chargement du film suivant…</p>
          </div>
        </div>
      )}

      {/* ERREUR */}
      {!loading && error && (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">❌ Impossible de charger le film</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* AUCUN FILM ASSIGNÉ */}
      {!loading && noAssignment && (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Pas de films assignés pour le moment.
            </h2>
            <p className="text-gray-400 mb-8">
              L'administrateur n'a pas encore assigné de films à votre compte. Revenez plus tard.
            </p>
            <Link
              to="/jury/DashboardJury"
              className="btn bg-white/10 border border-white/20 text-white rounded-2xl px-8 hover:bg-white/20 transition-all"
            >
              ← Retour au dashboard
            </Link>
          </div>
        </div>
      )}

      {/* TOUS LES FILMS VUS */}
      {!loading && allWatched && (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Bravo, tu as tout vu !
            </h2>
            <p className="text-gray-400 mb-8">
              Tu as visionné et noté tous les films. Consulte ton classement.
            </p>
            <Link
              to="/jury/RankingJury"
              className="btn bg-linear-to-r from-blue-600 to-purple-600 border-0 text-white rounded-2xl px-8"
            >
              Voir mon classement →
            </Link>
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      {!loading && !error && film && (
        <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">

          {/* Vidéo + Verdict */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
              <VideoPlayer videoUrl={film.videoUrl} youtubeId={film.youtubeId} />
              <VerdictPanel
                decision={decision}
                setDecision={setDecision}
                comment={comment}
                onSubmit={handleVoteSubmit}
                voteSubmitted={voteSubmitted}
                voteLoading={voteLoading}
                voteError={voteError}
                onOpenReport={() => document.getElementById("report_modal").showModal()}
              />
            </div>

            {/* Commentaire */}
            <CommentBox comment={comment} setComment={setComment} />
          </div>

          {/* Informations du film */}
          <FilmInfoCard film={film} formatDuration={formatDuration} />
        </div>
      )}

      {/* Modale de signalement */}
      <ReportModal movieId={film?.id} onReported={loadNextMovie} />
    </div>
  );
}
