import { ErrorMessage, Field } from "formik";

const SelectInput = ({
  name,
  options,
  className,
  valueKey, 
  titleKey,
  label,
  defaultValue,
  edit,
}) => {
  return (
    <div>
      {edit && label && (
        <label
          htmlFor={name}
          className="text-sm mb-1 ml-1 text-gray"
        >
          {label}
        </label>
      )}
      <div className={`${className} flex flex-col`}>
        <Field
          as="select"
          name={name}
          id={name}
          className={`${className} text-gray-400 rounded-md px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 w-full`}
        >
          {/* options as array */}[
          {
            <option key={"default"} value={defaultValue ? defaultValue : ""}>
              {defaultValue ? defaultValue : label}
            </option>
          }
          {options?.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[titleKey]}
            </option>
          ))}
          ]
        </Field>
        <span className="m-1 text-sm font-medium text-red-800">
          <ErrorMessage name={name} />
        </span>
      </div>
    </div>
  );
};

export default SelectInput;