import { ErrorData } from "@/helpers/types";

export const GET = async (request: Request) => {
  const urlObject = new URL(request.url);
  const parametros = urlObject.searchParams;
  const accessToken = parametros.get("accessToken");
  const timeRange = parametros.get("timeRange");

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
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
