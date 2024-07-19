import ArtistsCardSkeleton from "@/components/skeletons/ArtistsCardSkeleton";
const ArtistsGridSkeleton = () => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:gap-5 xl:grid-cols-5 w-full gap-3">
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
      <ArtistsCardSkeleton />
    </section>
  );
};

export default ArtistsGridSkeleton;
