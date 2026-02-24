    import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarJury from "../../components/layout/NavbarJury.jsx";
import getAPI from "../../services/getAPI";

    export default function DashboardJury() {
  const [userInfo, setUserInfo] = useState({ firstname: "Jury" });

  // Fonction pour décoder le JWT et extraire les infos utilisateur
  const getUserFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    
    try {
      // Décoder la partie payload du JWT (partie du milieu)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Infos utilisateur extraites du token:', payload);
      return payload;
    } catch (error) {
      console.error('Erreur décodage token:', error);
      return null;
    }
  };

  // Simulation de données (Tu connecteras ça au backend plus tard)
  const stats = {
      totalFilms: 12,
      watchedFilms: 4,
      remainingTime: "3 jours",
      userName: userInfo.firstname || "Jury" // Utiliser le nom du token
  };

    const progressPercentage = (stats.watchedFilms / stats.totalFilms) * 100;

    const validateToken = async (token) => {
      try {
        const response = await getAPI.validateInvitation(token);
        const data = response.data;
        
        console.log('Response data:', data);
        
        if (data.success) {
          // Stocker les tokens dans localStorage
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          
          // Mettre à jour les infos utilisateur
          setUserInfo(data.data.user);
          console.log('User info updated:', data.data.user);
          
          // Rediriger sans le token dans l'URL
          window.history.replaceState({}, '', '/jury/DashboardJury');
        } else {
          console.error('Erreur serveur:', data.message);
        }
      } catch (error) {
        console.error('Erreur validation:', error);
      }
    };

    //Gestion token
    useEffect(() => {
      const handleTokenValidation = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const invitationToken = urlParams.get('token');
    
        if (invitationToken) {
          // Nouveau jury avec token d'invitation
          await validateToken(invitationToken);
        } else {
          // Jury qui revient → récupérer infos depuis le token existant
          const existingUser = getUserFromToken();
          if (existingUser) {
            setUserInfo(existingUser);
          }
          console.log('Aucun token d\'invitation trouvé, user info from existing token:', existingUser);
        }
      };

      handleTokenValidation();
    }, []);

    console.log('Rendu Dashboard avec userInfo:', userInfo);

    return (
        <div className="min-h-screen bg-[#100b18] text-white font-sans overflow-x-hidden">
        <NavbarJury />

        <div className="pt-32 px-4 md:px-12 pb-20 container mx-auto max-w-6xl animate-fade-in">
            
            {/* HEADER : SALUTATION */}
            <header className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bonjour, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{userInfo.firstName}</span> 👋
                </h1>
                <p className="text-xl text-gray-400">Prêt(e) à découvrir les pépites de demain ?</p>
            </header>

            {/* SECTION PRINCIPALE : PROGRESSION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                
                {/* CARTE 1 : PROGRESSION */}
                <div className="col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <h2 className="text-2xl font-bold mb-2">Votre Progression</h2>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-4xl font-bold text-white">{stats.watchedFilms}</span>
                        <span className="text-xl text-gray-500 mb-1">/ {stats.totalFilms} films vus</span>
                    </div>

                    {/* Barre de progression */}
                    <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-400 text-right">{Math.round(progressPercentage)}% complété</p>
                </div>

                {/* CARTE 2 : TEMPS RESTANT */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-white/20 transition-all">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-2xl mb-4 text-red-400">
                        ⏳
                    </div>
                    <h3 className="text-lg font-bold text-gray-300">Temps Restant</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.remainingTime}</p>
                    <p className="text-xs text-gray-500 mt-2">Avant la clôture des votes</p>
                </div>
            </div>

            {/* ACTIONS PRINCIPALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* BOUTON LANCER LA SESSION */}
                <Link to="/jury/JuryVote" className="group relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1 overflow-hidden transition-transform hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity"></div>
                    <div className="bg-[#100b18] rounded-[22px] h-full p-8 flex items-center justify-between relative z-10 group-hover:bg-transparent transition-colors">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {stats.watchedFilms === 0 ? "Commencer les votes" : "Reprendre la session"}
                            </h3>
                            <p className="text-gray-400 group-hover:text-white/80 transition-colors">Visionner le film suivant</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white text-white group-hover:text-purple-600 transition-all">
                            <svg className="w-8 h-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                </Link>

                {/* BOUTON VOIR CLASSEMENT */}
                <Link to="/jury/RankingJury" className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between hover:bg-white/10 transition-all group">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mon Classement</h3>
                        <p className="text-gray-400">Revoir mes notes et coups de cœur</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:border-blue-400 group-hover:text-blue-400 transition-all">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    </div>
                </Link>
            </div>

        </div>
        </div>
    );
    }