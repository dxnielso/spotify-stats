import SkeletonContainer from "./layouts/SkeletonContainer";
import SkeletonRow from "./layouts/SkeletonRow";

const UserTopTracksSkeleton = () => {
  return (
    <SkeletonContainer clases="flex flex-col items-start">
      <SkeletonRow clases="w-[80%] md:w-[70%] lg:w-[60%] xl:w-[500px] h-[30px] self-start" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
      <SkeletonRow clases="w-full h-[55px]" />
    </SkeletonContainer>
  );
};

export default UserTopTracksSkeleton;
