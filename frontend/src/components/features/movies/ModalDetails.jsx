import { Briefcase, ChevronDown, Clapperboard, Clock, Image, Languages, Play, Sparkles, Star, User, X } from 'lucide-react';
import { useMovieDetails } from '../../../hooks/useMovieDetails';
import { getFlagClass } from '../../../utils/getFlagClass';

// data fictive à remplacer par les données bdd, gardant le même nommage
const movieData = {
  url: "https://www.youtube.com/watch?v=YLslsZuEaNE",
  title_vo: "L'Odyssée des Étoiles",
  title_en: "The Odyssey of the Stars",
  rating: 8.7,
  duration: 60,
  genres: "Drame, Sci-Fi",
  synopsis_vo: "Dans un futur lointain, une équipe d'astronautes part à la recherche d'une nouvelle planète habitable après que la Terre soit devenue inhabitable. Leur voyage les mènera aux confins de l'univers connu.",
  synopsis_en: "In a distant future, a team of astronauts embarks on a quest to find a new habitable planet after Earth becomes uninhabitable. Their journey takes them to the far reaches of the known universe.",
  ia: "scénario réalisé avec Gemini, vidéo par DALL-E, musique par Jukebox et voix par VALL-E",
  real_lastname: "Nom random",
  real_firstname: "Prénom random",
  actual_job: "Poste random",
  poster: "https://picsum.photos/400/600",
  screenshots: [
    "https://picsum.photos/800/600",
    "https://picsum.photos/800/600?2",
    "https://picsum.photos/800/600?3"
  ],
  country: "France",
  language: "Français",
  socials: [
    { platform: "Twitter", url: "https://twitter.com/odyssee_etoiles" },
    { platform: "Instagram", url: "https://instagram.com/odyssee_etoiles" },
    { platform: "Facebook", url: "https://facebook.com/odyssee_etoiles" }
  ]
};

// Utilise movieData par défaut si aucune prop n'est passée
const ModalDetails = ({ movie = movieData, isOpen = true, onClose = () => {} }) => {
  const { showVideo, toggleVideo, detectedIAs, youtubeId, isGalleryOpen, setIsGalleryOpen } = useMovieDetails(movie);

  if (!isOpen || !movie) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-4xl bg-black/90 text-white relative">
        {/* Bouton fermer */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <div>

        </div>
        {/* Header avec poster/vidéo et infos */}
        <div className="flex flex-col items-center gap-6 mt-6">
          <figure className="w-full flex flex-col items-center shrink-0 relative">
            {showVideo && youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={movie.title_vo}
                className="w-full aspect-video rounded-xl shadow-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="hover-3d">
                {/* content */}
                <figure className="max-w-84 rounded-2xl">
                  <img 
                    src={movie.poster || 'https://picsum.photos/400/600'}
                    alt={movie.title_vo}
                    className="w-full h-auto rounded-xl object-cover shadow-lg"
                  />
                </figure>
                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            
          </figure>
            
          {/* Bouton switch poster/vidéo */}
          <button
            className="btn btn-sm btn-white gap-1"
            onClick={toggleVideo}
          >
            {showVideo ? (
              <>
                <Image className="w-4 h-4" /> Poster
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Vidéo
              </>
            )}
          </button>

          <div className="flex flex-col gap-3 w-full">
            <h2 className="text-2xl font-bold">{movie.title_vo}</h2>
            <p className="text-white italic">{movie.title_en}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-semibold">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}s</span>
              </div>
              <div className="flex items-center gap-1">
                <p>
                  <span className={getFlagClass(movie.country)}></span> &nbsp;{movie.country}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Languages className="w-4 h-4" />
                <span>&nbsp;{movie.language}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.split(',').map((genre, index) => (
                <span key={index} className="badge badge-white">
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Réalisateur */}
            <div className="flex flex-col gap-2 md:flex-row mt-2">
              <div className='flex items-center gap-2'>
                <Clapperboard className="w-5 h-5 text-white" />
                <span className="font-medium">
                  {movie.real_firstname} {movie.real_lastname}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Briefcase className="w-5 h-5 text-white" />
                <span className="text-white">
                  {movie.actual_job}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="collapse border-base-300 border">
          <input 
            type="checkbox" 
            checked={isGalleryOpen}
            onChange={(e) => setIsGalleryOpen(e.target.checked)}
          />
          <div className="collapse-title flex justify-between font-semibold pr-4">
            <label>Galerie photo</label>
            <ChevronDown 
              className={`transition-transform duration-300 ${isGalleryOpen ? 'rotate-180' : ''}`} 
            />
          </div>
          <div className="collapse-content flex justify-center text-sm">
              <figure className="hover-gallery max-w-full">
                {movie.screenshots?.map((screenshot, index) => (
                  <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                ))}
              </figure>
          </div>
        </div>

        <div className="divider"></div>

        {/* Synopsis */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <User className="w-5 h-5" /> Synopsis (VO)
            </h3>
            <p className="text-white leading-relaxed">
              {movie.synopsis_vo || 'Aucune description disponible.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Synopsis (EN)</h3>
            <p className="text-white italic leading-relaxed">
              {movie.synopsis_en || 'No description available.'}
            </p>
          </div>
        </div>

        <div className="divider my-2"></div>

        {/* IA utilisées */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" /> Technologies IA
          </h3>
          <p className="text-white mb-3">{movie.ia}</p>
          <div className="flex flex-wrap gap-2">
            {detectedIAs.map((ia, index) => (
              <span key={index} className="badge badge-accent badge-outline">
                {ia}
              </span>
            ))}
          </div>
        </div>

        {/* Réseaux sociaux */}
        {movie.socials && movie.socials.length > 0 && (
          <>
            <div className="divider"></div>
            <div className="flex flex-wrap gap-2">
              {movie.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ModalDetails;