"use client";

import { useEffect } from "react";
import { getToken, requestAuthorization } from "@/helpers/authHelpers";
import { usePathname } from "next/navigation";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    isUserAuthenticated();
  }, [pathname]);

  // funciones
  const isUserAuthenticated = async () => {
    if (
      !window.localStorage.getItem("access_token") &&
      !window.localStorage.getItem("refresh_token")
    ) {
      if (!window.localStorage.getItem("code_verifier")) {
        requestAuthorization();
      } else if (new URLSearchParams(window.location.search).get("code")) {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get("code") || "";
        await getToken({
          code,
        });
      } else if (new URLSearchParams(window.location.search).get("error")) {
        console.log("Error al autenticar");
      } else {
        requestAuthorization();
      }
    }
  };

  return children;
};

export default AuthCheck;
