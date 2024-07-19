const ContentLayout = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <main className="p-8 pb-[106px] sm:px-10 sm:pt-14 sm:pb-[130px] md:py-14 md:pr-10 md:pl-[140px] lg:py-16 lg:pr-20 lg:pl-[180px] xl:pr-32 xl:pl-[228px] 2xl:py-20 flex-1">
      {title && (
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-5 lg:mb-8">
          {title}
        </h1>
      )}
      {children}
    </main>
  );
};

export default ContentLayout;
