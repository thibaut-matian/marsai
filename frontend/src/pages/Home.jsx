import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import teaserVideo from '../assets/videos/Teaser.mp4';
import juryImage1 from '../assets/img/test-etchebest.jpg';
import juryImage2 from '../assets/img/test-lui.jpg';
import juryImage3 from '../assets/img/test-chat.png';
import juryImage4 from '../assets/img/test-winx.png';
export default function Home() {
  const scrollRef = useRef(null);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero text-white">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0 ">
          <source src={teaserVideo} type="video/mp4"/>
        </video>
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black to-transparent z-10 pt-70"></div>
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

      {/* Criteres de soumission */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 pt-25 text-white">CRITERES DE SOUMISSION</h2>
          <p className="text-center max-w-2xl mx-auto text-white">
            1. ........................................................................... PORTER DES LUNETTES<br />
            2. ........................................................... AIMER LES BLAGUES DE BEAUF<br />
            3. ........................................................................... S'AVOIR IMITER DYLAN<br />
            4. ................................................................ S'APPELER THIBAUT MATIAN<br />
          </p>
        </div>
      </div>
      <hr/>

      {/*Jury Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">NOTRE JURY</h2>
          <p className="text-center max-w-2xl mx-auto text-white">
            Découvrez les experts qui évaluent nos projets et garantissent la qualité de notre plateforme.
          </p>
        </div>
      </div>
      <div ref={scrollRef} className="relative flex overflow-x-auto snap-x snap-mandatory gap-8 bg-black p-10">
            {/* Jury 1 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Etchebest</h2>
                <p className="text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent min-w-full"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 2 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Le patron</h2>
                <p className="text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 3 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Un chat</h2>
                <p className="text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 4 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Les Winx</h2>
                <p className="text-white relative z-10">La magiiiiiie</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 5 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Etchebest</h2>
                <p className="text-white relative z-10">C'est qui le patron</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent min-w-full"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 6 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Le patron</h2>
                <p className="text-white relative z-10">C'est moi</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            {/* Jury 7 */}
            <div className="card bg-base-200 h-100 min-w-72 snap-center">
              <div className="card-body h-100" style={{ backgroundImage: `url(${juryImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <h2 className="card-title pt-75 text-white relative z-10">Un chat</h2>
                <p className="text-white relative z-10">Miaou</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            <button onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })} className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-primary z-10">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })} className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-primary z-10">
              <ChevronRight size={20} />
            </button>
      </div>
      <hr/>

      {/* CTA Section */}
      <div className="hero py-16 bg-base-300 bg-center bg-black">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="mb-6">
              Rejoignez-nous dès aujourd'hui et profitez de tous nos avantages.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary">S'inscrire</button>
              <button className="btn btn-outline">Nous contacter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}