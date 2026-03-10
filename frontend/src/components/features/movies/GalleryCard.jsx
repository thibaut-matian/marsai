import { Flag } from 'lucide-react';
import { getFlagClass } from '../../../constants/countryCodes';

export default function GalleryCard({ image, onClick }) {
  return (
    <div 
      key={image.id} 
      className="max-w-140 rounded-lg shadow-md overflow-hidden bg-white/5 relative cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick(image)}
    >
      <div className="h-64 flex items-center justify-center bg-gray-100 relative">
        <div className="absolute top-2 left-2 pointer-events-none"><div className="ml-2">
            {image.country ? (
              <i
                className={`${getFlagClass(image.country)} inline-block w-5 h-5`}
                aria-hidden="true"
                title={image.country}
              />
            ) : (
              <Flag className="h-5 w-5 text-white/90" />
            )}
          </div></div>

        <img
          src={image.src}
          alt={`Photo ${image.id}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white backdrop-blur-sm flex items-center justify-between px-3 py-2">
          <div className="flex gap-5 items-center justify-between w-full">
            <h3 className="text-base font-medium">{image.title}</h3>
            {image.director && (
              <h4 className="text-sm italic text-gray-200">{image.director}</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
