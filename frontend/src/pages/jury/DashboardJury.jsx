import { useState, useEffect } from "react";
import NavbarJury from "../../components/layout/NavbarJury.jsx";
import useJuryAuth from "../../hooks/useJuryAuth.js";
import ProgressCard from "../../components/jury/ProgressCard.jsx";
import TimeRemainingCard from "../../components/jury/TimeRemainingCard.jsx";
import DashboardActions from "../../components/jury/DashboardActions.jsx";
import getAPI from "../../services/getAPI.jsx";

export default function DashboardJury() {
  const { userInfo } = useJuryAuth();
  const [progress, setProgress] = useState({ watchedFilms: 0, totalFilms: 0, percentage: 0 });
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setProgressLoading(true);
        const response = await getAPI.getJuryProgress();
        if (response.data?.success) {
          setProgress(response.data.data);
        }
      } catch (err) {
        console.error("Erreur chargement progression jury:", err);
      } finally {
        setProgressLoading(false);
      }
    };
    fetchProgress();
  }, []);

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