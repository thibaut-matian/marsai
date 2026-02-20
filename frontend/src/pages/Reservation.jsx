import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function Reservation() {
  const navigate = useNavigate();

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
        setError("Impossible de charger les types de billets.");
        setLoadingTypes(false);
      });
  }, []);

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
        setError(data.message || "Une erreur est survenue.");
        return;
      }

      setSuccess(data.data);
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer.");
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
            <h2 className="card-title text-2xl tracking-widest font-light">RÉSERVATION CONFIRMÉE</h2>

            <div className="w-full space-y-2 text-left text-sm">
              <p className="label-text text-gray-400 uppercase tracking-widest text-xs">Vos informations</p>
              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                <p><span className="text-gray-400">Nom : </span>{success.firstname} {success.lastname}</p>
                <p><span className="text-gray-400">Email : </span>{success.email}</p>
                <p><span className="text-gray-400">Billet : </span>{success.ticket_type}</p>
              </div>
              <p className="label-text text-gray-400 uppercase tracking-widest text-xs pt-2">Votre QR code</p>
              <div className="flex justify-center bg-white rounded-xl p-4">
                <img src={success.qr_code_image} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-gray-500 text-xs text-center">Présentez ce QR code à l'entrée. Un email de confirmation vous a été envoyé.</p>
            </div>

            <div className="card-actions w-full pt-2">
              <button
                onClick={() => navigate("/planning")}
                className="btn btn-neutral w-full"
              >
                ← Retour au planning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Formulaire ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="card bg-white/5 border border-white/20 w-full max-w-lg shadow-xl mt-20 mb-10">
        <div className="card-body gap-6">

          {/* Header */}
          <div className="text-center">
            <h2 className="card-title justify-center text-3xl font-light tracking-widest">RÉSERVATION</h2>
            <p className="text-gray-400 text-sm mt-1">Choisissez votre pass et réservez votre place</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Choix du billet */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">Choisissez votre pass</legend>
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
                        <span className="font-medium text-sm">{type.name}</span>
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
                <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">Prénom</legend>
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
                <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">Nom</legend>
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
              <legend className="fieldset-legend text-xs uppercase tracking-widest text-gray-400">Email</legend>
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
                ? <><span className="loading loading-spinner loading-sm"></span> Réservation en cours...</>
                : "CONFIRMER MA RÉSERVATION"
              }
            </button>

            {/* Retour */}
            <button
              type="button"
              onClick={() => navigate("/planning")}
              className="btn btn-ghost w-full text-gray-500"
            >
              ← Retour au planning
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
