import React from 'react';
import { Mail, X, Send } from "lucide-react";

const ContactModal = ({ isOpen, onClose, data, onSend }) => {
  if (!isOpen || !data) return null;

  // On prépare un petit helper pour le libellé du statut (vu que c'est un chiffre)
  const statusLabels = { 0: "En attente", 1: "Validé", 2: "Refusé", 3: "Signalé" };
  const currentStatusText = statusLabels[data.status] || "Inconnu";

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box bg-[#1E1E24] border border-white/10 max-w-md shadow-2xl relative">
        
        <button 
          type="button"
          onClick={onClose} 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:text-red-500"
        >
          <X size={20} />
        </button>

        <div className="text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Mail className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-amber-500">
              {/* CHANGEMENT : data.realisateur -> data.director */}
              Contacter {data.director}
            </h3>
          </div>

          <form onSubmit={onSend} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Destinataire</span>
              </label>
              <input 
                type="text" 
                disabled 
                className="input input-bordered bg-black/30 border-white/5 text-gray-400 italic w-full" 
                value={`${data.director} (${data.email || 'email non renseigné'})`} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Message</span>
              </label>
              <textarea 
                required
                key={data.id}
                className="textarea textarea-bordered bg-black/30 border-white/10 focus:border-amber-500 text-white h-32 w-full text-sm outline-none"
                defaultValue={
                  data.status === 3 // Si le statut est "Signalé"
                    ? `Bonjour ${data.director},\n\nVotre vidéo "${data.title}" a été signalée.\n\nAprès vérification, nous vous informons que celle-ci va être traitée par notre équipe de modération.`
                    : `Bonjour ${data.director},\n\nNous vous contactons concernant votre film "${data.title}" dont le statut actuel est : ${currentStatusText}.\n\nNous aurions besoin de précisions complémentaires.`
                }
              />
            </div>

            <div className="modal-action">
              <button 
                type="submit" 
                className="btn w-full bg-amber-500 hover:bg-amber-400 text-black border-none font-bold flex gap-2"
              >
                <Send size={18} /> Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="modal-backdrop bg-black/60" onClick={onClose}>
        <button className="cursor-default">close</button>
      </div>
    </div>
  );
};

export default ContactModal;