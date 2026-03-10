import { Briefcase, ChevronDown, Clapperboard, Clock, Image, Languages, Play, Sparkles, Star, User, X } from 'lucide-react';
import { useMovieDetails } from '../../../hooks/useMovieDetails';
import { getFlagClass } from '../../../utils/getFlagClass';

const ModalDetails = ({ movieId, isOpen = true, onClose = () => {} }) => {
  const { movieData, loading, error, showVideo, toggleVideo, detectedIAs, youtubeId, isGalleryOpen, setIsGalleryOpen } = useMovieDetails(movieId);

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-5xl bg-black/90 text-white relative">
        {/* Bouton fermer */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* État de chargement */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* État d'erreur */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Contenu principal */}
        {!loading && !error && movieData && (
          <>
            {/* Header avec poster/vidéo et infos */}
            <div className="flex flex-col items-center gap-6 mt-6">
              <figure className="w-full flex flex-col items-center shrink-0 relative">
                {showVideo && youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={movieData.title_vo}
                    className="w-full aspect-video rounded-xl shadow-lg"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <div className="hover-3d">
                    {/* content */}
                    <figure className="max-w-full rounded-2xl">
                      <img 
                        src={movieData.poster || 'https://picsum.photos/400/600'}
                        alt={movieData.title_vo}
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
                <h2 className="text-2xl font-bold">{movieData.title_vo}</h2>
                <p className="text-white italic">{movieData.title_en}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {movieData.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold">{movieData.rating}/10</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{movieData.duration}s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p>
                      <span className={getFlagClass(movieData.country)}></span> &nbsp;{movieData.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />
                    <span>&nbsp;{movieData.language}</span>
                  </div>
                </div>

                {/* Réalisateur */}
                <div className="flex flex-col gap-2 md:flex-row mt-2">
                  <div className='flex items-center gap-2'>
                    <Clapperboard className="w-5 h-5 text-white" />
                    <span className="font-medium">
                      {movieData.real_firstname} {movieData.real_lastname}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Briefcase className="w-5 h-5 text-white" />
                    <span className="text-white">
                      {movieData.actual_job}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {movieData.screenshots && movieData.screenshots.length > 0 && (
              <>
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
                        {movieData.screenshots?.map((screenshot, index) => (
                          <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                        ))}
                      </figure>
                  </div>
                </div>

                <div className="divider"></div>
              </>
            )}

            {/* Synopsis */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" /> Synopsis (VO)
                </h3>
                <p className="text-white leading-relaxed">
                  {movieData.synopsis_vo || 'Aucune description disponible.'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Synopsis (EN)</h3>
                <p className="text-white italic leading-relaxed">
                  {movieData.synopsis_en || 'No description available.'}
                </p>
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* IA utilisées */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> Technologies IA
              </h3>
              <p className="text-white mb-3">{movieData.ia}</p>
              <div className="flex flex-wrap gap-2">
                {detectedIAs.map((ia, index) => (
                  <span key={index} className="badge badge-accent badge-outline">
                    {ia}
                  </span>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            {movieData.socials && movieData.socials.length > 0 && (
              <>
                <div className="divider"></div>
                <div className="flex flex-wrap gap-2">
                  {movieData.socials.map((social, index) => (
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
          </>
        )}
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ModalDetails;