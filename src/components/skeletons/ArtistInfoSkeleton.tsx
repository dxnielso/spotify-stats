import SkeletonCircle from "./layouts/SkeletonCircle";
import SkeletonContainer from "./layouts/SkeletonContainer";
import SkeletonRow from "./layouts/SkeletonRow";

const ArtistInfoSkeleton = () => {
  return (
    <SkeletonContainer clases="mb-[50px]">
      <SkeletonCircle clases="size-[192px]" />
      <SkeletonRow clases="h-[40px] w-[160px]" />
      <SkeletonRow clases="h-[34px] w-[120px]" />
      <SkeletonRow clases="h-[18px] w-[80px]" />
      <SkeletonRow clases="h-[100px] w-[192px]" />
      <SkeletonRow clases="h-[35px] w-[150px]" />
    </SkeletonContainer>
  );
};

export default ArtistInfoSkeleton;
