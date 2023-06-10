import { useEffect, useState } from "react";
import PlayBtn from "../assets/icons/play-sharp.svg";
import PauseBtn from "../assets/icons/pause-sharp.svg";
import ClickSound from "../audio/click.mp3";

const AudioVisualizer = ({ currentTrack, lastPlayed }) => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expand, setExpand] = useState(false);
  const clickSound = new Audio(ClickSound);

  useEffect(() => {
    // Initialize the audio
    const newAudio = new Audio(
      currentTrack?.previewUrl || lastPlayed?.previewUrl
    );
    setAudio(newAudio);

    return () => {
      // Cleanup audio when unmounting
      newAudio.pause();
      newAudio.src = "";
      setPlaying(false);
    };
  }, [currentTrack]);

  const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  const playAudio = () => {
    if (audio) {
      audio.play();
      setPlaying(true);
      setExpand(true);
      playClickSound();
    }
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setPlaying(false);
      setExpand(false);
      playClickSound();
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
    };

    if (audio) {
      const intervalId = setInterval(handleTimeUpdate, 100);
      return () => clearInterval(intervalId);
    }
  }, [audio]);

  return (
    <div
      className={`bg-[#1DB954] rounded-full w-${
        expand ? "64" : "14"
      } h-12 mt-4 flex items-center justify-between px-3 transition-all duration-500 ease-in-out `}
    >
      <div className="flex items-center cursor-pointer">
        {!playing ? (
          <img
            src={PlayBtn}
            alt="Play"
            className="w-8 h-8"
            onClick={playAudio}
          />
        ) : (
          <img
            src={PauseBtn}
            alt="Pause"
            className="w-8 h-8"
            onClick={pauseAudio}
          />
        )}
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => {
          if (audio) {
            const newTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = newTime;
          }
        }}
        className={`${
          expand ? "block" : "hidden"
        } h-1 bg-green-500 rounded-full transition w-fit`}
      />
    </div>
  );
};

export default AudioVisualizer;
