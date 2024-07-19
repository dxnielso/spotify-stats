import ContentLayout from "@/layouts/ContentLayout";
import ArtistInfo from "@/components/artists/artist/ArtistInfo";
import ArtistTracks from "@/components/artists/artist/ArtistTracks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artistas - Detalles",
  description:
    "Esta página muestra información detallada de un artista específico.",
  keywords: ["artistas", "Spotify", "Detalles", "Detalles de artista"],
  creator: "Daniel Solis",
  publisher: "Daniel Solis",
};

const page = ({ params }: { params: { artistId: string } }) => {
  return (
    <ContentLayout>
      <ArtistInfo id={params.artistId} />
      <ArtistTracks id={params.artistId} />
    </ContentLayout>
  );
};

export default page;
