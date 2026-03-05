import NavbarJury from "../../components/layout/NavbarJury.jsx";
import { useRankingJury } from "../../hooks/useRankingJury";
import AccordionList from "../../components/jury/AccordionList";

export default function RankingJury() {
  const { validatedFilms, discussedFilms, refusedFilms, loading, error } = useRankingJury();

  return (
    <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
      <NavbarJury />

      <div className="pt-28 px-4 md:px-12 pb-20 container mx-auto max-w-7xl animate-fade-in">

        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Mon Classement
          </h1>
          <p className="text-gray-400">Cliquez sur les titres pour dérouler les listes.</p>
        </header>

        {/* CHARGEMENT */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <span className="loading loading-spinner loading-lg text-purple-400"></span>
          </div>
        )}

        {/* ERREUR */}
        {!loading && error && (
          <div className="flex justify-center items-center h-48">
            <p className="text-red-400">❌ Impossible de charger vos votes : {error}</p>
          </div>
        )}

        {/* AUCUN VOTE */}
        {!loading && !error && validatedFilms.length === 0 && discussedFilms.length === 0 && refusedFilms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg">Vous n'avez encore voté pour aucun film.</p>
            <p className="text-sm mt-2">Commencez la session de vote depuis le dashboard.</p>
          </div>
        )}

        {/* LISTES */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* COUPS DE CŒUR */}
            <AccordionList
              title="💚 Mes Coups de Cœur"
              films={validatedFilms}
              color="green"
              defaultOpen={true}
            />

            {/* À DISCUTER */}
            <AccordionList
              title="🤔 À Discuter / Hésitations"
              films={discussedFilms}
              color="yellow"
              defaultOpen={true}
            />

            {/* REFUSÉS — sur toute la largeur */}
            <div className="lg:col-span-2">
              <AccordionList
                title="❌ Refusés"
                films={refusedFilms}
                color="red"
                defaultOpen={false}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}