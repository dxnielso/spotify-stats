"use client";

import { getRefreshToken } from "@/helpers/authHelpers";
import { SpotifyUser } from "@/helpers/types";
import { useEffect, useState } from "react";
import UserProfileSkeleton from "../skeletons/UserProfileSkeleton";

const UsersProfile = () => {
  // useState
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<SpotifyUser>();

  // useEffect
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Funciones
  const fetchUserProfile = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          window.location.origin
        }/api/currentUsersProfile?accessToken=${window.localStorage.getItem(
          "access_token"
        )}`
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
        setProfile(data);
      }
    } catch (error) {
      // Captura y maneja errores de red u otros errores
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Borrando variables");

    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    window.localStorage.removeItem("code_verifier");
    window.location.href = "/";
  };

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (!profile) {
    return <div>No se puedo obtener los datos del perfil</div>;
  }
  return (
    <section className="w-full h-full flex flex-col justify-start items-center mb-20">
      <img
        src={profile.images?.[1].url}
        alt={`Imágen de ${profile.display_name}`}
        className="size-48 rounded-full duration-200 group-hover:opacity-40 mb-5"
      />
      <a href={profile.external_urls.spotify} target="_blank" className="group">
        <h1 className="text-white/80 group-hover:text-primaryColor duration-200 font-extrabold text-4xl mb-3 text-center mx-12">
          {profile.display_name}
        </h1>
      </a>
      <p className="text-primaryColor font-medium text-2xl mb-0">
        {profile.followers.total}
      </p>
      <span className="text-white/50 font-medium text-md mb-6">seguidores</span>
      <p className="px-2 py-0.5 mb-6 rounded-sm border  bg-white/10 text-white/90 text-base font-light border-primaryColor">
        {profile.product}
      </p>
      <button
        type="button"
        onClick={logout}
        className="px-5 py-2 rounded-sm text-base font-semibold bg-black text-white/80 hover:opacity-60 duration-200"
      >
        Cerrar sesión
      </button>
    </section>
  );
};

export default UsersProfile;
