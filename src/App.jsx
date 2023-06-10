import { useEffect, useState } from "react";

import NowPlaying from "./components/NowPlaying";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { fetchNowPlaying, fetchLastPlayed } from "./SpotifyAPI";
import LastSeen from "./components/LastSeen";
import AudioVisualizer from "./components/AudioVisualizer";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentTrack, setcurrentTrack] = useState({});
  const [lastPlayed, setLastPlayed] = useState({});

  // Get the currently playing song from the Spotify API
  useEffect(() => {
    fetchNowPlaying().then((res) => {
      setcurrentTrack(res);
      setLoading(false);
    });
  }, []);

  //  Check the currently playing song every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNowPlaying().then((res) => {
        setcurrentTrack(res);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // If there is no currently playing song, get the last played song
  useEffect(() => {
    if (
      !currentTrack?.isPlaying ||
      currentTrack?.currently_playing_type !== "track"
    ) {
      fetchLastPlayed().then((res) => {
        setLastPlayed(res);
      });
    }
  }, [currentTrack]);

  // Set the page title to the currently playing song or the last played song
  useEffect(() => {
    if (currentTrack?.isPlaying && !loading) {
      document.title = `Mitolu is listening to ${currentTrack.title}`;
    } else if (lastPlayed && !loading) {
      document.title = `Mitolu last listened to ${lastPlayed.title} by ${lastPlayed.artist}`;
    } else {
      document.title = "Mitolu is offline";
    }
  }, [currentTrack, loading, lastPlayed]);

  // Set the background image to the currently playing song or the last played song
  useEffect(() => {
    const imageUrl = currentTrack?.isPlaying
      ? currentTrack?.albumImageUrl
      : lastPlayed?.albumImageUrl;

    document.body.style.backgroundImage = imageUrl
      ? `url(${imageUrl})`
      : "none";
    document.body.style.backgroundSize = imageUrl ? "cover" : null;
    document.body.style.backgroundBlendMode = imageUrl ? "soft-light" : null;
  }, [
    currentTrack?.albumImageUrl,
    currentTrack?.isPlaying,
    lastPlayed?.albumImageUrl,
  ]);

  return (
    <div className="relative flex flex-col items-center justify-between h-screen w-full p-6 m-auto backdrop-blur-xl">
      <Nav currentTrack={currentTrack} />
      <div className="flex flex-col items-center">
        <NowPlaying
          currentTrack={currentTrack}
          loading={loading}
          lastPlayed={lastPlayed}
        />
        <AudioVisualizer currentTrack={currentTrack} lastPlayed={lastPlayed} />
      </div>
      {!currentTrack?.isPlaying && <LastSeen lastPlayed={lastPlayed} />}
      <Footer />
    </div>
  );
}
export default App;
