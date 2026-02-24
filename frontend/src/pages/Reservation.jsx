import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const API_URL = "http://localhost:3000/api";

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

  useEffect(() => {
    fetch(`${API_URL}/tickets/types`)
      .then((res) => res.json())
      .then((data) => {
        setTicketTypes(data.data || []);
        setLoadingTypes(false);
      })
      .catch(() => {
        setError(t('reservation.errorLoadingTypes'));
        setLoadingTypes(false);
      });
  }, [t]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ticket_type_id: parseInt(form.ticket_type_id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || t('reservation.errorGeneric'));
        return;
      }

      setSuccess(data.data);
    } catch (err) {
      setError(t('reservation.errorNetwork'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Page de confirmation ────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="card bg-white/5 border border-white/20 w-full max-w-md shadow-xl">
          <div className="card-body items-center text-center gap-4">
            <div className="text-6xl">🎟️</div>
            <h2 className="card-title text-2xl tracking-widest font-light">{t('reservation.title')}</h2>
            <p className="text-lg text-green-400 font-bold">{t('reservation.success')}</p>
            <button onClick={() => navigate('/planning')} className="btn btn-outline btn-sm border-gray-700 text-white hover:bg-gray-800 hover:border-gray-700 rounded-full text-xs md:text-sm mt-4 cursor-pointer">
              {t('reservation.backToPlanning')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mapping local pour traduire les noms de tickets connus
  const ticketNameMap = {
    'Pass Vendredi': 'ticketTypes.friday',
    'Pass Samedi': 'ticketTypes.saturday',
    'Pass 2 Jours': 'ticketTypes.weekend',
  };

  // ─── Formulaire ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="card bg-white/5 border border-white/20 w-full max-w-lg shadow-xl mt-20 mb-10">
        <div className="card-body gap-6">

          {/* Header */}
          <div className="text-center">
            <h2 className="card-title justify-center text-3xl font-light tracking-widest">{t('reservation.title').toUpperCase()}</h2>
            <p className="text-gray-400 text-sm mt-1">{t('reservation.selectType')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Choix du billet */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">{t('reservation.selectType')}</legend>
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
                        <span className="font-medium text-sm">{ticketNameMap[type.name] ? t(ticketNameMap[type.name]) : type.name}</span>
                      </div>
                      <span className={`badge badge-sm ${type.available ? (type.remaining < 50 ? "badge-error" : "badge-ghost") : "badge-error"}`}>
                        {type.available ? `${type.remaining} places` : "Complet"}
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
