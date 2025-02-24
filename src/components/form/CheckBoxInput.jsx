import { Field, ErrorMessage } from "formik";


const CheckBoxInput = ({ id, name, placeholder }) => {
  return (
    <div className="flex my-1 max-w-max">
      <Field
        name={name}
        type="checkbox"
        className="rounded-md w-4 h-4"
      />
      <label
        htmlFor={id}
        className="text-sm ml-2"
      >
        {placeholder}
      </label>
      <span className="m-1 text-sm text-red-800">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};
export default CheckBoxInput;