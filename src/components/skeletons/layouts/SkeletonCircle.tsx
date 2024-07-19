const SkeletonCircle = ({ clases }: { clases?: string }) => {
  return (
    <span
      className={`size-32 rounded-full bg-darkSkeletonWhite animate-pulse ${
        clases ? clases : ""
      } `}
    />
  );
};

export default SkeletonCircle;
