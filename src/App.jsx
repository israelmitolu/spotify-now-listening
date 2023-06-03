import { useEffect, useState } from "react";

import NowPlaying from "./components/NowPlaying";
import getNowPlayingItem from "./SpotifyAPI";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
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
  }, [currentTrack]);

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

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full p-6 m-auto backdrop-blur-xl">
      <Nav currentTrack={currentTrack} />
      <NowPlaying
        currentTrack={currentTrack}
        loading={loading}
        lastPlayed={lastPlayed}
      />
      <Footer />
    </div>
  );
}
export default App;
