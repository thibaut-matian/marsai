import { useState, useMemo } from 'react';

export const useJuryFilters = (juryList) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'notes' | 'date'

  // Filtrer et trier les jurys
  const filteredJuries = useMemo(() => {
    let result = [...juryList];

    // Filtrer par recherche (nom, prénom, email)
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (jury) =>
          jury.firstname?.toLowerCase().includes(search) ||
          jury.lastname?.toLowerCase().includes(search) ||
          jury.mail?.toLowerCase().includes(search)
      );
    }

    // Filtrer par statut
    if (statusFilter !== 'all') {
      result = result.filter((jury) => {
        if (statusFilter === 'active') return jury.isActive;
        if (statusFilter === 'inactive') return !jury.isActive;
        return true;
      });
    }

    // Trier
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.firstname} ${a.lastname}`.localeCompare(
            `${b.firstname} ${b.lastname}`
          );
        case 'notes':
          return (b.notesCount || 0) - (a.notesCount || 0);
        case 'date':
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });

    return result;
  }, [juryList, searchTerm, statusFilter, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredJuries,
  };
};