import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";

const PasswordInput = ({ name, placeholder, edit }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col w-full">
      {edit && (
        <label
          htmlFor={name}
          className="text-sm font-semibold mb-1 ml-1 tracking-widest text-primary"
        >
          {placeholder}
        </label>
      )}
      <div className="flex justify-between relative items-center rounded-md px-4 py-2 w-full border border-gray-200 focus-within:border-blue-300">
        <Field
          className="outline-none w-full"
          name={name}
          placeholder={placeholder}
          type={toggle ? "text" : "password"}
        />
        <div
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        >
          {toggle ? (
            <ImEyeBlocked className="h-5 w-5" />
          ) : (
            <FaEye className="h-5 w-5" />
          )}
        </div>
      </div>
      <span className="m-1 text-sm font-medium text-red-800">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default PasswordInput;
