import SkeletonCircle from "./layouts/SkeletonCircle";
import SkeletonContainer from "./layouts/SkeletonContainer";
import SkeletonRow from "./layouts/SkeletonRow";

const ArtistsCardSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonCircle clases="size-[160px]" />
      <SkeletonRow clases="h-[16px] w-full" />
    </SkeletonContainer>
  );
};

export default ArtistsCardSkeleton;
