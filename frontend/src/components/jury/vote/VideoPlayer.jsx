/**
 * Lecteur vidéo du film en cours de visionnage
 */
const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="w-full lg:w-3/4">
      <div className="card bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full rounded-3xl overflow-hidden">
        <figure className="aspect-video">
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
          />
        </figure>
      </div>
    </div>
  );
};

export default VideoPlayer;
