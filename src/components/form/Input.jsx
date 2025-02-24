import { Field, ErrorMessage } from "formik";

const Input = ({ name, placeholder, type, edit, className, required, readOnly=false , disabled=false}) => {
  return (
    <div className={`${className} flex flex-col`}>
      {edit && (
        <label
          htmlFor={name}
          className="text-sm mb-1 ml-1 text-gray"
        >
          {placeholder}
        </label>
      )}
      <Field
        className={`rounded-md px-4 py-2 outlie-none border border-gray-200 focus:outline-none w-full ${(readOnly || disabled) && 'text-gray'} focus:ring-1 focus:ring-blue-300`}
        id={name}
        name={name}
        placeholder={!edit && placeholder}
        type={type}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
      />
      <span className="m-1 ml-2 text-sm font-medium text-red-800">
      <ErrorMessage name={name} />
      </span>
    </div>
  );
};
export default Input;