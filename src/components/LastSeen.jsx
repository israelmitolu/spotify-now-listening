import PropTypes from "prop-types";
import moment from "moment";

const LastSeen = ({ lastPlayed }) => {
  const formattedTime = moment(lastPlayed?.playedAt).fromNow();

  return (
    <div className="hidden md:block absolute right-3 bottom-6 text-white text-[0.85rem]">
      <span>
        Last Active on Spotify
        <span className="ml-1 px-1 font-medium bg-green-500 text-black rounded">
          {formattedTime}
        </span>
      </span>
    </div>
  );
};

LastSeen.propTypes = {
  lastPlayed: PropTypes.shape({
    playedAt: PropTypes.string,
  }),
};

export default LastSeen;
