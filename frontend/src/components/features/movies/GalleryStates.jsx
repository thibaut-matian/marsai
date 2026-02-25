export function GalleryLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
}

export function GalleryError({ message }) {
  return (
    <div className="alert alert-error max-w-md mx-auto mt-10">
      <span>{message}</span>
    </div>
  );
}

export function GalleryEmpty() {
  return (
    <div className="text-center text-gray-400 py-20">
      <p className="text-xl">Aucun film disponible pour le moment.</p>
    </div>
  );
}
