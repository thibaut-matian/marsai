export const glassTextAreaClasses = "w-full p-5 rounded-3xl bg-black/30 border border-white/10 text-white focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-white/30 backdrop-blur-md resize-none text-sm leading-relaxed";
export const glassTextAreaClassesPurple = "w-full p-5 rounded-3xl bg-black/30 border border-white/10 text-white focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder-white/30 backdrop-blur-md resize-none text-sm leading-relaxed";

export function Input({ label, name, type = "text", value, onChange, placeholder, error }) {
  return (
    <div>
      <label htmlFor={name} className={`block text-sm mb-2 ml-3 font-medium tracking-wide ${error ? 'text-red-400' : 'text-blue-200/80'}`}>{label}</label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className={`w-full h-14 px-6 rounded-2xl bg-black/30 border text-white outline-none transition-all placeholder-white/30 backdrop-blur-md shadow-sm ${error ? 'border-red-500 ring-1 ring-red-500/50' : 'border-white/10 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20'}`} 
      />
      {error && <p className="text-red-400 text-xs mt-1 ml-3 font-medium animate-pulse">{error}</p>}
    </div>
  );
}