import React from 'react';

const ActionButton = ({ 
  icon: Icon, // On passe le composant Icon de Lucide
  onClick, 
  variant = "blue", // Par défaut bleu
  title = "" 
}) => {
  
  const variants = {
    blue: "bg-blue-600 hover:bg-blue-500 border-none text-white",
    amber: "bg-amber-500/20 hover:bg-amber-500 border border-amber-500 text-amber-500 hover:text-black",
    red: "bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white"
  };

  return (
    <button 
      className={`btn btn-square shadow-none btn-sm transition-all ${variants[variant]}`}
      onClick={onClick}
      title={title}
    >
      {Icon && <Icon size={18} />}
    </button>
  );
};

export default ActionButton;