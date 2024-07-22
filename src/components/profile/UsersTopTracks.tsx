"use client";

import { getRefreshToken } from "@/helpers/authHelpers";
import { SpotifyTopTrack } from "@/helpers/types";
import { useState, useEffect } from "react";
import UserTopTracksSkeleton from "../skeletons/UserTopTracksSkeleton";
import UserTopTrack from "./UserTopTrack";

const UsersTopTracks = () => {
  // useState
  const [isLoading, setIsLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<SpotifyTopTrack[]>([]);

  // useEffect
  useEffect(() => {
    fetchUsersTopItems();
  }, []);

  // Funciones
  const fetchUsersTopItems = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          window.location.origin
        }/api/usersTopItems?accessToken=${window.localStorage.getItem(
          "access_token"
        )}&type=tracks&timeRange=short_term&limit=50`
      );

      if (!response.ok) {
        // Manejar casos de error HTTP
        if (response.status === 401) {
          console.log("Refrescando token");
          await getRefreshToken();
        } else {
          // Manejar otros errores HTTP
          const errorResponse = await response.text(); // Usar text() para manejar posibles respuestas no JSON
          console.error(`Error HTTP ${response.status}: ${errorResponse}`);
        }
      } else {
        // Si la respuesta es exitosa, analiza el JSON
        const data = await response.json();
        setTopTracks(data.items);
      }
    } catch (error) {
      // Captura y maneja errores de red u otros errores
      console.error("Error fetching users top items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <UserTopTracksSkeleton />;
  }

  if (topTracks.length == 0) {
    return <div>No se puedo obtener los datos del perfil</div>;
  }

  return (
    <section>
      <h2 className="text-2xl xl:text-3xl font-bold text-white/80 mb-3 xl:mb-5 2xl:mb-7">
        Canciones más escuchadas recientemente
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full">
        {topTracks.map((track) => (
          <UserTopTrack key={track.id} track={track} />
        ))}
      </ul>
    </section>
  );
};

export default UsersTopTracks;
