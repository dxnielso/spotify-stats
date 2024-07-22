import PlayIcon from "@/icons/PlayIcon";
import PauseIcon from "@/icons/PauseIcon";
import { SpotifyTrack } from "@/helpers/types";
import { formatTime } from "@/utils/format";

const ArtistTrack = ({
  track,
  currentPlayingId,
  isPlaying,
  handleSetAudio,
}: {
  track: SpotifyTrack;
  currentPlayingId: string;
  isPlaying: boolean;
  handleSetAudio: ({ url, id }: { url: string; id: string }) => void;
}) => {
  return (
    <li className="w-full bg-white/10 text-white/90 rounded-md p-4 flex space-x-4 hover:bg-white/20 duration-200">
      <a href={track.external_urls.spotify} className="rounded-full w-20 h-20">
        <img
          src={track.album.images?.[1].url}
          alt={`Imagen del soundtrack ${track.name}`}
          className={`rounded-full w-20 h-20 ${
            currentPlayingId == track.id && isPlaying ? "animate-spin-slow" : ""
          }`}
        />
      </a>
      <div className="flex-1 flex flex-col space-y-2">
        <div className="flex justify-between space-x-2">
          <h3 className="text-white/90 font-bold text-xl leading-6 flex-1">
            {track.name}
          </h3>
          {track.is_playable && (
            <button
              type="button"
              className="size-9 outline-none bg-primaryColor rounded-full p-2 hover:opacity-80 duration-300"
              onClick={() =>
                handleSetAudio({ url: track.preview_url ?? "", id: track.id })
              }
            >
              {currentPlayingId == track.id && isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>
          )}
        </div>
        <p className="font-light text-xs text-white/50 inline-flex">
          {formatTime(track.duration_ms / 1000)} min
        </p>
        <ul className="font-light text-xs text-white/70 leading-5">
          {track.artists.map((artist, index) => (
            <li key={index}>
              <a
                key={artist.id}
                href={artist.external_urls.spotify}
                target="_blank"
                className="border-b border-transparent duration-300 hover:border-primaryColor"
              >
                {artist.name}
              </a>
              <span>{index < track.artists.length - 1 && ", "}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ArtistTrack;
