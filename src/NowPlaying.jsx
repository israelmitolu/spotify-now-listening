/* eslint-disable react/prop-types */
import spotifyLogo from "./assets/spotifyLogo.png";
import { useEffect, useState } from "react";
import getNowPlayingItem from "./SpotifyAPI";

const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  useEffect(() => {
    Promise.all([
      getNowPlayingItem(
        props.client_id,
        props.client_secret,
        props.refresh_token
      ),
    ]).then((results) => {
      setResult(results[0]);
      setLoading(false);
    });
  });

  // Set the title of the page to the song title
  useEffect(() => {
    if (result.title && result.isPlaying) {
      document.title = `Mitolu is listening to ${result.title}`;
    } else {
      document.title = `Mitolu last listened to ${result.title} by ${result.artist}`;
    }
  }, [result.title, result.isPlaying]);

  // Set the background color of the page to the album cover
  useEffect(() => {
    if (result.albumImageUrl && result.isPlaying) {
      document.body.style.backgroundImage = `url(${result.albumImageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundBlendMode = "soft-light";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [result.albumImageUrl, result.isPlaying]);

  return (
    <div
      className="flex
         min-w-[200px] w-[300px] h-fit text-white items-center justify-center p-2  text-base border rounded-lg border-gray-dark bg-gray-dark"
    >
      {loading ? (
        <div className="flex p-2 w-fit items-center justify-center text-gray text-base">
          <img className="w-14 h-14" src={spotifyLogo} alt="" />
          <p className="tracking-wider px-1 text-base text-left ">Loading...</p>
        </div>
      ) : (
        <div className="flex p-2 w-fit text-base h-full items-center justify-center hover:cursor-pointer">
          {result.isPlaying ? (
            <div className=" w-fit  h-full py-2 flex flex-col group text-left justify-around">
              <div className="w-full h-fit relative group-hover:scale-105 transition">
                <img
                  className="w-fit h-6 p-1 object-contain absolute z-10 animate-spin-slow"
                  src={spotifyLogo}
                  alt=""
                />
                <img
                  className="w-fit h-full rounded-lg"
                  src={result.albumImageUrl}
                  alt="album-image"
                />
              </div>

              <div className="flex flex-col uppercase tracking-tighter text-center mt-2">
                <p className="text-[14px]">{result.artist}</p>
                <a
                  className="hover:underline transition text-2xl font-semibold"
                  href={result.songUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {result.title}
                </a>
              </div>
            </div>
          ) : (
            // if not playing
            <div className="flex items-center justify-around  uppercase text-center mt-2 ">
              <img className="w-14 h-14 mr-6" src={spotifyLogo} alt="" />
              <p>Not Playing</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
