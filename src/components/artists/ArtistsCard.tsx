import { SpotifyArtist } from "@/helpers/types";
import Link from "next/link";

const ArtistsCard = ({
  artist,
  index,
}: {
  artist: SpotifyArtist;
  index: number;
}) => {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="relative flex flex-col justify-center p-4 hover:bg-white/5 duration-200 group rounded-sm"
    >
      <figure className="relative w-full h-full flex justify-center items-center mb-4 ">
        <img
          src={artist.images?.[1].url}
          alt={`Imágen de ${artist.name}`}
          className="size-32 sm:size-36 2xl:size-48 rounded-full duration-200 group-hover:opacity-40"
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-3xl font-bold text-white/60 duration-200 opacity-0 group-hover:opacity-100">
          #{index}
        </span>
      </figure>
      <h2 className="flex justify-center text-sm lg:text-base font-bold text-white/50 group-hover:text-white text-center duration-200">
        {artist.name}
      </h2>
    </Link>
  );
};
export default ArtistsCard;
