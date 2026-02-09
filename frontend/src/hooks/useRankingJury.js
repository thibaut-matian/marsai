import { useState } from "react";

export function useRankingJury() {
  // SIMULATION DES DONNÉES
  const [myVotes, setMyVotes] = useState([
    {
      id: 1,
      title: "Chroniques du Silicium",
      director: "Léa Dubois",
      duration: "01:00",
      status: "validate",
      thumbnail: "bg-blue-900",
    },
    {
      id: 2,
      title: "L'Aube Synthétique",
      director: "Marc Veral",
      duration: "01:40",
      status: "discuss",
      thumbnail: "bg-purple-900",
    },
    {
      id: 3,
      title: "Echoes of Mars",
      director: "Sarah Connor",
      duration: "01:00",
      status: "validate",
      thumbnail: "bg-red-900",
    },
    {
      id: 4,
      title: "Glitch in the Matrix",
      director: "Neo",
      duration: "2:10",
      status: "discuss",
      thumbnail: "bg-green-900",
    },
  ]);

  const validatedFilms = myVotes.filter((film) => film.status === "validate");
  const discussedFilms = myVotes.filter((film) => film.status === "discuss");

  return { validatedFilms, discussedFilms };
}
