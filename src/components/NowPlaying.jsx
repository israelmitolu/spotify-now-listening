/* eslint-disable react/prop-types */
import spotifyLogo from "../assets/spotifyLogo.png";

const NowPlaying = ({ currentTrack, loading, lastPlayed }) => {
  console.log(currentTrack, loading, lastPlayed);

  return (
    <div className="flex min-w-[200px] w-[300px] h-auto text-white items-center justify-center p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-xl">
      {loading && Object.keys(currentTrack).length > 0 ? (
        <div className="flex p-2 w-[70%] items-center justify-around text-gray">
          <img className="w-12 h-12" src={spotifyLogo} alt="" />
          <p className="uppercase">Loading...</p>
        </div>
      ) : Object.keys(currentTrack).length <= 0 ? (
        <div className="flex p-2 w-[70%] items-center justify-around text-gray">
          <img className="w-12 h-12" src={spotifyLogo} alt="" />
          <p className="uppercase">Not playing</p>
        </div>
      ) : (
        <div className="flex p-2 w-fit h-full items-center justify-center">
          <div className="w-fit h-full py-2 flex flex-col group text-left justify-around">
            <div className="w-full h-fit relative group-hover:scale-105 transition hover:cursor-pointer">
              <img
                className={`w-fit h-6 p-1 object-contain absolute z-10 ${
                  currentTrack.isPlaying ? "animate-spin-slow" : ""
                }`}
                src={spotifyLogo}
                alt=""
              />
              <a
                href={
                  currentTrack.isPlaying
                    ? currentTrack.songUrl
                    : lastPlayed.songUrl
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="w-fit h-full rounded-lg"
                  src={
                    currentTrack.isPlaying
                      ? currentTrack.albumImageUrl
                      : lastPlayed.albumImageUrl
                  }
                  alt={
                    currentTrack.isPlaying
                      ? currentTrack.title
                      : lastPlayed.title
                  }
                />
              </a>
            </div>

            <div className="flex flex-col uppercase tracking-tighter text-center mt-2">
              <p className="text-[14px]">
                {currentTrack.isPlaying
                  ? currentTrack.artist
                  : lastPlayed.artist}
              </p>
              <p className="text-2xl font-medium uppercase">
                {currentTrack.isPlaying ? currentTrack.title : lastPlayed.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
