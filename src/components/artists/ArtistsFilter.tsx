import ArtistsFilterButton from "@/components/artists/ArtistsFilterButton";

const ArtistsFilter = () => {
  return (
    <nav className="mb-8">
      <ul className="flex gap-x-5 justify-center items-center">
        <ArtistsFilterButton texto="Ultimo año" newTimeRangeValue="long_term" />
        <ArtistsFilterButton
          texto="Ultimos 6 meses"
          newTimeRangeValue="medium_term"
        />
        <ArtistsFilterButton
          texto="Ultimos 4 meses"
          newTimeRangeValue="short_term"
        />
      </ul>
    </nav>
  );
};

export default ArtistsFilter;
