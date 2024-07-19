import SkeletonCircle from "./layouts/SkeletonCircle";
import SkeletonContainer from "./layouts/SkeletonContainer";
import SkeletonRow from "./layouts/SkeletonRow";

const ArtistTrackSkeleton = () => {
  return (
    <SkeletonContainer>
      <div className="flex">
        <SkeletonCircle clases="size-[80px]" />
        <div>
          <SkeletonRow clases="h-[20px] w-[40px]" />
        </div>
      </div>
    </SkeletonContainer>
  );
};

export default ArtistTrackSkeleton;
