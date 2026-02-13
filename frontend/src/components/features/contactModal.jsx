import React from 'react';
import { Mail, X, Send } from "lucide-react";

const ContactModal = ({ isOpen, onClose, data, onSend }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1E1E24] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-amber-500">
              <Mail /> Contacter {data.auteur || data.realisateur}
            </h3>
            <button onClick={onClose} className="hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={onSend} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Destinataire</label>
              <input 
                type="text" 
                disabled 
                className="w-full bg-black/30 border border-white/5 rounded-lg p-2 text-gray-300 italic" 
                value={`${data.auteur || data.realisateur} (${data.email || 'email non renseigné'})`} 
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Message</label>
             <textarea 
  required
  className="w-full bg-black/30 border border-white/10 focus:border-amber-500 rounded-lg p-3 text-white text-sm h-32 outline-none transition-colors"
  defaultValue={
    data.raison 
      ? `Bonjour ${data.auteur},\n\nVotre vidéo "${data.titre}" a été signalée pour le motif suivant : ${data.raison}.\n\nAprès vérification, nous vous informons que celle-ci va être traitée par notre équipe de modération.`
      : `Bonjour ${data.realisateur},\n\nNous vous contactons concernant votre film "${data.titre}" dont le statut actuel est : ${data.statut}.\n\nNous aurions besoin de précisions complémentaires pour finaliser sa validation sur la plateforme.`
  }
/>
            </div>
            <button 
              type="submit" 
              className="w-full btn bg-amber-500 hover:bg-amber-400 text-black border-none font-bold flex gap-2"
            >
              <Send size={18} /> Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;