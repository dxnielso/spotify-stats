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

const Home = () => {
  return (
    <ContentLayout>
      <UsersProfile />
      <UsersTopTracks />
    </ContentLayout>
  );
};

export default Home;
