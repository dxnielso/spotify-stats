import SkeletonCircle from "./layouts/SkeletonCircle";
import SkeletonContainer from "./layouts/SkeletonContainer";
import SkeletonRow from "./layouts/SkeletonRow";

const UserProfileSkeleton = () => {
  return (
    <SkeletonContainer clases="mb-[50px]">
      <SkeletonCircle clases="h-[192px] w-[192px]" />
      <SkeletonRow clases="h-[30px] w-[180px]" />
      <SkeletonRow clases="h-[22px] w-[120px]" />
      <SkeletonRow clases="h-[14px] w-[80px]" />
      <SkeletonRow clases="h-[30px] w-[150px]" />
    </SkeletonContainer>
  );
};

export default UserProfileSkeleton;
