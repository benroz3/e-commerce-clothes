"use client";
import { PulseLoader } from "react-spinners";

const Loader: React.FC<{
  text: string;
  color: string;
  loading: boolean;
  size: number;
}> = ({ text, color, loading, size }) => {
  return (
    <span className="flex gap-1 items-center">
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
      />
    </span>
  );
};

export default Loader;
