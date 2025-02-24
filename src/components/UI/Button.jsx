import React from "react";
import ButtonLoader from "./ButtonLoader";

const Button = ({
  children,
  onClick,
  isSubmitting = false,
  className = "py-2",
  type = "submit",
  color = "blue",
}) => {
  const getColor = () => `${color}-btn`;
  return (
    <button
      type={type}
      disabled={isSubmitting}
      onClick={(event) => {
        if (onClick) onClick(event);
      }}
      className={`${getColor()} btn ${className}`}
    >
      {isSubmitting ? <ButtonLoader/> : children}
    </button>
  );
};

export default Button;
