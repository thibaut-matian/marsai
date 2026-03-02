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
import { useState } from "react";
import getAPI from "../../services/getAPI.jsx";

export default function JuryVote() {
  const { decision, setDecision, film, loading, allWatched, error, loadNextMovie, formatDuration } = useJuryVote();

  const [comment, setComment] = useState("");
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  const handleVoteSubmit = async () => {
    const decisionMap = {
      validate: "j'aime",
      discuss: "à discuter",
      refuse: "je n'aime pas",
    };

    setVoteLoading(true);
    setVoteError(null);
    try {
      await getAPI.submitVote({
        movie_id: film.id,
        decision: decisionMap[decision],
        feedback: comment,
      });
      setVoteSubmitted(true);
      setComment("");
      setTimeout(() => {
        setVoteSubmitted(false);
        loadNextMovie();
      }, 1500);
    } catch (err) {
      console.error("Erreur soumission vote:", err);
      setVoteError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setVoteLoading(false);
    }
  };

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

      {/* TOUS LES FILMS VUS */}
      {!loading && allWatched && (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Bravo, tu as tout vu !
            </h2>
            <p className="text-gray-400 mb-8">Tu as visionné et noté tous les films. Consulte ton classement.</p>
            <Link to="/jury/RankingJury" className="btn bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white rounded-2xl px-8">
              Voir mon classement →
            </Link>
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL — uniquement si un film est chargé */}
      {!loading && !error && film && (
        <div className="pt-24 px-4 md:px-12 pb-20 container mx-auto max-w-7xl">

          {/* Vidéo + Verdict */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
              <VideoPlayer videoUrl={film.videoUrl} />
              <VerdictPanel
                decision={decision}
                setDecision={setDecision}
                comment={comment}
                onSubmit={handleVoteSubmit}
                voteSubmitted={voteSubmitted}
                voteLoading={voteLoading}
                voteError={voteError}
              />
            </div>

            {/* Commentaire + Signaler */}
            <CommentBox
              comment={comment}
              setComment={setComment}
              onOpenReport={() => document.getElementById("report_modal").showModal()}
            />
          </div>

          {/* Informations du film */}
          <FilmInfoCard film={film} formatDuration={formatDuration} />
        </div>
      )}

      {/* Modale de signalement */}
      <ReportModal movieId={film?.id} />
    </div>
  );
}
