const SkeletonContainer = ({
  children,
  clases,
}: {
  children: React.ReactNode;
  clases?: string;
}) => {
  return (
    <span
      className={`relative flex flex-col justify-center items-center space-y-4 p-4 bg-darkSkeletonBlack rounded-sm animate-pulse ${
        clases ? clases : ""
      }`}
    >
      {children}
    </span>
  );
};

export default SkeletonContainer;
