import { useEffect, useState } from "react";

import NowPlaying from "./components/NowPlaying";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { fetchNowPlaying, fetchLastPlayed } from "./SpotifyAPI";
import LastSeen from "./components/LastSeen";

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

  // Set the background color of the page to the album cover
  useEffect(() => {
    if (currentTrack?.albumImageUrl && currentTrack?.isPlaying) {
      document.body.style.backgroundImage = `url(${currentTrack.albumImageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundBlendMode = "soft-light";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [currentTrack?.albumImageUrl, currentTrack?.isPlaying]);

  return (
    <div className="relative flex flex-col items-center justify-between h-screen w-full p-6 m-auto backdrop-blur-xl">
      <Nav currentTrack={currentTrack} />
      <NowPlaying
        currentTrack={currentTrack}
        loading={loading}
        lastPlayed={lastPlayed}
      />
      <Footer />
      {!currentTrack?.isPlaying && <LastSeen lastPlayed={lastPlayed} />}
    </div>
  );
}
export default App;
