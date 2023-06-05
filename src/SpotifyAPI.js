import queryString from "query-string";
import { Buffer } from "buffer";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN;

// Handles Spotify authentication and requests
const makeApiRequest = async (
  endpoint,
  client_id,
  client_secret,
  refresh_token
) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const { access_token } = await response.json();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// Get the currently playing track
export const getNowPlaying = async (
  client_id,
  client_secret,
  refresh_token
) => {
  return makeApiRequest(
    NOW_PLAYING_ENDPOINT,
    client_id,
    client_secret,
    refresh_token
  );
};

// Get the last played track
export const getLastPlayed = async (
  client_id,
  client_secret,
  refresh_token
) => {
  return makeApiRequest(
    LAST_PLAYED_ENDPOINT,
    client_id,
    client_secret,
    refresh_token
  );
};

// return now playing song data
export const fetchNowPlaying = async () => {
  try {
    const response = await getNowPlaying(
      client_id,
      client_secret,
      refresh_token
    );
    const data = await response.json();

    const albumImageUrl = data.item?.album.images[0].url;
    const artist = data.item?.artists.map((_artist) => _artist.name).join(",");
    const isPlaying = data.is_playing;
    const songUrl = data.item.external_urls.spotify;
    const title = data.item.name;
    const currently_playing_type = data.currently_playing_type;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      currently_playing_type,
    };
  } catch (error) {
    console.error("Error fetching now playing:", error);
  }
};

// return last played song data
export const fetchLastPlayed = async () => {
  try {
    const response = await getLastPlayed(
      client_id,
      client_secret,
      refresh_token
    );
    const data = await response.json();
    const lastPlayed = data.items?.[0].track;

    const albumImageUrl = lastPlayed?.album.images[0].url;
    const artist = lastPlayed?.artists.map((_artist) => _artist.name).join(",");
    const songUrl = lastPlayed?.external_urls.spotify;
    const title = lastPlayed?.name;
    const playedAt = data.items?.[0].played_at;

    return {
      albumImageUrl,
      artist,
      songUrl,
      title,
      playedAt,
    };
  } catch (error) {
    console.error("Error fetching last played tracks:", error);
  }
};
