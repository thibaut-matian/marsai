/**
 * Bloc d'informations du film :
 * synopsis, candidat, stack IA, équipe
 */
const FilmInfoCard = ({ film, formatDuration }) => {
  return (
    <div className="flex flex-col gap-4">

      {/* Ligne 1 : Synopsis + Candidat */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">

        {/* Synopsis */}
        <div className="w-full lg:w-3/4">
          <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="card-title text-3xl font-bold text-white">{film.title}</h1>
                <div className="badge badge-ghost gap-1">⏱ {formatDuration(film.duration)}</div>
                <div className={`badge gap-1 ${film.prod_type === 1 ? "badge-info" : "bg-purple-600 border-purple-600 text-white"}`}>
                  {film.prod_type === 1 ? "🤖 100% IA" : "🤝 Hybride"}
                </div>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-xs mb-3 text-blue-400">Synopsis</h3>
                  <p>{film.synopsis}</p>
                </div>
                {film.directorNote && (
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-xs mb-3 text-purple-400">Note d'intention</h3>
                    <p className="italic text-white/60 pl-4 border-l-2 border-white/10">"{film.directorNote}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Candidat */}
        <div className="w-full lg:w-1/4">
          <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
            <div className="card-body">
              <h3 className="font-bold uppercase tracking-wider text-xs mb-4 text-gray-500">Candidat</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar placeholder">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {film.director.firstname?.[0]}{film.director.lastname?.[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{film.director.firstname} {film.director.lastname}</p>
                  <p className="text-sm text-gray-400">{film.director.city}, {film.director.country}</p>
                </div>
              </div>
              <div className="divider my-0"></div>
              <div className="space-y-3 text-sm mt-auto">
                <div className="flex justify-between">
                  <span className="text-gray-500">Métier</span>
                  <span className="text-white">{film.director.profession}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Réseaux</span>
                  <span className="text-gray-400">{film.director.socials?.instagram || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ligne 2 : Stack IA + Équipe */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">

        {/* Fabrication & IA */}
        <div className="w-full lg:w-3/4">
          <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
            <div className="card-body">
              <h3 className="card-title text-sm flex items-center gap-2">
                <span className="text-xl">🛠</span> Fabrication & IA
              </h3>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Stack Technologique</p>
                <div className="flex flex-wrap gap-2">
                  {(film.aiStack || "").split(",").filter(Boolean).map((tool, i) => (
                    <div key={i} className="badge badge-lg badge-outline badge-info">{tool.trim()}</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2 font-bold">Méthodologie Créative</p>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400">{film.aiMethodology}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Équipe */}
        {film.team && film.team.length > 0 && (
          <div className="w-full lg:w-1/4">
            <div className="card bg-white/5 border border-white/10 h-full rounded-3xl">
              <div className="card-body">
                <h3 className="font-bold uppercase tracking-wider text-xs mb-2 text-gray-500">Équipe & Crédits</h3>
                <ul className="menu bg-transparent p-0 gap-2">
                  {film.team.map((member, idx) => (
                    <li key={idx}>
                      <div className="flex justify-between text-sm bg-black/20 rounded-lg">
                        <span className="text-gray-400">{member.role}</span>
                        <span className="text-white font-medium">{member.firstname} {member.lastname}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmInfoCard;
