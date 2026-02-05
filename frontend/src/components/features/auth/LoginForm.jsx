import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      // Stocker le token et le rôle
      localStorage.setItem('token', response.data.token);
      const userRole = response.data.role;

      // Redirection en fonction du rôle
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else if (userRole === 'jury') {
        navigate("/jury/dashboard");
      } else {
        throw new Error("Rôle non reconnu");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Connexion à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white/10 border border-white/20 rounded-lg p-8 shadow-lg backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Champ email */}
            <div>
              {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Champ mot de passe */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-sm mt-2">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}