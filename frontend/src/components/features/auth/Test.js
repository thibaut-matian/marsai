// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // Pour la redirection

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fonction pour gérer la soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Appel API pour vérifier les identifiants et récupérer le rôle
//       const response = await fetch('http://ton-backend/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Identifiants incorrects');
//       }

//       // Stocker le rôle dans localStorage ou un contexte global
//       localStorage.setItem('userRole', data.role);

//       // Redirection en fonction du rôle
//       if (data.role === 'admin') {
//         navigate('/admin');
//       } else if (data.role === 'jury') {
//         navigate('/jury');
//       } else {
//         throw new Error('Rôle non reconnu');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
//           Connexion à votre compte
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <div className="bg-white/10 border border-white/20 rounded-lg p-8 shadow-lg backdrop-blur-sm">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Champ email */}
//             <div>
//               <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
//                 Adresse email
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* Champ mot de passe */}
//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
//                   Mot de passe
//                 </label>
//                 <div className="text-sm">
//                   <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
//                     Mot de passe oublié ?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2 relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Affichage des erreurs */}
//             {error && (
//               <div className="text-red-500 text-sm text-center">
//                 {error}
//               </div>
//             )}

//             {/* Bouton de soumission */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
//               >
//                 {isLoading ? 'Connexion en cours...' : 'Se connecter'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }