"use client";
import { useState } from "react";
import Loader from "@/components/style/Loader";

const page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loading} size={30} />
        </div>
      ) : (
        <div>page</div>
      )}
    </>
  );
};

export default page;
