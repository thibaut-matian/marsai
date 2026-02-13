import React from 'react';
import { Mail, X, Send } from "lucide-react";

const ContactModal = ({ isOpen, onClose, data, onSend }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box bg-[#1E1E24] border border-white/10 max-w-md shadow-2xl relative">
        
        {/* Bouton Fermer */}
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
              Contacter {data.auteur || data.realisateur}
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
                value={`${data.auteur || data.realisateur} (${data.email || 'email non renseigné'})`} 
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Message</span>
              </label>
              <textarea 
                required
                key={data.id} // ASTUCE : Force React à recalculer le texte quand on change de film
                className="textarea textarea-bordered bg-black/30 border-white/10 focus:border-amber-500 text-white h-32 w-full text-sm outline-none"
                defaultValue={
                  data.raison 
                    ? `Bonjour ${data.auteur},\n\nVotre vidéo "${data.titre}" a été signalée pour le motif suivant : ${data.raison}.\n\nAprès vérification, nous vous informons que celle-ci va être traitée par notre équipe de modération.`
                    : `Bonjour ${data.realisateur},\n\nNous vous contactons concernant votre film "${data.titre}" dont le statut actuel est : ${data.statut}.\n\nNous aurions besoin de précisions complémentaires.`
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

      {/* Fond pour fermer en cliquant à côté */}
      <div className="modal-backdrop bg-black/60" onClick={onClose}>
        <button className="cursor-default">close</button>
      </div>
    </div>
  );
};

export default ContactModal;