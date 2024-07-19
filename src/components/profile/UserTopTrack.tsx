import { SpotifyTopTrack } from "@/helpers/types";
import { formatTime } from "@/utils/format";

const UserTopTrack = ({ track }: { track: SpotifyTopTrack }) => {
  return (
    <li className="w-full h-auto hover:bg-white/10 text-white/90 rounded-md p-2 lg:p-4 group flex space-x-3 sm:space-x-5 duration-200">
      <section>
        <img
          src={track.album.images[2].url}
          alt={`Imagen del album ${track.name}`}
          className="size-12 duration-200 group-hover:opacity-40"
        />
      </section>
      <section className="flex-1">
        <h3 className="text-lg font-bold text-white">{track.name}</h3>
        <ul>
          {track.artists.map((artist, index) => (
            <li key={artist.id} className="inline">
              <a
                href={artist.href}
                target="_blank"
                className="text-sm font-light text-white/60 hover:text-white duration-200"
              >
                {artist.name}
                <span>{index < track.artists.length - 1 && ", "}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p className="text-sm font-light text-white/60">
          {formatTime(track.duration_ms / 1000)}
        </p>
      </section>
    </li>
  );
};

export default UserTopTrack;
