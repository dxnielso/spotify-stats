"use client";

import { useState, useEffect } from "react";
import { getRefreshToken } from "@/helpers/authHelpers";
import type { SpotifyArtist } from "@/helpers/types";
import { formatNumber } from "@/utils/format";
import SpotifyIcon from "@/icons/SpotifyIcon";
import ArtistInfoSkeleton from "@/components/skeletons/ArtistInfoSkeleton";

const ArtistInfo = ({ id }: { id: string }) => {
  // useState
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState<SpotifyArtist>();

  // useEffects
  useEffect(() => {
    fetchArtist();
  }, []);

  // Funciones
  const fetchArtist = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${
        window.location.origin
      }/api/artist?accessToken=${window.localStorage.getItem(
        "access_token"
      )}&id=${id}`
    );
    if (response.ok) {
      const data = await response.json();
      setArtist(data);
      setIsLoading(false);
    } else {
      if (response.status == 401) {
        getRefreshToken();
      } else {
        const errorResponse = await response.json();
        console.log(
          `Nuevo error no documentado: ${errorResponse.status} - ${errorResponse.responseText}`
        );
      }
    }
  };

  if (isLoading) {
    return <ArtistInfoSkeleton />;
  }
  if (!artist) {
    return <div>La consulta no devuelve datos</div>;
  }

  return (
    <section className="w-full h-full flex flex-col justify-start items-center mb-20">
      <img
        src={artist.images?.[1].url}
        alt={`Imágen de ${artist.name}`}
        className="size-48 rounded-full duration-200 group-hover:opacity-40 mb-5"
      />
      <h1 className="text-white/80 font-extrabold text-4xl mb-3 text-center mx-12 relative">
        {artist.name}
        <div className="h-auto w-auto absolute -top-1 -right-9 flex">
          <span className="text-sm font-light">#</span>
          <span className="text-base font-bold text-primaryColor">
            {artist.popularity}
          </span>
        </div>
      </h1>
      <h2 className="text-primaryColor font-medium text-3xl mb-0">
        {artist.followers?.total
          ? formatNumber(artist.followers.total)
          : "No disponible"}
      </h2>
      <span className="text-white/50 font-medium text-md mb-6">seguidores</span>
      <ul className="flex justify-center items-center flex-wrap gap-2 mb-6">
        {artist.genres?.map((genre, index) => (
          <li
            key={index}
            className="px-2 py-0.5 rounded-sm border border-primaryColor bg-white/10 text-white/90 text-base font-light"
          >
            {genre}
          </li>
        ))}
      </ul>
      <a
        target="_blank"
        href={artist.external_urls.spotify}
        className="px-5 py-2 rounded-sm text-base font-semibold bg-black text-white/80 hover:opacity-60 duration-200 flex justify-center items-center gap-x-4"
      >
        Visitar Spotify <SpotifyIcon className="size-7" />
      </a>
    </section>
  );
};

export default ArtistInfo;
