export default function VerdictButton({ type, icon, label, sublabel, current, set, color }) {
    const isActive = current === type;
    
    const colorStyles = {
        success: {
            active: 'bg-success/20 border-success text-success shadow-lg shadow-success/20',
            hover: 'hover:bg-success/10 hover:border-success/50',
            icon: 'bg-success text-success-content'
        },
        warning: {
            active: 'bg-warning/20 border-warning text-warning shadow-lg shadow-warning/20',
            hover: 'hover:bg-warning/10 hover:border-warning/50',
            icon: 'bg-warning text-warning-content'
        },
        error: {
            active: 'bg-error/20 border-error text-error shadow-lg shadow-error/20',
            hover: 'hover:bg-error/10 hover:border-error/50',
            icon: 'bg-error text-error-content'
        }
    };

    const styles = colorStyles[color];

    return (
        <button 
            onClick={() => set(type)}
            className={`relative flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-300 group
                ${isActive 
                    ? styles.active 
                    : `bg-white/5 border-white/10 text-gray-400 ${styles.hover}`
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300
                ${isActive ? styles.icon : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                {icon}
            </div>
            <div className="text-left flex-1">
                <p className={`font-bold text-sm ${isActive ? '' : 'text-white'}`}>{label}</p>
                <p className={`text-xs ${isActive ? 'opacity-70' : 'text-gray-500'}`}>{sublabel}</p>
            </div>
            {isActive && (
                <div className={`w-6 h-6 rounded-full ${styles.icon} flex items-center justify-center`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </button>
    );
}