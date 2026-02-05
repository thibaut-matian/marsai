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
  const scrollRef = useRef(null);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero text-white">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0 ">
          <source src={teaserVideo} type="video/mp4"/>
        </video>
        <div className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black to-transparent z-10 pt-70"></div>
        <div className="hero-content relative z-10">
          <div className="max-w-full text-center">
            <h1 className="text-5xl font-bold pb-60 pt-20">Bienvenue sur Marsai</h1>
            <button className="text-lg border shadow-lg border-white/80 bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 hover:bg-white hover:text-black transition-colors">Commencer</button>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 pt-25 text-white">À PROPOS DE MARSAI</h2>
          <p className="text-center max-w-2xl mx-auto text-white">
            Marsai est une plateforme innovante qui vous permet de créer et de gérer vos projets de manière intuitive et efficace.
          </p>
        </div>
      </div>
      <hr/>

{/* Contenu */}
<div className="relative z-10 h-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8 pb-72"> <button
onClick={() => navigate('/submit-movie')}
className="text-base sm:text-lg border border-white/80 bg-white/10 backdrop-blur-md rounded-lg px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors duration-300">
Commencer
</button>
</div>
</div>

      {/*Jury Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">NOTRE JURY</h2>
          <p className="text-center max-w-2xl mx-auto text-white">
            Découvrez les experts qui évaluent nos projets et garantissent la qualité de notre plateforme.
          </p>
        </div>
      </div>
      <div className="relative bg-black p-10">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-8">
            {/* Jury 1 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Etchebest</h2>
                <p className="text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent min-w-full"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 2 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Le patron</h2>
                <p className="text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 3 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Un chat</h2>
                <p className="text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 4 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Les Winx</h2>
                <p className="text-white relative z-10">La magiiiiiie</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 5 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Etchebest</h2>
                <p className="text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent min-w-full"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 6 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Le patron</h2>
                <p className="text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 7 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Un chat</h2>
                <p className="text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
        </div>
        <button onClick={() => scrollRef.current.scrollBy({ left: -325, behavior: 'smooth' })} className="absolute left-5 top-1/2 transform -translate-y-1/2 btn btn-circle z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => scrollRef.current.scrollBy({ left: 325, behavior: 'smooth' })} className="absolute right-5 top-1/2 transform -translate-y-1/2 btn btn-circle z-10">
          <ChevronRight size={20} />
        </button>
      </div>
      <hr/>

{/* Criteres de soumission */}
<div className="py-12 md:py-16 bg-black overflow-hidden">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
      Critères de soumission
    </h2>
    
    <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
      {[
        "Porter des lunettes",
        "Aimer les blagues de beauf",
        "Savoir imiter Dylan",
        "S'appeler Thibaut Matian"
      ].map((critere, index) => (
        <div key={index} className="flex items-baseline text-white text-sm md:text-base w-full">
          {/* Numéro - whitespace-nowrap pour éviter qu'il ne saute de ligne */}
          <span className="font-bold whitespace-nowrap">{index + 1}.</span>
          
          {/* Les points dynamiques : flex-grow prend toute la place restante */}
          <div className="flex-grow border-b border-dotted border-white/40 mx-2 mb-1"></div>
          
          {/* Texte du critère - text-right pour l'aligner à la fin */}
          <span className="font-medium uppercase text-right leading-tight">
            {critere}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

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

</div>
);
}