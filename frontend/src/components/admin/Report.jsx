import React, { useState } from 'react';
import { Eye, Trash2, AlertOctagon, User, Video, Mail, X, Send } from "lucide-react";

const REPORTS_DATA = [
  { id: 1, titre: "Gameplay Call of Duty", auteur: "GamerPro99", email: "gamerpro@mail.com", raison: "Contenu violent", timestamp: "Il y a 2h" },
  { id: 2, titre: "Comment hacker un compte", auteur: "MrRobot", email: "fsociety@protonmail.com", raison: "Activités illégales", timestamp: "Il y a 5h" },
  { id: 3, titre: "Musique sans droits", auteur: "DJ_Vibe", email: "vibe@studio.fr", raison: "Droits d'auteur", timestamp: "Hier" },
];

const ReportTable = () => {
  const [reports, setReports] = useState(REPORTS_DATA);
  const [selectedReport, setSelectedReport] = useState(null); // Pour gérer l'ouverture de la modale mail

  const handleDelete = (id, titre) => {
    if (window.confirm(`Confirmez-vous la suppression de la vidéo : ${titre} ?`)) {
      setReports(reports.filter(report => report.id !== id));
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    // Ici tu mettrais ton appel API (EmailJS, Nodemailer, etc.)
    alert(`Email de notification envoyé à ${selectedReport.email}`);
    setSelectedReport(null);
  };

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
              <th className="bg-transparent">Auteur</th>
              <th className="bg-transparent">Raison</th>
              <th className="bg-transparent text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="text-white">
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Video size={20} /></div>
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
                <td>
                  <span className="badge badge-outline border-error/50 text-error bg-error/5 py-3 px-4 text-xs font-semibold uppercase">
                    {report.raison}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-square btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white" title="Voir">
                      <Eye size={18} />
                    </button>
                    
                    {/* NOUVEAU : BOUTON MAIL */}
                    <button 
                      className="btn btn-square btn-sm bg-amber-500/20 hover:bg-amber-500 border border-amber-500 text-amber-500 hover:text-black transition-all"
                      onClick={() => setSelectedReport(report)}
                      title="Contacter l'auteur"
                    >
                      <Mail size={18} />
                    </button>

                    <button 
                      className="btn btn-square btn-sm bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white transition-all"
                      onClick={() => handleDelete(report.id, report.titre)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALE DE CONTACT */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1E1E24] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="text-amber-500" /> Contacter l'auteur
                </h3>
                <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Destinataire</label>
                  <input 
                    type="text" 
                    disabled 
                    className="w-full bg-black/30 border border-white/5 rounded-lg p-2 text-gray-300 italic" 
                    value={`${selectedReport.auteur} (${selectedReport.email})`} 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Message d'avertissement</label>
                  <textarea 
                    required
                    className="w-full bg-black/30 border border-white/10 focus:border-amber-500 rounded-lg p-3 text-white text-sm h-32 outline-none transition-colors"
                    defaultValue={`Bonjour ${selectedReport.auteur},\n\nVotre vidéo "${selectedReport.titre}" a été signalée pour : ${selectedReport.raison}. \n\nConformément à nos règles, celle-ci sera supprimée.`}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full btn bg-amber-500 hover:bg-amber-400 text-black border-none font-bold flex gap-2"
                >
                  <Send size={18} /> Envoyer l'e-mail
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTable;