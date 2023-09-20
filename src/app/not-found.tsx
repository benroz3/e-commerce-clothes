"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-full pr-10 pl-10">
      <Image src={require("../../public/assets/not-found.png")} alt="404" />
    </div>
  );
};

export default NotFound;
