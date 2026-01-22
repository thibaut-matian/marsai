export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Bienvenue sur Marsai</h1>
            <p className="py-6">
              Découvrez une plateforme moderne et innovante conçue pour vous offrir la meilleure expérience possible.
            </p>
            <button className="btn btn-primary">Commencer</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Rapide</h2>
                <p>Des performances optimales pour une expérience fluide et réactive.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">En savoir plus</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Sécurisé</h2>
                <p>Vos données sont protégées avec les dernières technologies de sécurité.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">En savoir plus</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Intuitif</h2>
                <p>Une interface simple et élégante pour une utilisation sans effort.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">En savoir plus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="hero py-16 bg-base-300">
        <div className="hero-content text-center">
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
