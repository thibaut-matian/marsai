import { useTranslation } from 'react-i18next';

export default function ContactSection({ title, phone, email, address, mapUrl }) {
  const { t } = useTranslation();

  return (
    <div className="relative bg-black text-white overflow-hidden">
      <div className="py-12 md:py-16 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
          {title || t('home.contact')}
        </h2>
      </div>

      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-0 border border-white/10">
          <div className="lg:w-2/5 flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="space-y-7">
              {/* Phone */}
              <div className="group">
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                  {t('home.phone')}
                </p>
                <p className="text-base font-light tracking-wide group-hover:text-white/70 transition-colors duration-300">
                  {phone || '+06 36 65 65 65'}
                </p>
              </div>
              
              {/* Email */}
              <div className="group">
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                  {t('home.email')}
                </p>
                <p className="text-base font-light tracking-wide break-all group-hover:text-white/70 transition-colors duration-300">
                  {email || 'contact@example.com'}
                </p>
              </div>
              
              {/* Address */}
              <div className="group">
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                  {t('home.address')}
                </p>
                <p className="text-base font-light tracking-wide leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {address?.split('\\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < address?.split('\\n').length - 1 && <br />}
                    </span>
                  )) || (
                    <>
                      155 rue Peyssonnel<br />Marseille 13002
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="w-full aspect-square lg:aspect-auto lg:h-full min-h-72 grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src={mapUrl || "https://www.google.com/maps?q=155%20rue%20peysonnel%20marseille&output=embed"}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}