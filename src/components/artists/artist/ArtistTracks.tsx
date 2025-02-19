"use client";

import ArtistTracksSkeleton from "@/components/skeletons/ArtistTracksSkeleton";
import { getRefreshToken } from "@/helpers/authHelpers";
import { useState, useEffect, useRef } from "react";
import ArtistTrack from "./ArtistTrack";
import { SpotifyTrack } from "@/helpers/types";

const ArtistTracks = ({ id }: { id: string }) => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchArtistTopTracks();
  }, []);

  const fetchArtistTopTracks = async () => {
    setIsLoadingTracks(true);

    try {
      const response = await fetch(
        `${
          window.location.origin
        }/api/artistTopTracks?accessToken=${window.localStorage.getItem(
          "access_token"
        )}&id=${id}`
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
        setTracks(data.tracks);
      }
    } catch (error) {
      // Captura y maneja errores de red u otros errores
      console.error("Error fetching artist top tracks:", error);
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const handleSetAudio = ({ url, id }: { url: string; id: string }) => {
    if (audioPlayerRef.current) {
      if (currentPlayingId == id) {
        if (isPlaying) {
          audioPlayerRef.current?.pause();
          setIsPlaying(false);
        } else {
          audioPlayerRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioPlayerRef.current.src = url;
        audioPlayerRef.current.load();
        audioPlayerRef.current.play();
        setCurrentPlayingId(id);
        setIsPlaying(true);
      }
    }
  };

  if (isLoadingTracks) {
    return <ArtistTracksSkeleton />;
  }

  return (
    <section>
      <audio ref={audioPlayerRef} onEnded={() => setIsPlaying(false)} />
      <h2 className="text-2xl xl:text-3xl font-bold text-white/80 mb-3 xl:mb-5 2xl:mb-7">
        Top Canciones
      </h2>
      <ul className="grid grid-cols-1 w-full gap-3 sm:grid-cols-2 xl:gap-5 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
        {tracks.map((track) => (
          <ArtistTrack
            key={track.id}
            track={track}
            currentPlayingId={currentPlayingId}
            isPlaying={isPlaying}
            handleSetAudio={handleSetAudio}
          />
        ))}
      </ul>
    </section>
  );
};

export default ArtistTracks;
