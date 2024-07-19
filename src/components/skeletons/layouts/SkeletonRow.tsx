const SkeletonRow = ({ clases }: { clases?: string }) => {
  return (
    <span
      className={`bg-darkSkeletonWhite animate-pulse ${clases ? clases : ""}`}
    ></span>
  );
};

export default SkeletonRow;
