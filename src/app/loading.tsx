import ContentLayout from "@/layouts/ContentLayout";
import Loader from "@/assets/loader.svg";
import Image from "next/image";

const loading = () => {
  return (
    <ContentLayout>
      <div className="grid place-content-center w-full h-[calc(100vh-200px)]">
        <Image src={Loader} alt="Loader" width="50" height="50" />
      </div>
    </ContentLayout>
  );
};

export default loading;
