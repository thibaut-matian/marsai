import NavbarJury from "../../components/layout/NavbarJury.jsx";
// 1. Import du Cerveau
import { useRankingJury } from "../../hooks/useRankingJury";
// 2. Import de la Brique UI
import AccordionList from "../../components/jury/AccordionList";

export default function RankingJury() {
  // On récupère les listes depuis le hook
  const { validatedFilms, discussedFilms } = useRankingJury();

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

        {/* GRILLE CÔTE À CÔTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* LISTE 1 : VALIDÉS */}
            <AccordionList 
                title="💚 Mes Coups de Cœur" 
                films={validatedFilms} 
                color="green" 
                defaultOpen={true} 
            />

            {/* LISTE 2 : À DISCUTER */}
            <AccordionList 
                title="🤔 À Discuter / Hésitations" 
                films={discussedFilms} 
                color="yellow" 
                defaultOpen={true} 
            />

        </div>
      </div>
    </div>
  );
}