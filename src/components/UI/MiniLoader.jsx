import React from "react";

const MiniLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-blue">Loading...</p>
      </div>
    </div>
  );
};

export default MiniLoader;