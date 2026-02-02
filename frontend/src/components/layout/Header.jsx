import React, { useState, useEffect, use } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const navigate = useNavigate();

    // Empêcher le scroll du body quand le menu est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowLogo(true);
            } else {
                setShowLogo(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    return (
        <>
            {/* Barre de navigation Principale (Visible tout le temps) */}
            <div className="navbar bg-transparent backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
                <div className="flex-1"><Link to="/" 
                        className={`btn btn-ghost text-xl text-white transform transition-all duration-500 ease-in-out ${
                            showLogo 
                                ? 'opacity-100 translate-y-0' // Visible et à sa place
                                : 'opacity-0 -translate-y-4 pointer-events-none' // Invisible et décalé vers le haut
                        }`}
                    >
                        MarsAI
                    </Link>                
                    </div>

                {/* Menu Desktop (Caché sur mobile) */}
                <div className="flex-none hidden md:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li><Link to="/planning">Planning</Link></li>
                        <li><Link to="/FAQ">FAQ</Link></li>
                        <li className="ml-4">
                            <button 
                            onClick={() => navigate('/submit-movie')}
                            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors">
                                Soumettre un film
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Bouton Burger (Visible uniquement sur mobile) */}
                <div className="flex-none md:hidden">
                    <button
                        className="btn btn-ghost btn-circle text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* OVERLAY MENU MOBILE (Style de la capture d'écran) */}
            <div 
                className={`fixed inset-0 z-50 bg-[#1a1a1d] transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                {/* Bouton Fermer (Croix en haut à droite) */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 text-white p-2 hover:text-gray-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenu du menu centré */}
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    
                    {/* Liens de navigation */}
                    <nav className="flex flex-col items-center space-y-8 text-white">
                        <Link 
                            to="/planning" 
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-light hover:text-gray-400 transition-colors"
                        >Planning
                        </Link>
                        
                        <Link 
                            to="/FAQ" 
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-light hover:text-gray-400 transition-colors"
                        >
                            FAQ
                        </Link>
                        
                    </nav>

                    {/* Bouton d'action principal */}
                    <div className="pt-4">
                        <button 
                            onClick={() => navigate('/submission')}
                            className="bg-white text-black px-8 py-3 rounded-md font-medium text-lg hover:scale-105 transition-transform"
                        >
                            Soumettre un film
                        </button>
                    </div>
                </div>

                {/* Pied de page (AIF 2026) */}
                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/30 text-4xl font-bold tracking-widest uppercase">
                        MarsAI 2026 <span className="text-xs align-top opacity-50">INFO</span>
                    </p>
                </div>
            </div>
        </>
    );
}

