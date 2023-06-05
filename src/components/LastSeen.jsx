import PropTypes from "prop-types";
import moment from "moment";

const LastSeen = ({ lastPlayed }) => {
  const formattedTime = moment(lastPlayed?.playedAt).fromNow();

  return (
    <div className="flex flex-col absolute right-0 bottom-10 text-white text-[0.75rem] text-right">
      <span>Last seen 👀</span>
      <span className="ml-1 px-1 font-medium bg-red-500 text-black rounded-tl rounded-bl">
        {formattedTime}
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
