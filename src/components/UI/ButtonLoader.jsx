import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

const ButtonLoader = () => {
  return (
    <span className="flex-row-center">
      <RiLoader2Fill
        color="white"
        height={36}
        width={36}
        className="animate-spin"
      />
      Loading...
    </span>
  );
};

export default ButtonLoader;
