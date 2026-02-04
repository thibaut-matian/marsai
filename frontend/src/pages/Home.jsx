import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import teaserVideo from '../assets/videos/Teaser.mp4';
import juryImage1 from '../assets/img/test-etchebest.jpg';
import juryImage2 from '../assets/img/test-lui.jpg';
import juryImage3 from '../assets/img/test-chat.png';
import juryImage4 from '../assets/img/test-winx.png';
import MovieTimeline from '../components/home/timeline';

export default function Home() {
    const navigate = useNavigate();
  const scrollRef = useRef(null);
  return (
    <div className="min-h-screen">
     {/* Hero Section */}
<div className="relative w-full h-screen text-white overflow-hidden">
  {/* Video de fond - fixed pour couvrir toute la hauteur */}
  <video 
    autoPlay 
    muted 
    loop 
    className="fixed inset-0 w-full h-full object-cover -z-10"
  >
    <source src={teaserVideo} type="video/mp4"/>
  </video>
  
  {/* Dégradé */}
  <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black via-black/40 to-transparent z-0"></div>

  {/* Contenu */}
<div className="relative z-10 h-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8 pb-72">  <button 
    onClick={() => navigate('/submit-movie')}
    className="text-base sm:text-lg border border-white/80 bg-white/10 backdrop-blur-md rounded-lg px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors duration-300">
    Commencer
  </button>
</div>
</div>

    <MovieTimeline />

      <hr/>

      {/* Criteres de soumission */}
      <div className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">CRITERES DE SOUMISSION</h2>
          <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-white">
            1. ........................................................................... PORTER DES LUNETTES<br />
            2. ........................................................... AIMER LES BLAGUES DE BEAUF<br />
            3. ........................................................................... SAVOIR IMITER DYLAN<br />
            4. ................................................................ S'APPELER THIBAUT MATIAN<br />
          </p>
        </div>
      </div>
      <hr/>

      {/*Jury Section */}
      <div className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">NOTRE JURY</h2>
          <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-white">
            Découvrez les experts qui évaluent nos projets et garantissent la qualité de notre plateforme.
          </p>
        </div>
      </div>
      <div className="relative bg-black p-4 md:p-10">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8">
            {/* Jury 1 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Etchebest</h2>
                <p className="text-sm md:text-base text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 2 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Le patron</h2>
                <p className="text-sm md:text-base text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 3 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Un chat</h2>
                <p className="text-sm md:text-base text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 4 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Les Winx</h2>
                <p className="text-sm md:text-base text-white relative z-10">La magiiiiiie</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 5 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Etchebest</h2>
                <p className="text-sm md:text-base text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 6 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Le patron</h2>
                <p className="text-sm md:text-base text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 7 */}
            <div className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div className="card-body h-full" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">Un chat</h2>
                <p className="text-sm md:text-base text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
        </div>
        <button onClick={() => scrollRef.current.scrollBy({ left: -325, behavior: 'smooth' })} className="absolute left-2 md:left-5 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => scrollRef.current.scrollBy({ left: 325, behavior: 'smooth' })} className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md z-10">
          <ChevronRight size={20} />
        </button>
      </div>
      <hr/>

      {/* CTA Section */}
      <div className="hero py-12 md:py-16 bg-base-300 bg-center bg-black">
        <div className="hero-content text-center text-white px-4">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-sm md:text-base mb-6">
              Rejoignez-nous dès aujourd'hui et profitez de tous nos avantages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-sm md:btn-md">S'inscrire</button>
              <button className="btn btn-outline btn-sm md:btn-md">Nous contacter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}