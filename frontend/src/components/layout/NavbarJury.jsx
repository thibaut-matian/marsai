import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavbarJury() {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
const location = useLocation();

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

  // Initialiser directement l'état avec les infos utilisateur
  const [userInfo, setUserInfo] = useState(() => getUserFromToken());

  console.log('User info in Navbar:', userInfo);

  // Synchroniser avec le localStorage si le token change
  useEffect(() => {
    const handleStorageChange = () => {
      const newUserInfo = getUserFromToken();
      setUserInfo(newUserInfo);
      console.log('🔄 NavbarJury: Token mis à jour depuis localStorage', newUserInfo);
    };

    // Écouter les changements de localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement si le token a changé (pour les changements dans le même onglet)
    const interval = setInterval(() => {
      const newUserInfo = getUserFromToken();
      if (JSON.stringify(newUserInfo) !== JSON.stringify(userInfo)) {
        setUserInfo(newUserInfo);
        console.log('🔄 NavbarJury: Token mis à jour (vérification périodique)', newUserInfo);
      }
    }, 2000); // Vérifier toutes les 2 secondes

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [userInfo]);

  // Fonction pour générer les initiales à partir du prénom et nom
  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return 'JU'; // Jury par défaut
    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    return initials || 'JU';
  };

// Empêcher le scroll du body quand le menu mobile est ouvert
useEffect(() => {
if (isOpen) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = 'unset';
}
return () => { document.body.style.overflow = 'unset'; };
}, [isOpen]);

// Fonction pour vérifier si un lien est actif
const isActive = (path) => location.pathname === path;

return (
<>
{/* --- NAVBAR --- */}
<div className="navbar bg-[#100b18]/95 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 z-50 px-4 md:px-8">
    
    {/* 1. GAUCHE : Retour Dashboard + Titre */}
    <div className="navbar-start gap-2">
        {/* Flèche de retour - cachée sur le dashboard */}
        {!isActive('/jury/DashboardJury') && (
            <Link 
                to="/jury/DashboardJury" 
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-200"
                title="Retour au dashboard"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-purple-400 transition-colors duration-200"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
        )}
        <Link 
            to="/jury/DashboardJury"
            className="text-lg md:text-xl font-medium"
        >
            Interface de notation
        </Link>
    </div>

    {/* 2. CENTRE : Menu Desktop */}
    <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal bg-white/5 border border-white/10 rounded-2xl px-2 gap-1">
            <li>
                <Link 
                    to="/jury/DashboardJury" 
                    className={`text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-200 ${isActive('/jury/DashboardJury') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                >
                    Films à noter
                </Link>
            </li>
            <li>
                <Link 
                    to="/jury/RankingJury" 
                    className={`text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-200 ${isActive('/jury/RankingJury') ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                >
                    Mon Classement
                </Link>
            </li>
        </ul>
    </div>

    {/* 3. DROITE : Actions & Profil (Desktop) */}
    <div className="navbar-end hidden md:flex gap-4">

        {/* Profil Jury - Dropdown */}
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-3 px-3 py-2 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-white">
                        {userInfo ? `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || 'Membre Jury' : 'Chargement...'}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {userInfo?.role || 'Jury 2026'}
                    </p>
                </div>
                <div className="avatar placeholder">
                    <div className="w-10 h-10 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-[#100b18] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                            {userInfo ? getInitials(userInfo.firstName, userInfo.lastName) : 'JU'}
                        </span>
                    </div>
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-[#1a1425] border border-white/10 rounded-2xl z-[1] w-52 p-2 shadow-2xl mt-4">
                <li><a onClick={() => { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); navigate('/'); }} className="rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">Déconnexion</a></li>
            </ul>
        </div>
    </div>

    {/* 4. MOBILE : Drawer button */}
    <div className="navbar-end md:hidden">
        <button
            className="group flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-200"
            onClick={() => setIsOpen(true)}
        >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
</div>

{/* --- MENU MOBILE GLASSMORPHISM --- */}
<div className={`fixed inset-0 z-[100] transition-all duration-500 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
    {/* Backdrop blur */}
    <div 
        className="absolute inset-0 bg-[#100b18]/80 backdrop-blur-xl"
        onClick={() => setIsOpen(false)}
    />
    
    {/* Menu Panel */}
    <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#1a1425]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Menu Jury
            </span>
            <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-circle btn-ghost btn-sm hover:bg-purple-500/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Contenu */}
        <div className="flex flex-col p-6 space-y-8">
            
            {/* Avatar Mobile */}
            <div className="flex flex-col items-center">
                <div className="avatar placeholder mb-4">
                    <div className="w-24 h-24 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1a1425] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                            {userInfo ? getInitials(userInfo.firstName, userInfo.lastName) : 'JU'}
                        </span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white">
                    {userInfo ? `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || 'Membre Jury' : 'Chargement...'}
                </h3>
                <div className="badge bg-purple-500/20 border-purple-500/50 text-purple-400 mt-2 gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    {userInfo?.role || 'Membre du Jury'}
                </div>
            </div>

            {/* Navigation */}
            <ul className="menu bg-white/5 rounded-2xl w-full border border-white/10 p-2 gap-1">
                <li>
                    <Link 
                        to="/jury/DashboardJury" 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl transition-all ${isActive('/jury/DashboardJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        Films à noter
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/jury/RankingJury" 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl transition-all ${isActive('/jury/RankingJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Mon Classement
                    </Link>
                </li>
            </ul>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Bouton Quitter */}
            <button 
                onClick={() => { setIsOpen(false); localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); navigate('/'); }}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-xl gap-2 w-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Quitter l'espace Jury
            </button>
        </div>
    </div>
</div>
</>
);
}