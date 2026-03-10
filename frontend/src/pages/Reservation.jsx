import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import getAPI from "../services/getAPI";

export default function Reservation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [ticketTypes, setTicketTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const [form, setForm] = useState({
    ticket_type_id: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  // ─── Chargement des types de billets ──────────────────────────────────────
  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const response = await getAPI.getTicketTypes();
        // Gestion de la structure de réponse API (data.data ou data direct)
        setTicketTypes(response.data?.data || response.data || []);
        setLoadingTypes(false);
      } catch (err) {
        setError(t('reservation.errorLoadingTypes'));
        setLoadingTypes(false);
      }
    };
    fetchTicketTypes();
  }, [t]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ─── Soumission du formulaire ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await getAPI.reserveTicket({
        ...form,
        ticket_type_id: parseInt(form.ticket_type_id),
      });

      // Si la requête réussit
      setSuccess(response.data?.data || response.data);
    } catch (err) {
      // Récupération du message d'erreur du serveur ou message générique
      const errorMessage = err.response?.data?.message || t('reservation.errorNetwork');
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Page de confirmation (Succès) ────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="card bg-white/5 border border-white/20 w-full max-w-md shadow-xl">
          <div className="card-body items-center text-center gap-4">
            <div className="text-6xl">🎟️</div>
            <h2 className="card-title text-2xl tracking-widest font-light">{t('reservation.title')}</h2>
            <p className="text-lg text-green-400 font-bold">{t('reservation.success')}</p>
            <button 
              onClick={() => navigate('/planning')} 
              className="btn btn-outline btn-sm border-gray-700 text-white hover:bg-gray-800 hover:border-gray-700 rounded-full text-xs md:text-sm mt-4 cursor-pointer"
            >
              {t('reservation.backToPlanning')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mapping local pour traduire les noms de tickets connus venant de la DB
  const ticketNameMap = {
    'Pass Vendredi': 'ticketTypes.friday',
    'Pass Samedi': 'ticketTypes.saturday',
    'Pass 2 Jours': 'ticketTypes.weekend',
  };

  // ─── Formulaire de réservation ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="card bg-white/5 border border-white/20 w-full max-w-lg shadow-xl mt-20 mb-10">
        <div className="card-body gap-6">

          {/* Header */}
          <div className="text-center">
            <h2 className="card-title justify-center text-3xl font-light tracking-widest">
                {t('reservation.title').toUpperCase()}
            </h2>
            <p className="text-gray-400 text-sm mt-1">{t('reservation.selectType')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Choix du billet */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">
                {t('reservation.selectType')}
              </legend>
              {loadingTypes ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-md text-white"></span>
                </div>
              ) : (
                <div className="space-y-2 mt-1">
                  {ticketTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all ${
                        !type.available
                          ? "border-white/10 opacity-40 cursor-not-allowed"
                          : form.ticket_type_id === String(type.id)
                          ? "border-white bg-white/10"
                          : "border-white/20 hover:border-white/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="ticket_type_id"
                          value={type.id}
                          disabled={!type.available}
                          checked={form.ticket_type_id === String(type.id)}
                          onChange={handleChange}
                          className="radio radio-sm border-white checked:bg-white"
                        />
                        <span className="font-medium text-sm">
                            {ticketNameMap[type.name] ? t(ticketNameMap[type.name]) : type.name}
                        </span>
                      </div>
                      <span className={`badge badge-sm ${type.available ? (type.remaining < 50 ? "badge-error" : "badge-ghost") : "badge-error"}`}>
                        {type.available ? `${type.remaining} ${t('reservation.places') || 'places'}` : t('reservation.full') || "Complet"}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">{t('reservation.firstName')}</legend>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                  className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-white/60"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">{t('reservation.lastName')}</legend>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Dupont"
                  required
                  className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-white/60"
                />
              </fieldset>
            </div>

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">{t('reservation.email')}</legend>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jean.dupont@email.com"
                required
                className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-white/60"
              />
            </fieldset>

            {/* Erreur */}
            {error && (
              <div role="alert" className="alert alert-error alert-soft">
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !form.ticket_type_id}
              className="btn btn-neutral w-full"
            >
              {isSubmitting
                ? <><span className="loading loading-spinner loading-sm"></span> {t('common.loading')}</>
                : t('reservation.submit').toUpperCase()
              }
            </button>

            {/* Retour */}
            <button
              type="button"
              onClick={() => navigate("/planning")}
              className="btn btn-ghost w-full text-gray-500"
            >
              ← {t('reservation.backToPlanning')}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}