import { useState } from "react";

export default function AccordionList({ title, films, color, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // Styles dynamiques (Vert, Jaune ou Rouge)
    const styles = {
        green: {
            header: "border-green-500/30 text-green-400 bg-green-900/10 hover:bg-green-900/20",
            badge: "bg-green-500/20 text-green-300 border-green-500/30",
        },
        yellow: {
            header: "border-yellow-500/30 text-yellow-400 bg-yellow-900/10 hover:bg-yellow-900/20",
            badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        },
        red: {
            header: "border-red-500/30 text-red-400 bg-red-900/10 hover:bg-red-900/20",
            badge: "bg-red-500/20 text-red-300 border-red-500/30",
        },
    };
    const currentStyle = styles[color];

    return (
        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-white/10 bg-white/5' : 'border-transparent'}`}>
            
            {/* TÊTE DE L'ACCORDÉON (Cliquable) */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`w-full flex items-center justify-between p-6 border-b transition-all duration-300 ${currentStyle.header} ${isOpen ? 'border-white/10' : 'border-transparent rounded-2xl'}`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">{title}</span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${currentStyle.badge}`}>
                        {films.length}
                    </span>
                </div>
                
                {/* Icône Flèche */}
                <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* CONTENU DÉROULANT */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 space-y-4">
                    {films.length === 0 ? (
                        <p className="text-center text-gray-500 italic py-4">La liste est vide.</p>
                    ) : (
                        films.map((film) => (
                            <div key={film.id} className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group cursor-pointer">
                                {/* Image Placeholder */}
                                <div className={`w-16 h-16 rounded-lg ${film.thumbnail || 'bg-gray-800'} flex items-center justify-center text-2xl shadow-lg`}>
                                    🎬
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">{film.title}</h4>
                                    <p className="text-xs text-gray-400">{film.director}</p>
                                </div>
                                <span className="text-xs font-mono text-gray-500 bg-black/40 px-2 py-1 rounded">
                                    {film.duration}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}