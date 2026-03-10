import { X, SlidersHorizontal, Medal, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import SearchBar from '../ui/SearchBar';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: '1',   label: 'Validés'          },
  { value: '2',   label: 'Refusés'          },
  { value: '3',   label: 'À discuter'       },
  { value: '4',   label: 'Signalés'         },
  { value: '5',   label: 'Pas encore notés' },
];

const FINALIST_OPTIONS = [
  { value: 'all',          label: 'Tous les films',  dot: 'bg-gray-400'   },
  { value: 'finalist',     label: 'Finalistes',      dot: 'bg-yellow-400' },
  { value: 'not-finalist', label: 'Hors sélection',  dot: 'bg-gray-600'   },
];

const DOT_COLOR = {
  all: 'bg-gray-400',
  1:   'bg-green-400',
  2:   'bg-red-400',
  3:   'bg-yellow-400',
  4:   'bg-orange-400',
  5:   'bg-gray-600',
};

/* Dropdown générique auto-fermant */
function Dropdown({ trigger, children, open, onToggle, dropdownRef }) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#1E1E24] text-sm text-white cursor-pointer hover:border-white/30 transition-all select-none"
      >
        {trigger}
        <ChevronDown
          size={13}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-50 mt-1 p-1 rounded-xl bg-[#1a1a22] border border-white/10 shadow-2xl min-w-[180px]">
          {children}
        </ul>
      )}
    </div>
  );
}

const Filtre = ({
  statusFilter, setStatusFilter,
  filteredMovies, movies,
  searchQuery, setSearchQuery,
  finalistFilter, setFinalistFilter,
}) => {
  const [statusOpen,   setStatusOpen]   = useState(false);
  const [finalistOpen, setFinalistOpen] = useState(false);

  const statusRef   = useRef(null);
  const finalistRef = useRef(null);

  /* Fermeture au clic extérieur */
  useEffect(() => {
    const handleClick = (e) => {
      if (statusRef.current   && !statusRef.current.contains(e.target))   setStatusOpen(false);
      if (finalistRef.current && !finalistRef.current.contains(e.target)) setFinalistOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeLabel         = STATUS_OPTIONS.find(o => o.value === statusFilter)?.label    || 'Tous les statuts';
  const activeFinalistLabel = FINALIST_OPTIONS.find(o => o.value === finalistFilter)?.label || 'Tous les films';
  const finalistCount       = movies.filter(m => m.isSelected).length;
  const hasActiveFilter     = searchQuery || statusFilter !== 'all' || finalistFilter !== 'all';

  return (
    <div className="px-4 sm:px-6 pt-5 pb-3 space-y-3">

      {/* Recherche */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Rechercher un film, réalisateur…" />

      {/* Filtres + compteur */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />

          {/* Dropdown Statut */}
          <Dropdown
            dropdownRef={statusRef}
            open={statusOpen}
            onToggle={() => { setStatusOpen(v => !v); setFinalistOpen(false); }}
            trigger={
              <>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLOR[statusFilter] || 'bg-gray-400'}`} />
                <span className="hidden sm:inline">{activeLabel}</span>
                <span className="sm:hidden">{statusFilter === 'all' ? 'Statut' : activeLabel}</span>
              </>
            }
          >
            {STATUS_OPTIONS.map(opt => (
              <li key={opt.value}>
                <button
                  onClick={() => { setStatusFilter(opt.value); setStatusOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
                    statusFilter === opt.value ? 'bg-primary/20 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLOR[opt.value] || 'bg-gray-400'}`} />
                  {opt.label}
                  {statusFilter === opt.value && <Check size={13} className="ml-auto text-primary" />}
                </button>
              </li>
            ))}
          </Dropdown>

          {/* Dropdown Sélection finaliste */}
          <Dropdown
            dropdownRef={finalistRef}
            open={finalistOpen}
            onToggle={() => { setFinalistOpen(v => !v); setStatusOpen(false); }}
            trigger={
              <span className={`flex items-center gap-2 ${finalistFilter === 'finalist' ? 'text-yellow-300' : ''}`}>
                <Medal size={13} className={finalistFilter === 'finalist' ? 'text-yellow-400' : 'text-gray-400'} />
                <span className="hidden sm:inline">{activeFinalistLabel}</span>
                <span className="sm:hidden">{finalistFilter === 'all' ? 'Sélection' : activeFinalistLabel}</span>
                {finalistFilter === 'finalist' && (
                  <span className="text-xs bg-yellow-400/20 text-yellow-400 font-bold px-1.5 py-0.5 rounded-md leading-none">{finalistCount}</span>
                )}
              </span>
            }
          >
            {FINALIST_OPTIONS.map(opt => (
              <li key={opt.value}>
                <button
                  onClick={() => { setFinalistFilter(opt.value); setFinalistOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
                    finalistFilter === opt.value ? 'bg-yellow-400/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.dot}`} />
                  {opt.label}
                  {opt.value === 'finalist' && (
                    <span className="ml-auto text-xs text-yellow-400 font-bold">{finalistCount}/50</span>
                  )}
                  {finalistFilter === opt.value && opt.value !== 'finalist' && (
                    <Check size={13} className="ml-auto text-yellow-400" />
                  )}
                </button>
              </li>
            ))}
          </Dropdown>
        </div>

        {/* Compteur */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm self-start sm:self-auto whitespace-nowrap">
          <span className="text-primary font-bold">{filteredMovies.length}</span>
          <span className="text-gray-500">/ {movies.length} films</span>
        </div>
      </div>

      {/* Tags actifs */}
      {hasActiveFilter && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-500">Filtres :</span>
          {searchQuery && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/20 border border-primary/30 text-primary text-xs font-medium">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-white ml-0.5"><X size={11} /></button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
              {activeLabel}
              <button onClick={() => setStatusFilter('all')} className="hover:text-white ml-0.5"><X size={11} /></button>
            </span>
          )}
          {finalistFilter !== 'all' && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-medium">
              <Medal size={10} />
              {activeFinalistLabel}
              <button onClick={() => setFinalistFilter('all')} className="hover:text-white ml-0.5"><X size={11} /></button>
            </span>
          )}
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('all'); setFinalistFilter('all'); }}
            className="text-xs text-gray-500 hover:text-red-400 underline transition-colors"
          >
            Effacer tout
          </button>
        </div>
      )}
    </div>
  );
};

export default Filtre;
