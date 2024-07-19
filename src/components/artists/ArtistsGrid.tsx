"use client";

import { useState, useEffect } from "react";
import ArtistsCard from "./ArtistsCard";
import { type SpotifyArtist } from "@/helpers/types";
import { getRefreshToken } from "@/helpers/authHelpers";
import ArtistsGridSkeleton from "../skeletons/ArtistsGridSkeleton";

const ArtistsGrid = ({ timeRange }: { timeRange: string }) => {
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopArtists();
  }, [timeRange]);

  // Funciones
  const fetchTopArtists = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${
        window.location.origin
      }/api/topArtists?accessToken=${window.localStorage.getItem(
        "access_token"
      )}&timeRange=${timeRange}`
    );
    if (response.ok) {
      const data = await response.json();
      setArtists(data.items);
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
    return <ArtistsGridSkeleton />;
  }
  if (!artists || artists.length === 0) {
    return (
      <span className="text-sm ls:text-base font-medium text-white/80">
        No hay artistas para mostrar
      </span>
    );
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:gap-5 xl:grid-cols-5 w-full gap-3">
      {artists.map((artist, i) => (
        <ArtistsCard key={artist.id} artist={artist} index={i + 1} />
      ))}
    </section>
  );
};

export default ArtistsGrid;
