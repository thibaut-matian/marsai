const VideoPlayer = ({ videoUrl, youtubeId }) => {
  return (
    <div className="w-full lg:w-3/4">
      <div className="card bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full rounded-3xl overflow-hidden">
        <figure className="aspect-video">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1`}
              title="Film en compétition"
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
            />
          )}
        </figure>
      </div>
    </div>
  );
};

export default VideoPlayer;
