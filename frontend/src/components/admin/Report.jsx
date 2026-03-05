import React from 'react';
import { Eye, Trash2, AlertOctagon, User, Video, Mail, X, Send } from "lucide-react";
import useReport from "../../hooks/useReport";
import usePagination from "../../hooks/usePagination";
import PaginationControls from "../pagination";
import ContactModal from "../features/contactModal";
import ActionButton from "./actionButton";
import ModalDetails from "../features/movies/ModalDetails";

const ReportTable = () => {
  const {reports, handleDelete, handleSendEmail, selectedReport, setSelectedReport, handleOpenModal, handleOpenDetail, handleCloseDetail, isDetailOpen,
  detailMovie } = useReport();

  // On récupère tout l'objet pagination
  const pagination = usePagination(reports, 10);

  return (
    <div className="p-6 relative">
      <div className="flex items-center gap-3 mb-6">
        <AlertOctagon className="text-error" size={32} />
        <h2 className="text-2xl font-bold text-white">Signalements en attente</h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1E1E24]/90 backdrop-blur-md shadow-2xl">
        <table className="table w-full">
          <thead className="text-gray-400 bg-black/40">
            <tr className="border-b border-white/10 text-sm uppercase tracking-wider">
              <th className="bg-transparent py-5">Vidéo</th>
              <th className="bg-transparent">Réalisateur</th>
              <th className="bg-transparent text-center">Raison</th>
              <th className="bg-transparent text-center">Actions</th>
            </tr>
          </thead>
          
         <tbody className="text-white">
            {pagination.currentItems.map((report) => (
              <tr key={report.id} className="...">
                <td>
                  <div className="flex items-center gap-3">
                    <Video size={20} className="text-red-500" />
                    <div>
                      {/* On utilise les noms renvoyés par le controller */}
                      <div className="font-bold text-md">{report.movie?.title || "Titre inconnu"}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-gray-300 italic">
                    <User size={14} /> {report.movie?.director || "Inconnu"}
                  </div>
                </td>
                <td className="text-center">
                  <span className="badge badge-outline border-error/50 text-error uppercase text-[10px]">
                    {report.reason}
                  </span>
                </td>
                <td>

<      div className="flex justify-center items-center gap-2">
      <ActionButton 
    icon={Eye} 
    variant="blue" 
    onClick={() => handleOpenDetail(report.movie)} 
    title="Voir les détails"
  />
  
<ActionButton 
  icon={Mail} 
  variant="amber" 
  onClick={() => {
    
    setSelectedReport({
      id: report.movie?.id,
      email: report.email,
      title: report.movie?.title || "Titre inconnu",
      director: report.movie?.director || "Réalisateur inconnu",
      status: 3,
      comment: report.comment 

    });
  }} 
  title="Contacter"
/>
  
  <ActionButton 
  icon={Trash2} 
  variant="red" 
  onClick={() => handleDelete(report.id, report.movie?.id, report.movie?.title)} 
  title="Supprimer"
/>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- UTILISATION DU COMPOSANT GÉNÉRIQUE --- */}
        <PaginationControls pagination={pagination} label="signalements" />
      </div>

      {/* MODALE DE CONTACT */}
    <ContactModal 
  isOpen={!!selectedReport}
  data={selectedReport} 
  onClose={() => setSelectedReport(null)} 
  onSend={handleSendEmail}
/>

{isDetailOpen && detailMovie && (
  <ModalDetails 
    // Si detailMovie est l'objet film, on prend .id. 
    // Si detailMovie est déjà l'ID (simple chiffre), on le prend direct.
    movieId={detailMovie.id || detailMovie} 
    isOpen={isDetailOpen}
    onClose={handleCloseDetail} 
  />
)}
    </div>
  );
};

export default ReportTable;