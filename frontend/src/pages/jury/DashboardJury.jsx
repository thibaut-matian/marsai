import NavbarJury from "../../components/layout/NavbarJury.jsx";
import useProjectProgress from "../../hooks/useProjectProgress.js";
import useJuryAuth from "../../hooks/useJuryAuth.js";
import ProgressCard from "../../components/jury/ProgressCard.jsx";
import TimeRemainingCard from "../../components/jury/TimeRemainingCard.jsx";
import DashboardActions from "../../components/jury/DashboardActions.jsx";

export default function DashboardJury() {
  const { userInfo } = useJuryAuth();
  const { progress, loading: progressLoading } = useProjectProgress();

  return (
    <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
      <NavbarJury />

      <div className="pt-32 px-4 md:px-12 pb-20 container mx-auto max-w-6xl animate-fade-in">

        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bonjour,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {userInfo.firstName}
            </span>{" "}
          </h1>
          <p className="text-xl text-gray-400">Prêt(e) à découvrir les pépites de demain ?</p>
        </header>
        {/* PROGRESSION + TEMPS RESTANT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ProgressCard
            watchedFilms={progress.watchedFilms}
            totalFilms={progress.totalFilms}
            percentage={progress.percentage}
            loading={progressLoading}
          />
          <TimeRemainingCard remainingTime="3 jours" />
        </div>

        {/* ACTIONS */}
        <DashboardActions watchedFilms={progress.watchedFilms} />

      </div>
    </div>
  );
}