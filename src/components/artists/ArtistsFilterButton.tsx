"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ArtistsFilterButton = ({
  texto,
  newTimeRangeValue,
}: {
  texto: string;
  newTimeRangeValue: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams ?? "");
    if (!params.get("timeRange")) {
      // Si no hay ningún parámetro timeRange en la URL, asignarle uno por defecto
      params.set("timeRange", "long_term");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  // Función para manejar el click y actualizar el estado y la URL
  const setNewParam = (timeRangeValue: string) => {
    const params = new URLSearchParams(searchParams ?? "");
    params.set("timeRange", timeRangeValue);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <li>
      <button
        className={`h-full w-full leading-4 text-[13px] lg:text-[15px] font-normal duration-200 hover:text-white ${
          searchParams && searchParams.get("timeRange") === newTimeRangeValue
            ? "text-white"
            : "text-white/50"
        }`}
        onClick={() => setNewParam(newTimeRangeValue)}
      >
        {texto}
      </button>
    </li>
  );
};

export default ArtistsFilterButton;
