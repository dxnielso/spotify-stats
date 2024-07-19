import type { Metadata } from "next";
import ArtistsFilter from "@/components/artists/ArtistsFilter";
import ContentLayout from "@/layouts/ContentLayout";
import ArtistsGrid from "@/components/artists/ArtistsGrid";

export const metadata: Metadata = {
  title: "Top Artistas",
  description:
    "Esta página muestra las mejores canciones de Spotify en el tiempo especificado.",
  keywords: ["top", "canciones", "artistas", "Spotify"],
  creator: "Daniel Solis",
  publisher: "Daniel Solis",
};
const Page = async ({
  searchParams,
}: {
  searchParams: {
    timeRange: string;
  };
}) => {
  const currentTimeRange = searchParams?.timeRange || "long_term";
  return (
    <ContentLayout title="Top Artistas">
      <ArtistsFilter />
      <ArtistsGrid timeRange={currentTimeRange} />
    </ContentLayout>
  );
};

export default Page;
