import PropTypes from "prop-types";
import spotifyLogo from "../assets/spotifyLogo.png";

const NowPlaying = ({ currentTrack, loading, lastPlayed }) => {
  const renderTrack = (track) => (
    <div className="flex p-2 w-fit h-full items-center justify-center">
      <div className="w-fit h-full py-2 flex flex-col group text-left justify-around">
        <div className="w-full h-fit relative group-hover:scale-105 transition hover:cursor-pointer">
          <img
            className={`w-fit h-6 p-1 object-contain absolute z-10 ${
              track.isPlaying ? "animate-spin-slow" : ""
            }`}
            src={spotifyLogo}
            alt=""
          />
          <a href={track.songUrl} target="_blank" rel="noreferrer">
            <img
              className="w-fit h-full rounded-lg"
              src={track.albumImageUrl}
              alt={track.title}
            />
          </a>
        </div>

        <div className="flex flex-col uppercase tracking-tighter text-center mt-2">
          <p className="text-[14px]">{track.artist}</p>
          <p className="text-2xl font-medium uppercase">{track.title}</p>
        </div>
      </div>
    </div>
  );

  const renderNotPlaying = () => (
    <>
      <img className="w-12 h-12" src={spotifyLogo} alt="" />
      <p className="uppercase">Not playing</p>
    </>
  );

  return (
    <div className="flex min-w-[200px] w-[300px] h-auto text-white items-center justify-center p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-xl">
      {currentTrack?.isPlaying && !loading
        ? renderTrack(currentTrack)
        : lastPlayed && !loading
        ? renderTrack(lastPlayed)
        : renderNotPlaying()}
    </div>
  );
};

NowPlaying.propTypes = {
  currentTrack: PropTypes.shape({
    isPlaying: PropTypes.bool,
    songUrl: PropTypes.string,
    albumImageUrl: PropTypes.string,
    artist: PropTypes.string,
    title: PropTypes.string,
  }),
  loading: PropTypes.bool,
  lastPlayed: PropTypes.shape({
    songUrl: PropTypes.string,
    albumImageUrl: PropTypes.string,
    artist: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default NowPlaying;
