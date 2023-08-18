import { NextComponentType } from "next";

const LoadingSpinner: NextComponentType = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
