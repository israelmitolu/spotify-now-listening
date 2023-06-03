import { useEffect, useState } from "react";

import SpotifyNowPlaying from "./NowPlaying";
import getNowPlayingItem from "./SpotifyAPI";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [currentTrack, setcurrentTrack] = useState({});
  const [lastPlayed, setLastPlayed] = useState({});

  // Get the currently playing song from the Spotify API
  useEffect(() => {
    getNowPlayingItem().then((res) => {
      setcurrentTrack(res);
      setLoading(false);
    });
  });

  // Get the last played song from the Spotify API
  useEffect(() => {
    getNowPlayingItem().then((res) => {
      setLastPlayed(res);
    });
  }, []);

  // Set the title of the page to the song title
  useEffect(() => {
    if (currentTrack && !loading) {
      if (currentTrack.isPlaying) {
        document.title = `Mitolu is listening to ${currentTrack.title}`;
      } else {
        document.title = `Mitolu last listened to ${currentTrack.title} by ${currentTrack.artist}`;
      }
    } else {
      document.title = "Mitolu is offline";
    }
  }, [currentTrack, loading]);

  // Set the background color of the page to the album cover
  useEffect(() => {
    if (currentTrack.albumImageUrl && currentTrack.isPlaying) {
      document.body.style.backgroundImage = `url(${currentTrack.albumImageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundBlendMode = "soft-light";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [currentTrack.albumImageUrl, currentTrack.isPlaying]);

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format the time to be displayed
  const formatTime = (time) => {
    const timeString = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const [hours, minutes] = timeString.split(":");

    return (
      <div className="time">
        <span>{hours}</span>
        <span className="animate-blink-time">:</span>
        <span>{minutes}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full p-6 m-auto backdrop-blur-xl">
      <nav className="w-full font-medium text-white text-[0.85rem] uppercase flex justify-between items-center leading-4">
        <p>
          Israel <br /> Mitolu
        </p>
        <div className="text-black">
          {!currentTrack.isPlaying ? (
            <span className="bg-gray-100 w-fit py-[2px] px-[6px] rounded-[4px]">
              Offline
            </span>
          ) : (
            <div className="flex items-center justify-around bg-gray-100 w-fit py-[2px] px-2 rounded-[4px]">
              <span>Live</span>
              <div className="h-2 w-2 ml-1 rounded-full bg-red-700 animate-pulse"></div>
            </div>
          )}
        </div>
        <p className="text-right uppercase">
          <span className="text-gray-300 text-[0.75rem]">Osun, NG</span>
          <span>{formatTime(currentTime)}</span>
        </p>
      </nav>

      <SpotifyNowPlaying
        currentTrack={currentTrack}
        loading={loading}
        lastPlayed={lastPlayed}
      />

      <footer className="text-center text-gray-500 text-[0.75rem]">
        <p>
          Songs I&apos;m listening to on{" "}
          <a
            href="https://open.spotify.com/user/utawon8gsgty2atyw86cw94ym"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-300"
          >
            Spotify{" "}
          </a>
          :)
        </p>
      </footer>
    </div>
  );
}
export default App;
