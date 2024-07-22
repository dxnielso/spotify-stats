import type { Metadata } from "next";
import ContentLayout from "@/layouts/ContentLayout";
import UsersProfile from "@/components/profile/UsersProfile";
import UsersTopTracks from "@/components/profile/UsersTopTracks";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Página de perfil del usuario",
  keywords: ["Spotify", "Stats", "Profile", "Perfil"],
  creator: "Daniel Solis",
  publisher: "Daniel Solis",
};

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "NEXT_PUBLIC_LOCAL_URL_BASE:",
  process.env.NEXT_PUBLIC_LOCAL_URL_BASE
);
console.log(
  "NEXT_PUBLIC_DEPLOY_URL_BASE_PRIMARY:",
  process.env.NEXT_PUBLIC_DEPLOY_URL_BASE_PRIMARY
);

const Home = () => {
  return (
    <ContentLayout>
      <UsersProfile />
      <UsersTopTracks />
    </ContentLayout>
  );
};

export default Home;
