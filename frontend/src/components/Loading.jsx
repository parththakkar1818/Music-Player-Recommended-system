import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-48">
      <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      <p className="text-blue-500 text-lg ml-4">Loading...</p>
    </div>
  );
};

export default Loading;