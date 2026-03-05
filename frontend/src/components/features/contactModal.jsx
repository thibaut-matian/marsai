import React from 'react';
import { Mail, X, Send, Tag } from "lucide-react"; // Ajout de l'icône Tag pour le sujet

const ContactModal = ({ isOpen, onClose, data, onSend, loading }) => {
  if (!isOpen || !data) return null;

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
              Contacter {data.director?.trim()}
            </h3>
          </div>

          {/* onSubmit utilise la fonction onSend passée en props */}
          <form onSubmit={onSend} className="space-y-5">
            
            {/* DESTINATAIRE (Lecture seule) */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Destinataire</span>
              </label>
              <input 
                type="text" 
                disabled 
                className="input input-bordered bg-black/30 border-white/5 text-gray-400 italic w-full" 
                value={`${data.director?.trim()} (${data.email || 'email non renseigné'})`} 
              />
            </div>

            {/* SUJET (Nouveau champ !) */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Objet</span>
              </label>
              <input 
                type="text"
                name="subject" // Important pour le récupérer dans onSend
                required
                className="input input-bordered bg-black/30 border-white/10 focus:border-amber-500 text-white w-full text-sm outline-none"
                defaultValue={data.status === 3 ? `Signalement de votre vidéo : ${data.title}` : `Information MarsAI : ${data.title}`}
              />
            </div>

            {/* MESSAGE */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-500 uppercase text-xs font-bold">Message</span>
              </label>
              <textarea 
                name="message" // Important pour le récupérer dans onSend
                required
                key={data.id}
                className="textarea textarea-bordered bg-black/30 border-white/10 focus:border-amber-500 text-white h-32 w-full text-sm outline-none"
                defaultValue={
                  data.status === 3 
                    ? `Bonjour ${data.director?.trim()},\n\nVotre vidéo "${data.title}" a été signalée pour les raisons suivante : ${data.comment || 'Raison non spécifiée'}.\n\nAprès vérification, nous vous informons que celle-ci va être traitée par notre équipe de modération et donc supprimer. Pour reparticipé à nouveau, veuillez soumettre une nouvelle vidéo en vous assurant de respecter les règles du festival.`
                    : `Bonjour ${data.director?.trim()},\n\nNous vous contactons concernant votre film "${data.title}" dont le statut actuel est : ${currentStatusText}.\n\nNous aurions besoin de précisions complémentaires.`
                }
              />
            </div>

            <div className="modal-action">
              <button 
      type="submit" 
      disabled={!data.email || loading}
      className={`btn w-full font-bold flex gap-2 ${loading ? 'btn-disabled' : 'bg-amber-500 hover:bg-amber-400 text-black border-none'}`}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          Envoi en cours...
        </>
      ) : (
        <>
          <Send size={18} /> 
          {data.email ? "Envoyer le message" : "Email manquant"}
        </>
      )}
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