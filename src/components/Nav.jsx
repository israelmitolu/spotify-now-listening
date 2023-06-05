import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Nav = ({ currentTrack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <span>
        <span>{hours}</span>
        <span className="animate-blink-time">:</span>
        <span>{minutes}</span>
      </span>
    );
  };

  return (
    <nav className="w-full font-medium text-white text-[0.85rem] uppercase flex justify-between items-center leading-4">
      <p>
        Israel <br /> Mitolu
      </p>
      <div className="text-black">
        {!currentTrack?.isPlaying ? (
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
      <p className="text-right uppercase flex flex-col items-end">
        <span className="text-gray-300 text-[0.75rem]">Osun, NG</span>
        <span>{formatTime(currentTime)}</span>
      </p>
    </nav>
  );
};

Nav.propTypes = {
  currentTrack: PropTypes.shape({
    isPlaying: PropTypes.bool,
  }),
};
export default Nav;
