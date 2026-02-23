export const glassTextAreaClasses = "w-full p-3 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-white outline-none transition-all placeholder-gray-400 resize-none text-sm leading-relaxed";
export const glassTextAreaClassesPurple = "w-full p-3 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-purple-300 outline-none transition-all placeholder-gray-400 resize-none text-sm leading-relaxed";

export function Input({ label, name, type = "text", value, onChange, placeholder, error }) {
  const isNumber = type === "number" || name === "zipcode" || name === "mobile" || name === "telephone";
  return (
    <div>
      <label htmlFor={name} className={`block text-base mb-2 ml-3 font-semibold tracking-wide ${error ? 'text-red-400' : 'text-gray-200'}`}>{label}</label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className={`w-full h-10 px-0 bg-transparent border-0 border-b border-gray-600 text-gray-200 outline-none transition-all placeholder-gray-400 rounded-none focus:border-white ${error ? 'border-red-500' : ''}`} 
        {...(isNumber ? { inputMode: 'numeric', pattern: '[0-9]*' } : {})}
      />
      {error && <p className="text-red-400 text-xs mt-1 ml-3 font-medium animate-pulse">{error}</p>}
    </div>
  );
}