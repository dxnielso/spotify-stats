// Función para generar random string (codigo de verificion) entre 43 y 128 caracteres
export const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Función para transformar (hash) el codigo de verificicion
export const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

// Función base64encode que devuelve la representación base64 del resumen que acabamos de calcular con la función sha256
export const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const getToken = async ({ code }: { code: string }) => {
  try {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
        grant_type: "authorization_code",
        code: code,
        redirect_uri:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_DEPLOY_URL_BASE_PRIMARY || ""
            : process.env.NEXT_PUBLIC_LOCAL_URL_BASE || "",
        code_verifier: window.localStorage.getItem("code_verifier") ?? "",
      }),
    };

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      payload
    );
    if (response.ok) {
      const data = await response.json();
      window.localStorage.setItem("access_token", data.access_token);
      window.localStorage.setItem("refresh_token", data.refresh_token);

      // window.localStorage.setItem("expires_in", data.expires_in);
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (e) {
    console.error(e);
  }
};

// Funcion para pedir autorizacion login al usuario
export const requestAuthorization = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // Guardamos
  window.localStorage.setItem("code_verifier", codeVerifier);

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || ""; // Aseguramos que sea un string
  const scope = "user-read-private user-read-email user-top-read";

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const params: Record<string, string> = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEPLOY_URL_BASE_PRIMARY || ""
        : process.env.NEXT_PUBLIC_LOCAL_URL_BASE || "",
  };
  authUrl.search = new URLSearchParams(params).toString();

  window.location.href = authUrl.toString();
};

// Funcion para actualizar token
export const getRefreshToken = async () => {
  try {
    if (window.localStorage.getItem("refresh_token")) {
      // refresh token that has been previously stored
      const url = "https://accounts.spotify.com/api/token";

      const refreshToken = window.localStorage.getItem("refresh_token") || "";
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "refresh_token");
      bodyParams.append("refresh_token", refreshToken);
      bodyParams.append("client_id", clientId);

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(), // Convertir URLSearchParams a cadena
      };

      const response = await fetch(url, payload);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log("refresco el token");

        window.location.reload();
      } else {
        if (response.status == 400) {
          // window.localStorage.removeItem("access_token");
          // window.localStorage.removeItem("refresh_token");
          throw new Error("Bad requests: Invalid refresh token");
        }
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    } else {
      requestAuthorization();
    }
  } catch (e) {
    console.error(e);
  }
};
