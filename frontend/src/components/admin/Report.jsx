import React from 'react';
import { Eye, Trash2, AlertOctagon, User, Video, Mail, X, Send } from "lucide-react";
import useReport from "../../hooks/useReport";
import usePagination from "../../hooks/usePagination";
import PaginationControls from "../pagination";
import ContactModal from "../features/contactModal";

const ReportTable = () => {
  const { reports, handleDelete, handleSendEmail, selectedReport, setSelectedReport } = useReport();

  // On récupère tout l'objet pagination
  const pagination = usePagination(reports, 10);

  return (
    <div className="p-6 bg-[#14141b] relative">
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
            {/* On utilise pagination.currentItems pour n'afficher que les 20 du moment */}
            {pagination.currentItems.map((report) => (
              <tr key={report.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                      <Video size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-md">{report.titre}</div>
                      <div className="text-xs text-gray-500">{report.timestamp}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-gray-300 italic">
                    <User size={14} className="text-gray-500" /> {report.auteur}
                  </div>
                </td>
                  <td className="text-center min-w-[180px]"> {/* On force une largeur mini ici */}
                  <span className="badge badge-outline border-error/50 text-error bg-error/5 py-4 px-4 text-[10px] sm:text-xs font-semibold uppercase tracking-tight whitespace-nowrap h-auto inline-flex items-center justify-center">
                    {report.raison}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-square shadow-none btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white" title="Voir">
                      <Eye size={18} />
                    </button>
                    <button 
                      className="btn btn-square shadow-none btn-sm bg-amber-500/20 border border-amber-500 text-amber-500"
                      onClick={() => setSelectedReport(report)} 
                    >
                      <Mail size={18} />
                    </button>
                    <button 
                      className="btn btn-square shadow-none btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
                      onClick={() => handleDelete(report.id, report.titre)}
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
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
        isOpen={!!selectedReport} // Ouvert si selectedMovie n'est pas null
        data={selectedReport} 
        onClose={() => setSelectedReport(null)} 
        onSend={handleSendEmail}
      />
    </div>
  );
};

export default ReportTable;