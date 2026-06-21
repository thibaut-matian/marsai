import { AlertCircle, Check, Copy, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

const DEMO_CREDENTIALS = [
  { role: 'Admin', email: 'admin@marsai.fr', password: 'Admin123' },
  { role: 'Jury',  email: 'jury1@marsai.fr', password: 'Jury1234' },
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-1 p-1 rounded text-gray-500 hover:text-amber-300 transition-colors"
      title="Copier"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const {
    formData,
    errors,
    isLoading,
    serverError,
    handleChange,
    handleLogin
  } = useAdminAuth();

  // Affiche le toast en cas d'erreurs
  useEffect(() => {
    if (Object.keys(errors).length > 0 || serverError) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [errors, serverError]);

  return (
    <div 
      data-theme="marsai" 
      className="min-h-screen bg-gray-900 text-gray-200 px-4 py-20 font-sans flex flex-col items-center justify-center font-light"
    >
      <div className="w-full max-w-md mx-auto">
        {/* Bouton retour */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="border border-gray-700 bg-black text-white hover:bg-gray-800 hover:text-white rounded px-4 py-2 text-sm transition-all mb-6"
        >
          ← Retour à l'accueil
        </button>
      </div>

      {/* Panneau identifiants démo */}
      <div className="w-full max-w-md mb-4 p-4 bg-amber-950/40 border border-amber-500/30 rounded-lg">
        <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
          Identifiants de démonstration
        </p>
        <div className="space-y-3 text-sm font-mono">
          {DEMO_CREDENTIALS.map(({ role, email, password }) => (
            <div key={role} className="flex flex-col gap-1">
              <span className="text-xs text-amber-500 uppercase tracking-wider">{role}</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 w-6 shrink-0">@</span>
                <span className="text-gray-200 flex-1">{email}</span>
                <CopyButton value={email} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 w-6 shrink-0">pw</span>
                <span className="text-amber-300 font-bold flex-1">{password}</span>
                <CopyButton value={password} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card de connexion */}
      <div className="w-full max-w-md bg-gray-950 border border-gray-700 p-8 rounded-lg relative overflow-hidden shadow-xl shadow-black/40">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Connexion Admin
          </h1>
          <p className="text-sm text-gray-400">
            Accédez à votre espace d'administration
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Champ Email */}
          <div>
            <label 
              htmlFor="mail" 
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="mail"
                name="mail"
                type="email"
                autoComplete="email"
                value={formData.mail}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${
                  errors.mail ? 'border-red-500' : 'border-gray-700'
                } rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all`}
                placeholder="admin@marsai.com"
              />
            </div>
            {errors.mail && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.mail}
              </p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-12 py-3 bg-gray-900 border ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                } rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-400 hover:cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-400 hover:cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Erreur serveur globale */}
          {serverError && !errors.mail && !errors.password && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {serverError}
              </p>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md border border-white/20 bg-white text-black font-bold transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            MarsAI Festival © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Toast erreurs */}
      {showToast && (Object.keys(errors).length > 0 || serverError) && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert alert-error shadow-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" 
              />
            </svg>
            <span>
              {serverError || 'Erreur de validation. Vérifiez vos informations.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}