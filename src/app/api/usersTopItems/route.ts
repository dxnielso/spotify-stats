// Obtener los top items (tracks o artistas) de un usuario

import { ErrorData } from "@/helpers/types";

export const GET = async (request: Request) => {
  const urlObject = new URL(request.url);
  const parametros = urlObject.searchParams;
  const accessToken = parametros.get("accessToken");
  const type = parametros.get("type") ?? "artists";
  const timeRange = parametros.get("timeRange") ?? "short_term";
  const limit = parametros.get("limit") ?? "20";

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    const errorData: ErrorData = {
      status: response.status,
      statusText: response.statusText,
    };
    // Si el cuerpo de la respuesta contiene información adicional
    const responseText = await response.text();
    if (responseText) {
      errorData["responseText"] = responseText;
    }

    return new Response(JSON.stringify(errorData), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
