import { useEffect, useMemo, useState } from "react";
import getAPI from "../services/getAPI";

export default function useListFilm() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [finalistFilter, setFinalistFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [detailMovie, setDetailMovie] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // === SÉLECTION FINALISTE ===
  const [finalistModal, setFinalistModal] = useState(null);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectError, setSelectError] = useState(null);
  const [confirmInput, setConfirmInput] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const FINALIST_LIMIT = 50;
  const finalistCount = selectedIds.length;
  const limitReached = finalistCount >= FINALIST_LIMIT;

  // Sync au chargement des films
  useEffect(() => {
    setSelectedIds((movies || []).filter((m) => m.isSelected).map((m) => m.id));
  }, [movies]);

  const openFinalistModal = (film) => {
    setConfirmInput("");
    setSelectError(null);
    setFinalistModal(film);
  };

  const closeFinalistModal = () => {
    setFinalistModal(null);
    setConfirmInput("");
    setSelectError(null);
  };

  const handleSelectConfirm = async () => {
    if (!finalistModal) return;
    const input = confirmInput.trim().toLowerCase();
    const frTitle = (finalistModal.title || "").trim().toLowerCase();
    const enTitle = (finalistModal.enTitle || "").trim().toLowerCase();

    const isValid = input === frTitle || (enTitle && input === enTitle);
    if (!isValid) {
      setSelectError(
        "Le titre saisi ne correspond pas. Retapez le titre exact (français ou anglais).",
      );
      return;
    }
    setSelectLoading(true);
    setSelectError(null);
    try {
      await getAPI.selectMovie(finalistModal.id);
      setSelectedIds((prev) => [...prev, finalistModal.id]);
      closeFinalistModal();
    } catch (err) {
      setSelectError(
        err.response?.data?.message || "Erreur lors de la sélection.",
      );
    } finally {
      setSelectLoading(false);
    }
  };

  const isConfirmInputValid = () => {
    if (!finalistModal) return false;
    const input = confirmInput.trim().toLowerCase();
    const fr = (finalistModal.title || "").trim().toLowerCase();
    const en = (finalistModal.enTitle || "").trim().toLowerCase();
    return input === fr || (en && input === en);
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (movie) => {
    setDetailMovie(movie);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setDetailMovie(null);
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getAPI.getAdminMovies();
      setMovies(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Impossible de charger les films.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    let result = movies;

    if (statusFilter !== "all") {
      result = result.filter(
        (film) => String(film.status) === String(statusFilter),
      );
    }

    if (finalistFilter === "finalist") {
      result = result.filter((film) => film.isSelected);
    } else if (finalistFilter === "not-finalist") {
      result = result.filter((film) => !film.isSelected);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (film) =>
          film.title?.toLowerCase().includes(q) ||
          film.director?.toLowerCase().includes(q) ||
          film.vo_desc?.toLowerCase().includes(q) ||
          film.description?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [movies, statusFilter, searchQuery, finalistFilter]);

  const getBadgeClass = (status) => {
    const classes = {
      1: "bg-green-500/20 border border-green-500/50 text-green-400",
      2: "bg-red-500/20 border border-red-500/50 text-red-400",
      3: "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400",
      4: "bg-orange-500/20 border border-orange-500/50 text-orange-400",
      5: "bg-white/5 border border-white/15 text-gray-400",
    };
    return classes[status] || "bg-white/5 border border-white/15 text-gray-400";
  };

  const getStatusText = (status) => {
    const labels = {
      1: "Validé",
      2: "Refusé",
      3: "À discuter",
      4: "Signalé",
      5: "Pas encore noté",
    };
    return labels[status] || "Inconnu";
  };

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = (film) => {
    setDeleteTarget(film);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await getAPI.deleteMovie(deleteTarget.id);
      setMovies((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    movies,
    filteredMovies,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    finalistFilter,
    setFinalistFilter,
    loading,
    error,
    getBadgeClass,
    getStatusText,
    selectedMovie,
    setSelectedMovie,
    handleDelete,
    confirmDelete,
    deleteTarget,
    setDeleteTarget,
    deleteLoading,
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
    detailMovie,
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail,
    refreshMovies: fetchMovies,
    // Finaliste
    finalistModal,
    openFinalistModal,
    closeFinalistModal,
    selectLoading,
    selectError,
    setSelectError,
    confirmInput,
    setConfirmInput,
    selectedIds,
    FINALIST_LIMIT,
    finalistCount,
    limitReached,
    handleSelectConfirm,
    isConfirmInputValid,
  };
}
